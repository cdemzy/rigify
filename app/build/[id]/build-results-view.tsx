'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'

import { motion, useReducedMotion } from 'motion/react'

import {
	BuildRecord,
	getBottleneckTone,
	getCompatibilityTone,
	toBuildFormValues,
} from '@/lib/builds'

import AnimatedArcChart from './animated-arc-chart'
import RefineBuildModal from './refine-build-modal'

function FpsEstimateCard({
	game,
	fps,
	resolution,
	index,
}: {
	game: string
	fps: number
	resolution: string
	index: number
}) {
	const shouldReduceMotion = useReducedMotion()
	const size = 132
	const strokeWidth = 12
	const radius = (size - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius
	const normalizedValue = Math.min(fps / 240, 1)

	return (
		<motion.div
			initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: shouldReduceMotion ? 0 : 0.34,
				delay: shouldReduceMotion ? 0 : index * 0.06,
				ease: [0.22, 1, 0.36, 1],
			}}
			className='rounded-3xl border border-white/10 bg-slate-950/65 p-5'
		>
			<div className='mx-auto flex w-fit flex-col items-center text-center'>
				<div className='relative h-[132px] w-[132px]'>
					<svg
						viewBox={`0 0 ${size} ${size}`}
						className='h-full w-full -rotate-90 overflow-visible'
					>
						<circle
							cx={size / 2}
							cy={size / 2}
							r={radius}
							strokeWidth={strokeWidth}
							className='stroke-sky-300/12'
							fill='none'
						/>
						<motion.circle
							cx={size / 2}
							cy={size / 2}
							r={radius}
							strokeWidth={strokeWidth}
							className='text-sky-300'
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							initial={{ strokeDashoffset: circumference }}
							animate={{
								strokeDashoffset: circumference * (1 - normalizedValue),
							}}
							transition={{
								duration: shouldReduceMotion ? 0 : 0.95,
								delay: shouldReduceMotion ? 0 : index * 0.08,
								ease: [0.22, 1, 0.36, 1],
							}}
							strokeDasharray={circumference}
						/>
					</svg>

					<div className='absolute inset-0 flex flex-col items-center justify-center'>
						<p className='text-3xl font-semibold text-white'>{Math.round(fps)}</p>
						<p className='mt-1 text-xs uppercase tracking-[0.22em] text-slate-400'>
							FPS
						</p>
					</div>
				</div>

				<h3 className='mt-4 text-base font-semibold text-white'>{game}</h3>
				<p className='mt-1 text-sm text-slate-400'>{resolution}</p>
			</div>
		</motion.div>
	)
}

function ResultCard({
	title,
	children,
}: {
	title: string
	children: ReactNode
}) {
	return (
		<section className='rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.35)]'>
			<p className='text-xs uppercase tracking-[0.28em] text-slate-500'>{title}</p>
			<div className='mt-5'>{children}</div>
		</section>
	)
}

export default function BuildResultsView({ build }: { build: BuildRecord }) {
	const [isRefineModalOpen, setIsRefineModalOpen] = useState(false)
	const bottleneckTone = getBottleneckTone(
		build.gemini_response.bottleneck.percentage,
	)
	const compatibilityTone = getCompatibilityTone(
		build.gemini_response.compatibility.score,
	)

	return (
		<>
			<section className='flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.35)] sm:flex-row sm:items-start sm:justify-between'>
				<div>
					<p className='text-xs uppercase tracking-[0.28em] text-slate-500'>
						Build result
					</p>
					<h1 className='mt-4 text-3xl font-semibold text-white sm:text-4xl'>
						{build.build_name}
					</h1>
					<p className='mt-3 max-w-3xl text-base text-slate-300'>
						{build.overall_review}
					</p>
				</div>

				<div className='flex flex-col gap-3 sm:items-end'>
					<Link
						href='/dashboard#recent-builds'
						className='inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
					>
						Recent Builds
					</Link>
					<button
						type='button'
						onClick={() => setIsRefineModalOpen(true)}
						className='inline-flex min-h-11 items-center justify-center rounded-full border border-sky-300/20 bg-sky-400/10 px-5 text-sm font-semibold text-sky-100 transition hover:border-sky-200/45 hover:bg-sky-400/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
					>
						Refine Build
					</button>
				</div>
			</section>

			<section className='grid gap-6 xl:grid-cols-2'>
				<ResultCard title='Bottleneck'>
					<AnimatedArcChart
						value={build.gemini_response.bottleneck.percentage}
						max={100}
						label={build.gemini_response.bottleneck.component}
						subtext={build.gemini_response.bottleneck.summary}
						valueSuffix='%'
						ringClassName={bottleneckTone.ringClassName}
						trailClassName={bottleneckTone.trailClassName}
						caption='Bottleneck risk'
					/>
				</ResultCard>

				<ResultCard title='Compatibility'>
					<AnimatedArcChart
						value={build.gemini_response.compatibility.score}
						max={100}
						label='Score'
						subtext={build.gemini_response.compatibility.summary}
						valueSuffix='%'
						ringClassName={compatibilityTone.ringClassName}
						trailClassName={compatibilityTone.trailClassName}
						caption='Compatibility'
						delay={0.08}
					/>
				</ResultCard>
			</section>

			<ResultCard title='FPS Estimates'>
				<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
					{build.gemini_response.fps_estimates.map((estimate, index) => (
						<FpsEstimateCard
							key={`${estimate.game}-${index}`}
							game={estimate.game}
							fps={estimate.fps}
							resolution={estimate.resolution}
							index={index}
						/>
					))}
				</div>
			</ResultCard>

			<section className='grid gap-6 xl:grid-cols-[1.05fr_1.35fr]'>
				<ResultCard title='PSU Guidance'>
					<div className='space-y-4'>
						<p className='text-5xl font-semibold text-white'>
							{build.gemini_response.psu.recommended_watts}
							<span className='ml-2 text-xl font-medium text-slate-400'>W</span>
						</p>
						<p className='text-sm leading-6 text-slate-300'>
							{build.gemini_response.psu.explanation}
						</p>
					</div>
				</ResultCard>

				<ResultCard title='Performance Summary'>
					<p className='text-sm leading-7 text-slate-300'>
						{build.gemini_response.performance_summary}
					</p>
				</ResultCard>
			</section>

			{build.gemini_response.upgrade_suggestions.length > 0 ? (
				<ResultCard title='Upgrade Suggestions'>
					<div className='grid gap-4 lg:grid-cols-2'>
						{build.gemini_response.upgrade_suggestions.map((suggestion) => (
							<div
								key={`${suggestion.component}-${suggestion.suggested}`}
								className='rounded-3xl border border-white/10 bg-white/4 p-5'
							>
								<div className='flex items-center justify-between gap-4'>
									<h3 className='text-lg font-semibold text-white'>
										{suggestion.component}
									</h3>
									<span className='rounded-full border border-sky-300/15 bg-sky-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-100'>
										Suggested
									</span>
								</div>
								<div className='mt-4 grid gap-3 text-sm text-slate-300'>
									<p>
										<span className='font-semibold text-slate-100'>Current:</span>{' '}
										{suggestion.current}
									</p>
									<p>
										<span className='font-semibold text-slate-100'>Suggested:</span>{' '}
										{suggestion.suggested}
									</p>
									<p className='leading-6'>{suggestion.reason}</p>
								</div>
							</div>
						))}
					</div>
				</ResultCard>
			) : null}

			<RefineBuildModal
				buildId={build.id}
				initialValues={toBuildFormValues(build.build_inputs)}
				isOpen={isRefineModalOpen}
				onClose={() => setIsRefineModalOpen(false)}
			/>
		</>
	)
}
