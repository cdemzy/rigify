'use client'

import Link from 'next/link'

import { motion } from 'motion/react'

import {
	BuildListItem,
	getBottleneckTone,
} from '@/lib/builds'

function formatBuildDate(value: string) {
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date(value))
}

export default function RecentBuildsList({
	builds,
}: {
	builds: BuildListItem[]
}) {
	return (
		<motion.div
			initial='hidden'
			animate='visible'
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: 0.08,
					},
				},
			}}
			className='mt-6 grid gap-4'
		>
			{builds.map((build) => {
				const tone = getBottleneckTone(build.bottleneck_percentage)

				return (
					<motion.div
						key={build.id}
						variants={{
							hidden: { opacity: 0, y: 18 },
							visible: {
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.32,
									ease: [0.22, 1, 0.36, 1],
								},
							},
						}}
					>
						<Link
							href={`/build/${build.id}`}
							className='block rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-sky-300/25 hover:bg-slate-950/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
						>
							<div className='flex flex-wrap items-start justify-between gap-3'>
								<div className='space-y-2'>
									<h3 className='text-lg font-semibold text-white'>
										{build.build_name}
									</h3>
									<p className='truncate text-sm text-slate-300'>
										{build.overall_review}
									</p>
								</div>
								<p className='text-xs uppercase tracking-[0.22em] text-slate-500'>
									{formatBuildDate(build.created_at)}
								</p>
							</div>

							<div className='mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200'>
								<span className={`h-2.5 w-2.5 rounded-full ${tone.dotClassName}`} />
								<span>{build.bottleneck_percentage}% bottleneck</span>
							</div>
						</Link>
					</motion.div>
				)
			})}
		</motion.div>
	)
}
