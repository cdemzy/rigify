import { getRecentBuildsForCurrentUser } from '@/lib/builds-server'

import RecentBuildsList from './recent-builds-list'

export default async function RecentBuildsSection() {
	const builds = await getRecentBuildsForCurrentUser()

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

			{builds.length > 0 ? (
				<RecentBuildsList builds={builds} />
			) : (
				<div className='mt-6 rounded-3xl border border-dashed border-white/10 bg-slate-950/40 p-5 text-center'>
					<p className='text-sm font-medium text-slate-400'>
						You have no recent builds.
					</p>
				</div>
			)}
		</aside>
	)
}
