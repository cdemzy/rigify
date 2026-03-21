'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'

const loadingMessages = [
	'Analyzing your build...',
	'Checking bottlenecks...',
	'Estimating FPS...',
	'Almost ready...',
]

export default function BuildLoadingOverlay({
	isVisible,
}: {
	isVisible: boolean
}) {
	const [messageIndex, setMessageIndex] = useState(0)

	useEffect(() => {
		if (!isVisible) {
			setMessageIndex(0)
			return
		}

		const intervalId = window.setInterval(() => {
			setMessageIndex((currentIndex) =>
				currentIndex === loadingMessages.length - 1 ? 0 : currentIndex + 1,
			)
		}, 1600)

		return () => window.clearInterval(intervalId)
	}, [isVisible])

	return (
		<AnimatePresence>
			{isVisible ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/88 px-6 backdrop-blur-sm'
				>
					<div className='flex w-full max-w-md flex-col items-center gap-8 rounded-[2rem] border border-white/10 bg-slate-950/80 px-8 py-10 text-center shadow-[0_40px_120px_rgba(2,6,23,0.65)]'>
						<div className='relative h-24 w-24'>
							<motion.div
								animate={{
									scale: [0.88, 1.08, 0.92],
									x: [-10, 12, -8],
									y: [-8, 14, -10],
								}}
								transition={{
									duration: 5.4,
									repeat: Number.POSITIVE_INFINITY,
									ease: 'easeInOut',
								}}
								className='absolute inset-0 rounded-full bg-sky-400/30 blur-2xl'
							/>
							<motion.div
								animate={{
									scale: [1.05, 0.9, 1.1],
									x: [10, -8, 14],
									y: [10, -12, 6],
								}}
								transition={{
									duration: 6.1,
									repeat: Number.POSITIVE_INFINITY,
									ease: 'easeInOut',
								}}
								className='absolute inset-3 rounded-full bg-cyan-300/30 blur-2xl'
							/>
							<div className='absolute inset-5 rounded-full border border-white/10 bg-slate-950/80' />
						</div>

						<div className='min-h-8'>
							<AnimatePresence mode='wait'>
								<motion.p
									key={loadingMessages[messageIndex]}
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -12 }}
									transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
									className='text-lg font-semibold text-white'
								>
									{loadingMessages[messageIndex]}
								</motion.p>
							</AnimatePresence>
						</div>
					</div>
				</motion.div>
			) : null}
		</AnimatePresence>
	)
}
