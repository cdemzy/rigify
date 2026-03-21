import { BuildSubmissionError, getSubmissionErrorMessage } from '@/lib/builds'
import { submitBuildAnalysis } from '@/lib/builds-server'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const result = await submitBuildAnalysis({
			buildId:
				typeof body?.buildId === 'string' && body.buildId.trim()
					? body.buildId
					: undefined,
			input: body?.buildInputs ?? body,
		})

		return Response.json(result)
	} catch (error) {
		if (error instanceof BuildSubmissionError) {
			return Response.json(
				{
					code: error.code,
					message: error.message,
				},
				{
					status: error.status,
				},
			)
		}

		return Response.json(
			{
				code: 'AI_FAILURE',
				message: getSubmissionErrorMessage('AI_FAILURE'),
			},
			{
				status: 500,
			},
		)
	}
}
