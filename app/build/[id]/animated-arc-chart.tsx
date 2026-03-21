'use client'

import { motion, useReducedMotion } from 'motion/react'

interface AnimatedArcChartProps {
	value: number
	max: number
	label: string
	subtext: string
	valueSuffix?: string
	caption?: string
	ringClassName: string
	trailClassName: string
	size?: number
	strokeWidth?: number
	delay?: number
}

export default function AnimatedArcChart({
	value,
	max,
	label,
	subtext,
	valueSuffix = '',
	caption,
	ringClassName,
	trailClassName,
	size = 220,
	strokeWidth = 18,
	delay = 0,
}: AnimatedArcChartProps) {
	const shouldReduceMotion = useReducedMotion()
	const normalizedValue = Math.min(Math.max(value / max, 0), 1)
	const radius = (size - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius

	return (
		<div className='flex flex-col items-center text-center'>
			<div
				className='relative'
				style={{
					width: size,
					height: size,
				}}
			>
				<svg
					viewBox={`0 0 ${size} ${size}`}
					className='h-full w-full -rotate-90 overflow-visible'
				>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						strokeWidth={strokeWidth}
						className={trailClassName}
						fill='none'
					/>
					<motion.circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						strokeWidth={strokeWidth}
						className={ringClassName}
						fill='none'
						stroke='currentColor'
						strokeLinecap='round'
						initial={{
							strokeDashoffset: circumference,
						}}
						animate={{
							strokeDashoffset: circumference * (1 - normalizedValue),
						}}
						transition={{
							duration: shouldReduceMotion ? 0 : 1.1,
							delay: shouldReduceMotion ? 0 : delay,
							ease: [0.22, 1, 0.36, 1],
						}}
						strokeDasharray={circumference}
					/>
				</svg>

				<div className='absolute inset-0 flex flex-col items-center justify-center px-6'>
					<p className='text-4xl font-semibold text-white'>
						{Math.round(value)}
						{valueSuffix}
					</p>
					<p className='mt-2 text-sm uppercase tracking-[0.3em] text-slate-400'>
						{label}
					</p>
				</div>
			</div>

			{caption ? (
				<p className='mt-5 text-sm font-medium uppercase tracking-[0.24em] text-slate-500'>
					{caption}
				</p>
			) : null}
			<p className='mt-3 max-w-sm text-sm leading-6 text-slate-300'>{subtext}</p>
		</div>
	)
}
