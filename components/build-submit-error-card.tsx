'use client'

import { BuildSubmissionErrorCode } from '@/lib/builds'

export default function BuildSubmitErrorCard({
	errorCode,
	message,
	onDismiss,
}: {
	errorCode?: BuildSubmissionErrorCode
	message: string
	onDismiss: () => void
}) {
	const showRetryAction =
		errorCode === 'AI_FAILURE' || errorCode === 'MALFORMED_AI_RESPONSE'

	return (
		<div className='rounded-3xl border border-rose-400/20 bg-rose-400/10 p-4 text-left'>
			<p className='text-sm font-medium text-rose-100'>{message}</p>
			<div className='mt-4 flex flex-wrap gap-3'>
				{showRetryAction ? (
					<button
						type='button'
						onClick={onDismiss}
						className='inline-flex min-h-10 items-center justify-center rounded-full border border-rose-300/30 bg-rose-300/10 px-4 text-sm font-semibold text-rose-100 transition hover:border-rose-200/50 hover:bg-rose-300/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200'
					>
						Retry
					</button>
				) : null}
				{!showRetryAction ? (
					<button
						type='button'
						onClick={onDismiss}
						className='inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
					>
						Dismiss
					</button>
				) : null}
			</div>
		</div>
	)
}
