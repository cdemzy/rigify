export default function RecentBuildsSectionSkeleton() {
	return (
		<aside
			id='recent-builds'
			className='w-full rounded-4xl border border-white/10 bg-white/4 p-5 backdrop-blur scroll-mt-20 sm:p-6'
		>
			<div className='border-b border-white/10 pb-6'>
				<p className='text-xs uppercase tracking-[0.28em] text-slate-500'>
					Saved builds
				</p>
				<h2 className='mt-3 text-2xl font-semibold text-white'>
					Recent build history
				</h2>
			</div>

			<div className='mt-6 grid gap-4'>
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						key={index}
						className='h-28 animate-pulse rounded-3xl border border-white/10 bg-slate-950/45'
					/>
				))}
			</div>
		</aside>
	)
}
