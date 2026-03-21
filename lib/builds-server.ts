import 'server-only'

import { GoogleGenAI } from '@google/genai'

import { createClient } from '@/lib/supabase/server'

import {
	BuildRecord,
	BuildSubmissionError,
	BuildSubmissionResult,
	BuildListItem,
	getBuildPrompt,
	getSubmissionErrorMessage,
	normalizeBuildFormValues,
	parseGeminiBuildResponse,
	toStoredBuildInputs,
	validateBuildFormValues,
	hasBuildFormErrors,
} from './builds'

const RATE_LIMIT_WINDOW_IN_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX_SUBMISSIONS = 5

function getGeminiClient() {
	const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

	if (!apiKey) {
		throw new BuildSubmissionError(
			'AI_FAILURE',
			getSubmissionErrorMessage('AI_FAILURE'),
			500,
		)
	}

	return new GoogleGenAI({ apiKey })
}

async function getAuthenticatedEmail() {
	const supabase = await createClient()
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser()

	if (error || !user?.email) {
		throw new BuildSubmissionError(
			'UNAUTHORIZED',
			getSubmissionErrorMessage('UNAUTHORIZED'),
			401,
		)
	}

	return {
		supabase,
		email: user.email,
	}
}

function extractJsonText(value: unknown) {
	if (typeof value !== 'string') {
		return ''
	}

	const trimmedValue = value.trim()

	if (trimmedValue.startsWith('```')) {
		return trimmedValue
			.replace(/^```json\s*/i, '')
			.replace(/^```\s*/i, '')
			.replace(/\s*```$/, '')
			.trim()
	}

	return trimmedValue
}

async function getGeminiAnalysis(
	buildInputs: ReturnType<typeof toStoredBuildInputs>,
) {
	try {
		const ai = getGeminiClient()
		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash-lite',
			contents: getBuildPrompt(buildInputs),
			config: {
				responseMimeType: 'application/json',
			},
		})

		const rawText = extractJsonText(response.text)

		if (!rawText) {
			throw new BuildSubmissionError(
				'MALFORMED_AI_RESPONSE',
				getSubmissionErrorMessage('MALFORMED_AI_RESPONSE'),
				502,
			)
		}

		const parsedResponse = parseGeminiBuildResponse(JSON.parse(rawText))

		if (!parsedResponse) {
			throw new BuildSubmissionError(
				'MALFORMED_AI_RESPONSE',
				getSubmissionErrorMessage('MALFORMED_AI_RESPONSE'),
				502,
			)
		}

		return parsedResponse
	} catch (error) {
		console.error('[build-submit] gemini failed', {
			error,
			message: error instanceof Error ? error.message : 'Unknown Gemini error',
		})

		if (error instanceof BuildSubmissionError) {
			throw error
		}

		if (error instanceof SyntaxError) {
			throw new BuildSubmissionError(
				'MALFORMED_AI_RESPONSE',
				getSubmissionErrorMessage('MALFORMED_AI_RESPONSE'),
				502,
			)
		}

		throw new BuildSubmissionError(
			'AI_FAILURE',
			getSubmissionErrorMessage('AI_FAILURE'),
			502,
		)
	}
}

export async function submitBuildAnalysis({
	buildId,
	input,
}: {
	buildId?: string
	input: unknown
}): Promise<BuildSubmissionResult> {
	const normalizedValues = normalizeBuildFormValues(input)
	const fieldErrors = validateBuildFormValues(normalizedValues)

	if (hasBuildFormErrors(fieldErrors)) {
		throw new BuildSubmissionError(
			'INVALID_REQUEST',
			'Please complete the required fields before submitting.',
			400,
		)
	}

	const buildInputs = toStoredBuildInputs(normalizedValues)
	const { supabase, email } = await getAuthenticatedEmail()

	console.log('[build-submit] captured form data', {
		userEmail: email,
		buildId: buildId ?? null,
		buildInputs,
	})

	const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_IN_MS).toISOString()
	const { count, error: rateLimitError } = await supabase
		.from('builds')
		.select('id', { count: 'exact', head: true })
		.eq('user_email', email)
		.gte('created_at', windowStart)

	if (rateLimitError) {
		throw new BuildSubmissionError(
			'AI_FAILURE',
			getSubmissionErrorMessage('AI_FAILURE'),
			500,
		)
	}

	if ((count ?? 0) >= RATE_LIMIT_MAX_SUBMISSIONS) {
		throw new BuildSubmissionError(
			'RATE_LIMIT',
			getSubmissionErrorMessage('RATE_LIMIT'),
			429,
		)
	}

	console.log('[build-submit] calling gemini', {
		userEmail: email,
		buildId: buildId ?? null,
		gamesCount: buildInputs.games.length,
	})

	const geminiResponse = await getGeminiAnalysis(buildInputs)

	console.log('[build-submit] gemini responded', {
		userEmail: email,
		buildId: buildId ?? null,
		responseSummary: {
			buildName: geminiResponse.build_name,
			overallReview: geminiResponse.overall_review,
			bottleneckPercentage: geminiResponse.bottleneck.percentage,
			fpsEstimateCount: geminiResponse.fps_estimates.length,
		},
	})

	const timestamp = new Date().toISOString()

	const payload = {
		user_email: email,
		build_name: geminiResponse.build_name,
		overall_review: geminiResponse.overall_review,
		bottleneck_percentage: geminiResponse.bottleneck.percentage,
		build_inputs: buildInputs,
		gemini_response: geminiResponse,
		updated_at: timestamp,
	}

	if (buildId) {
		const { data, error } = await supabase
			.from('builds')
			.update(payload)
			.eq('id', buildId)
			.eq('user_email', email)
			.select('id')
			.single()

		if (error || !data?.id) {
			throw new BuildSubmissionError(
				'NOT_FOUND',
				getSubmissionErrorMessage('NOT_FOUND'),
				404,
			)
		}

		console.log('[build-submit] db saved', {
			userEmail: email,
			buildId: data.id,
			action: 'update',
		})

		return { id: data.id }
	}

	const { data, error } = await supabase
		.from('builds')
		.insert({
			...payload,
			created_at: timestamp,
		})
		.select('id')
		.single()

	if (error || !data?.id) {
		throw new BuildSubmissionError(
			'AI_FAILURE',
			getSubmissionErrorMessage('AI_FAILURE'),
			500,
		)
	}

	console.log('[build-submit] db saved', {
		userEmail: email,
		buildId: data.id,
		action: 'insert',
	})

	return { id: data.id }
}

export async function getBuildForCurrentUser(buildId: string) {
	const { supabase, email } = await getAuthenticatedEmail()
	const { data, error } = await supabase
		.from('builds')
		.select(
			'id, user_email, build_name, overall_review, bottleneck_percentage, build_inputs, gemini_response, created_at, updated_at',
		)
		.eq('id', buildId)
		.eq('user_email', email)
		.single()

	if (error || !data) {
		return null
	}

	return data as BuildRecord
}

export async function getRecentBuildsForCurrentUser() {
	try {
		const { supabase, email } = await getAuthenticatedEmail()
	const { data, error } = await supabase
		.from('builds')
		.select('id, build_name, overall_review, bottleneck_percentage, created_at')
		.eq('user_email', email)
		.order('created_at', { ascending: false })

		if (error) {
			return []
		}

		return (data ?? []) as BuildListItem[]
	} catch (error) {
		if (
			error instanceof BuildSubmissionError &&
			error.code === 'UNAUTHORIZED'
		) {
			return []
		}

		throw error
	}
}
