'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { AnimatePresence, motion } from 'motion/react'

import BuildSubmissionForm from '@/components/build-submission-form'
import { BuildFormValues } from '@/lib/builds'

interface RefineBuildModalProps {
	buildId: string
	initialValues: BuildFormValues
	isOpen: boolean
	onClose: () => void
}

export default function RefineBuildModal({
	buildId,
	initialValues,
	isOpen,
	onClose,
}: RefineBuildModalProps) {
	const router = useRouter()

	useEffect(() => {
		if (!isOpen) {
			return
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', handleEscape)

		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('keydown', handleEscape)
		}
	}, [isOpen, onClose])

	return (
		<AnimatePresence>
			{isOpen ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/88 px-4 py-8 backdrop-blur-sm sm:px-6'
					onClick={onClose}
				>
					<motion.div
						initial={{ opacity: 0, y: 24, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.98 }}
						transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
						role='dialog'
						aria-modal='true'
						aria-labelledby='refine-build-title'
						className='w-full max-w-4xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-5 shadow-[0_40px_120px_rgba(2,6,23,0.65)] sm:p-6'
						onClick={(event) => event.stopPropagation()}
					>
						<div className='flex items-start justify-between gap-4 border-b border-white/10 pb-5'>
							<div>
								<p className='text-xs uppercase tracking-[0.28em] text-slate-500'>
									Refine build
								</p>
								<h2
									id='refine-build-title'
									className='mt-3 text-2xl font-semibold text-white'
								>
									Update this analysis
								</h2>
							</div>

							<button
								type='button'
								onClick={onClose}
								className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:border-white/20 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
								aria-label='Close refine build modal'
							>
								x
							</button>
						</div>

						<BuildSubmissionForm
							buildId={buildId}
							initialValues={initialValues}
							submitLabel='Update build'
							onSuccess={() => {
								onClose()
								router.refresh()
							}}
						/>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	)
}
