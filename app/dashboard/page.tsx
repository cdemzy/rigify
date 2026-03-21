import { Suspense } from 'react'

import PageMainTransition from '@/components/page-main-transition'
import SiteHeader from '@/components/site-header'

import DashboardBuildForm from './dashboard-build-form'
import RecentBuildsButton from './recent-builds-button'
import RecentBuildsScrollTarget from './recent-builds-scroll-target'
import RecentBuildsSection from './recent-builds-section'
import RecentBuildsSectionSkeleton from './recent-builds-section-skeleton'

export default function Page() {
	return (
		<div className='relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_40%,#04060d_100%)] text-white'>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
			/>

			<div className='mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pb-8 pt-4 sm:px-8 sm:pb-10 lg:px-10'>
				<SiteHeader variant='dashboard' />
				<Suspense fallback={null}>
					<RecentBuildsScrollTarget />
				</Suspense>

				<PageMainTransition className='flex flex-1 flex-col gap-6 py-6 sm:gap-8 sm:py-8'>
					<section className='mx-auto flex w-full flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between'>
						<div className='max-w-3xl'>
							<h1 className='inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xl font-semibold uppercase tracking-[0.3em] text-sky-200'>
								Build dashboard
							</h1>
						</div>

						<RecentBuildsButton />
					</section>

					<section id='build-form-and-history' className='mx-auto flex w-full flex-col gap-8 sm:gap-10'>
						<div className='w-full rounded-4xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_30px_80px_rgba(2,6,23,0.4)] backdrop-blur sm:p-6'>
							<div className='flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between'>
								<div>
									<p className='text-xs uppercase tracking-[0.28em] text-slate-500'>
										New build form
									</p>
								</div>
							</div>

							<DashboardBuildForm />
						</div>

						<Suspense fallback={<RecentBuildsSectionSkeleton />}>
							<RecentBuildsSection />
						</Suspense>
					</section>
				</PageMainTransition>
			</div>
		</div>
	)
}
