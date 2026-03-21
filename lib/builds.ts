export const MAX_BUILD_GAMES = 10

const MAX_CPU_LENGTH = 120
const MAX_GPU_LENGTH = 120
const MAX_RAM_LENGTH = 32
const MAX_RESOLUTION_LENGTH = 32
const MAX_REFRESH_RATE_LENGTH = 32
const MAX_GAME_LENGTH = 64
const MAX_BUILD_NAME_LENGTH = 160
const MAX_REVIEW_LENGTH = 120
const MAX_SUMMARY_LENGTH = 600
const MAX_REASON_LENGTH = 240

export interface BuildFormValues {
	cpu: string
	gpu: string
	ramCapacity: string
	ramGeneration: string
	resolution: string
	refreshRate: string
	games: string[]
}

export interface StoredBuildInputs {
	cpu: string
	gpu: string
	ram_capacity: string
	ram_generation: string
	resolution: string
	refresh_rate: string
	games: string[]
}

export interface GeminiFpsEstimate {
	game: string
	fps: number
	resolution: string
}

export interface GeminiUpgradeSuggestion {
	component: string
	current: string
	suggested: string
	reason: string
}

export interface GeminiBuildResponse {
	build_name: string
	overall_review: string
	bottleneck: {
		percentage: number
		component: 'CPU' | 'GPU' | 'None'
		summary: string
	}
	fps_estimates: GeminiFpsEstimate[]
	psu: {
		recommended_watts: number
		explanation: string
	}
	compatibility: {
		score: number
		summary: string
	}
	performance_summary: string
	upgrade_suggestions: GeminiUpgradeSuggestion[]
}

export interface BuildListItem {
	id: string
	build_name: string
	overall_review: string
	bottleneck_percentage: number
	created_at: string
}

export interface BuildRecord extends BuildListItem {
	user_email: string
	build_inputs: StoredBuildInputs
	gemini_response: GeminiBuildResponse
	updated_at: string
}

export interface BuildSubmissionResult {
	id: string
}

export type BuildSubmissionErrorCode =
	| 'AI_FAILURE'
	| 'INVALID_REQUEST'
	| 'MALFORMED_AI_RESPONSE'
	| 'NOT_FOUND'
	| 'RATE_LIMIT'
	| 'UNAUTHORIZED'

export class BuildSubmissionError extends Error {
	code: BuildSubmissionErrorCode
	status: number

	constructor(
		code: BuildSubmissionErrorCode,
		message: string,
		status = 400,
	) {
		super(message)
		this.code = code
		this.status = status
	}
}

export const emptyBuildFormValues: BuildFormValues = {
	cpu: '',
	gpu: '',
	ramCapacity: '',
	ramGeneration: '',
	resolution: '',
	refreshRate: '',
	games: [],
}

function clampString(value: unknown, maxLength: number) {
	return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function normalizeGames(value: unknown) {
	if (!Array.isArray(value)) {
		return []
	}

	const seenGames = new Set<string>()

	return value.reduce<string[]>((games, game) => {
		const trimmedGame = clampString(game, MAX_GAME_LENGTH)
		const normalizedGame = trimmedGame.toLowerCase()

		if (!trimmedGame || seenGames.has(normalizedGame)) {
			return games
		}

		seenGames.add(normalizedGame)

		if (games.length >= MAX_BUILD_GAMES) {
			return games
		}

		return [...games, trimmedGame]
	}, [])
}

export function normalizeBuildFormValues(value: unknown): BuildFormValues {
	const objectValue =
		typeof value === 'object' && value !== null
			? (value as Record<string, unknown>)
			: {}

	return {
		cpu: clampString(objectValue.cpu, MAX_CPU_LENGTH),
		gpu: clampString(objectValue.gpu, MAX_GPU_LENGTH),
		ramCapacity: clampString(objectValue.ramCapacity, MAX_RAM_LENGTH),
		ramGeneration: clampString(objectValue.ramGeneration, MAX_RAM_LENGTH),
		resolution: clampString(objectValue.resolution, MAX_RESOLUTION_LENGTH),
		refreshRate: clampString(objectValue.refreshRate, MAX_REFRESH_RATE_LENGTH),
		games: normalizeGames(objectValue.games),
	}
}

export function validateBuildFormValues(values: BuildFormValues) {
	const fieldErrors: Partial<Record<keyof BuildFormValues, string>> = {}

	if (!values.cpu) {
		fieldErrors.cpu = 'CPU is required.'
	}

	if (!values.gpu) {
		fieldErrors.gpu = 'GPU is required.'
	}

	if (!values.ramCapacity) {
		fieldErrors.ramCapacity = 'RAM capacity is required.'
	}

	if (!values.ramGeneration) {
		fieldErrors.ramGeneration = 'RAM generation is required.'
	}

	if (!values.resolution) {
		fieldErrors.resolution = 'Resolution is required.'
	}

	if (!values.refreshRate) {
		fieldErrors.refreshRate = 'Refresh rate is required.'
	}

	if (values.games.length > MAX_BUILD_GAMES) {
		fieldErrors.games = `You can add up to ${MAX_BUILD_GAMES} games.`
	}

	return fieldErrors
}

export function hasBuildFormErrors(
	fieldErrors: Partial<Record<keyof BuildFormValues, string>>,
) {
	return Object.keys(fieldErrors).length > 0
}

export function toStoredBuildInputs(values: BuildFormValues): StoredBuildInputs {
	return {
		cpu: values.cpu,
		gpu: values.gpu,
		ram_capacity: values.ramCapacity,
		ram_generation: values.ramGeneration,
		resolution: values.resolution,
		refresh_rate: values.refreshRate,
		games: values.games,
	}
}

export function toBuildFormValues(inputs: StoredBuildInputs): BuildFormValues {
	return {
		cpu: inputs.cpu,
		gpu: inputs.gpu,
		ramCapacity: inputs.ram_capacity,
		ramGeneration: inputs.ram_generation,
		resolution: inputs.resolution,
		refreshRate: inputs.refresh_rate,
		games: inputs.games,
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null
}

function parseNumber(
	value: unknown,
	{
		min = Number.NEGATIVE_INFINITY,
		max = Number.POSITIVE_INFINITY,
	}: {
		min?: number
		max?: number
	} = {},
) {
	const numberValue =
		typeof value === 'number'
			? value
			: typeof value === 'string'
				? Number(value)
				: Number.NaN

	if (!Number.isFinite(numberValue)) {
		return null
	}

	return Math.min(max, Math.max(min, numberValue))
}

export function parseGeminiBuildResponse(value: unknown): GeminiBuildResponse | null {
	if (!isRecord(value)) {
		return null
	}

	const bottleneck = isRecord(value.bottleneck) ? value.bottleneck : null
	const psu = isRecord(value.psu) ? value.psu : null
	const compatibility = isRecord(value.compatibility)
		? value.compatibility
		: null

	if (!bottleneck || !psu || !compatibility || !Array.isArray(value.fps_estimates)) {
		return null
	}

	const bottleneckPercentage = parseNumber(bottleneck.percentage, {
		min: 0,
		max: 100,
	})
	const compatibilityScore = parseNumber(compatibility.score, {
		min: 0,
		max: 100,
	})
	const recommendedWatts = parseNumber(psu.recommended_watts, {
		min: 0,
		max: 3000,
	})

	if (
		bottleneckPercentage === null ||
		compatibilityScore === null ||
		recommendedWatts === null
	) {
		return null
	}

	const bottleneckComponent =
		bottleneck.component === 'CPU' ||
		bottleneck.component === 'GPU' ||
		bottleneck.component === 'None'
			? bottleneck.component
			: null

	if (!bottleneckComponent) {
		return null
	}

	const fpsEstimates = value.fps_estimates.reduce<GeminiFpsEstimate[]>(
		(estimates, estimate) => {
			if (!isRecord(estimate)) {
				return estimates
			}

			const fps = parseNumber(estimate.fps, {
				min: 0,
				max: 1000,
			})
			const game = clampString(estimate.game, MAX_GAME_LENGTH)
			const resolution = clampString(estimate.resolution, MAX_RESOLUTION_LENGTH)

			if (fps === null || !game || !resolution) {
				return estimates
			}

			return [...estimates, { game, fps, resolution }]
		},
		[],
	)

	const upgradeSuggestions = Array.isArray(value.upgrade_suggestions)
		? value.upgrade_suggestions.reduce<GeminiUpgradeSuggestion[]>(
				(suggestions, suggestion) => {
					if (!isRecord(suggestion)) {
						return suggestions
					}

					const component = clampString(suggestion.component, MAX_RAM_LENGTH)
					const current = clampString(suggestion.current, MAX_CPU_LENGTH)
					const suggested = clampString(suggestion.suggested, MAX_CPU_LENGTH)
					const reason = clampString(suggestion.reason, MAX_REASON_LENGTH)

					if (!component || !current || !suggested || !reason) {
						return suggestions
					}

					return [
						...suggestions,
						{
							component,
							current,
							suggested,
							reason,
						},
					]
				},
				[],
		  )
		: []

	const buildName = clampString(value.build_name, MAX_BUILD_NAME_LENGTH)
	const overallReview = clampString(value.overall_review, MAX_REVIEW_LENGTH)
	const bottleneckSummary = clampString(bottleneck.summary, MAX_SUMMARY_LENGTH)
	const psuExplanation = clampString(psu.explanation, MAX_SUMMARY_LENGTH)
	const compatibilitySummary = clampString(
		compatibility.summary,
		MAX_SUMMARY_LENGTH,
	)
	const performanceSummary = clampString(
		value.performance_summary,
		MAX_SUMMARY_LENGTH,
	)

	if (
		!buildName ||
		!overallReview ||
		!bottleneckSummary ||
		!psuExplanation ||
		!compatibilitySummary ||
		!performanceSummary ||
		fpsEstimates.length === 0
	) {
		return null
	}

	return {
		build_name: buildName,
		overall_review: overallReview,
		bottleneck: {
			percentage: bottleneckPercentage,
			component: bottleneckComponent,
			summary: bottleneckSummary,
		},
		fps_estimates: fpsEstimates,
		psu: {
			recommended_watts: recommendedWatts,
			explanation: psuExplanation,
		},
		compatibility: {
			score: compatibilityScore,
			summary: compatibilitySummary,
		},
		performance_summary: performanceSummary,
		upgrade_suggestions: upgradeSuggestions,
	}
}

export function getBuildPrompt(values: StoredBuildInputs) {
	const gamesText =
		values.games.length > 0 ? values.games.join(', ') : 'None provided'

	return `You are a PC hardware analyst. Given the following PC build, return a structured JSON analysis.

Build:
- CPU: ${values.cpu}
- GPU: ${values.gpu}
- RAM: ${values.ram_capacity} ${values.ram_generation}
- Target Resolution: ${values.resolution}
- Refresh Rate: ${values.refresh_rate}
- Games: ${gamesText}

IMPORTANT — FPS estimates rule:
The user provided ${values.games.length} game(s). You must always return at least 6 entries in fps_estimates. If the user provided fewer than 6 games, pad the list with popular games commonly played on similar builds, chosen from titles like: Warzone, Fortnite, Cyberpunk 2077, Valorant, Apex Legends, CS2, Elden Ring, Hogwarts Legacy, Rainbow Six Siege, The Witcher 3. Always list the user's inputted games first, then pad with relevant suggestions to reach a minimum of 6. If the user provided 0 games, return 6 representative titles suited to this build. If the user provided 10 games, return all 10 with no padding needed.

Return ONLY a valid JSON object with this exact structure, no markdown, no preamble:
{
  "build_name": string (format: "{CPU} + {GPU}", e.g. "Ryzen 7 9700X + RTX 5070"),
  "overall_review": string (exactly one short sentence summarizing the build, must fit inside a small card, max 120 characters),
  "bottleneck": {
    "percentage": number (0-100),
    "component": "CPU" | "GPU" | "None",
    "summary": string (1-2 sentences)
  },
  "fps_estimates": [
    { "game": string, "fps": number, "resolution": string }
  ],
  "psu": {
    "recommended_watts": number,
    "explanation": string
  },
  "compatibility": {
    "score": number (0-100),
    "summary": string
  },
  "performance_summary": string (2-3 sentences overall verdict),
  "upgrade_suggestions": [
    { "component": string, "current": string, "suggested": string, "reason": string }
  ]
}`
}

export function getBottleneckTone(value: number) {
	if (value < 10) {
		return {
			dotClassName: 'bg-emerald-400',
			ringClassName: 'text-emerald-400',
			trailClassName: 'stroke-emerald-400/15',
		}
	}

	if (value <= 30) {
		return {
			dotClassName: 'bg-amber-300',
			ringClassName: 'text-amber-300',
			trailClassName: 'stroke-amber-300/15',
		}
	}

	return {
		dotClassName: 'bg-rose-400',
		ringClassName: 'text-rose-400',
		trailClassName: 'stroke-rose-400/15',
	}
}

export function getCompatibilityTone(value: number) {
	if (value >= 85) {
		return {
			ringClassName: 'text-emerald-400',
			trailClassName: 'stroke-emerald-400/15',
		}
	}

	if (value >= 60) {
		return {
			ringClassName: 'text-sky-300',
			trailClassName: 'stroke-sky-300/15',
		}
	}

	if (value >= 40) {
		return {
			ringClassName: 'text-amber-300',
			trailClassName: 'stroke-amber-300/15',
		}
	}

	return {
		ringClassName: 'text-rose-400',
		trailClassName: 'stroke-rose-400/15',
	}
}

export function getSubmissionErrorMessage(code: BuildSubmissionErrorCode) {
	if (code === 'RATE_LIMIT') {
		return "You've submitted too many builds recently. Please wait before trying again."
	}

	if (code === 'MALFORMED_AI_RESPONSE') {
		return "We couldn't parse the AI response. Please try again."
	}

	if (code === 'NOT_FOUND') {
		return 'We could not find that build.'
	}

	if (code === 'UNAUTHORIZED') {
		return 'Please log in again before submitting a build.'
	}

	return 'Something went wrong with the AI analysis. Please try again.'
}
