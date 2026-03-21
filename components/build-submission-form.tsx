'use client'

import { useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import { VscSparkleFilled } from 'react-icons/vsc'
import { toast } from 'sonner'

import {
	BuildFormValues,
	BuildSubmissionErrorCode,
	emptyBuildFormValues,
	getSubmissionErrorMessage,
	hasBuildFormErrors,
	normalizeBuildFormValues,
	validateBuildFormValues,
} from '@/lib/builds'

import BuildInputFields from './build-input-fields'
import BuildLoadingOverlay from './build-loading-overlay'

interface BuildSubmissionFormProps {
	buildId?: string
	initialValues?: BuildFormValues
	submitLabel?: string
	onSuccess?: (buildId: string) => void
}

export default function BuildSubmissionForm({
	buildId,
	initialValues = emptyBuildFormValues,
	submitLabel = 'Evaluate',
	onSuccess,
}: BuildSubmissionFormProps) {
	const router = useRouter()
	const [values, setValues] = useState<BuildFormValues>(
		normalizeBuildFormValues(initialValues),
	)
	const [hasSubmitted, setHasSubmitted] = useState(false)
	const [isPending, setIsPending] = useState(false)

	const fieldErrors = hasSubmitted ? validateBuildFormValues(values) : {}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setHasSubmitted(true)

		const nextFieldErrors = validateBuildFormValues(values)

		if (hasBuildFormErrors(nextFieldErrors)) {
			return
		}

		setIsPending(true)

		startTransition(async () => {
			try {
				const response = await fetch('/api/builds', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						buildId,
						buildInputs: values,
					}),
				})

				const payload =
					(await response.json().catch(() => null)) as
						| {
								id?: string
								code?: BuildSubmissionErrorCode
								message?: string
						  }
						| null

				if (!response.ok || !payload?.id) {
					const errorCode = payload?.code as BuildSubmissionErrorCode | undefined
					toast.error(
						payload?.message ??
							getSubmissionErrorMessage(errorCode ?? 'AI_FAILURE'),
					)
					return
				}

				if (onSuccess) {
					onSuccess(payload.id)
					return
				}

				router.push(`/build/${payload.id}`)
			} catch {
				toast.error(getSubmissionErrorMessage('AI_FAILURE'))
			} finally {
				setIsPending(false)
			}
		})
	}

	return (
		<>
			<form onSubmit={handleSubmit} className='mt-5 space-y-5' noValidate>
				<BuildInputFields
					values={values}
					fieldErrors={fieldErrors}
					isDisabled={isPending}
					onChange={setValues}
				/>

				<button
					type='submit'
					disabled={isPending}
					className='cta-glow inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 font-semibold text-white shadow-[0_18px_60px_rgba(14,165,233,0.28)] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:opacity-80'
				>
					<VscSparkleFilled className='h-4 w-4 text-white' />
					<span>{submitLabel}</span>
				</button>
			</form>

			<BuildLoadingOverlay isVisible={isPending} />
		</>
	)
}
