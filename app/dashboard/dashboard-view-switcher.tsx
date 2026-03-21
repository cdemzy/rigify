'use client'

import { useState, type ReactNode } from 'react'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

type DashboardSection = 'new-build' | 'saved-builds'

interface DashboardViewSwitcherProps {
	initialSection?: DashboardSection
	buildForm: ReactNode
	recentBuilds: ReactNode
}

const sections: Array<{
	id: DashboardSection
	label: string
	eyebrow: string
}> = [
	{
		id: 'new-build',
		label: 'New Build',
		eyebrow: 'New build form',
	},
	{
		id: 'saved-builds',
		label: 'Saved Builds',
		eyebrow: 'Saved builds',
	},
]

export default function DashboardViewSwitcher({
	initialSection = 'new-build',
	buildForm,
	recentBuilds,
}: DashboardViewSwitcherProps) {
	const shouldReduceMotion = useReducedMotion()
	const [activeSection, setActiveSection] = useState<DashboardSection>(
		initialSection,
	)
	const [direction, setDirection] = useState(1)
	const activeIndex = sections.findIndex((section) => section.id === activeSection)

	function setActiveSectionWithDirection(nextSection: DashboardSection) {
		if (nextSection === activeSection) {
			return
		}

		const nextIndex = sections.findIndex((section) => section.id === nextSection)
		setDirection(nextIndex > activeIndex ? 1 : -1)
		setActiveSection(nextSection)
	}

	function handleSwipe(offsetX: number, velocityX: number) {
		const swipePower = Math.abs(offsetX) * Math.abs(velocityX)
		const swipeThreshold = 9000

		if (offsetX < -72 || (velocityX < -220 && swipePower > swipeThreshold)) {
			setActiveSectionWithDirection('saved-builds')
			return
		}

		if (offsetX > 72 || (velocityX > 220 && swipePower > swipeThreshold)) {
			setActiveSectionWithDirection('new-build')
		}
	}

	return (
		<section className='mx-auto flex w-full flex-col gap-6 sm:gap-8'>
			<div className='flex justify-center'>
				<div className='relative inline-grid w-full max-w-md grid-cols-2 rounded-full border border-white/10 bg-slate-950/60 p-1.5 shadow-[0_24px_60px_rgba(2,6,23,0.32)] backdrop-blur'>
					<motion.div
						aria-hidden='true'
						animate={{
							x: activeIndex === 0 ? '0%' : '100%',
						}}
						transition={{
							duration: shouldReduceMotion ? 0 : 0.32,
							ease: [0.22, 1, 0.36, 1],
						}}
						className='absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-sky-400/18 shadow-[0_0_30px_rgba(56,189,248,0.16)]'
					/>

					{sections.map((section) => {
						const isActive = activeSection === section.id

						return (
							<button
								key={section.id}
								type='button'
								onClick={() => setActiveSectionWithDirection(section.id)}
								className={`relative z-10 inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${
									isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
								}`}
							>
								{section.label}
							</button>
						)
					})}
				</div>
			</div>

			<AnimatePresence initial={false} mode='wait' custom={direction}>
				<motion.div
					key={activeSection}
					custom={direction}
					initial={
						shouldReduceMotion
							? { opacity: 1 }
							: (currentDirection: number) => ({
									opacity: 0,
									x: currentDirection > 0 ? 88 : -88,
							  })
					}
					animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
					exit={
						shouldReduceMotion
							? { opacity: 1 }
							: (currentDirection: number) => ({
									opacity: 0,
									x: currentDirection > 0 ? -88 : 88,
							  })
					}
					transition={{
						duration: shouldReduceMotion ? 0 : 0.28,
						ease: [0.22, 1, 0.36, 1],
					}}
					drag={shouldReduceMotion ? false : 'x'}
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={0.12}
					onDragEnd={(_, info) => {
						handleSwipe(info.offset.x, info.velocity.x)
					}}
					className='w-full rounded-4xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_30px_80px_rgba(2,6,23,0.4)] backdrop-blur touch-pan-y sm:p-6'
				>
					<div className='border-b border-white/10 pb-6'>
						<p className='text-xs uppercase tracking-[0.28em] text-slate-500'>
							{sections[activeIndex].eyebrow}
						</p>
					</div>

					<div className='mt-6'>
						{activeSection === 'new-build' ? buildForm : recentBuilds}
					</div>
				</motion.div>
			</AnimatePresence>
		</section>
	)
}
