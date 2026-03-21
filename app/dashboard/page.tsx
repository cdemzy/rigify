import { Suspense, type ReactNode } from 'react'

import PageMainTransition from '@/components/page-main-transition'
import SiteHeader from '@/components/site-header'

import DashboardBuildForm from './dashboard-build-form'
import DashboardViewSwitcher from './dashboard-view-switcher'
import RecentBuildsSection from './recent-builds-section'
import RecentBuildsSectionSkeleton from './recent-builds-section-skeleton'

export default function Page({
	searchParams,
}: {
	searchParams?: Promise<{ section?: string }>
}) {
	const initialSectionPromise = searchParams ?? Promise.resolve({})

	return (
		<div className='relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_40%,#04060d_100%)] text-white'>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
			/>

			<div className='mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pb-8 pt-4 sm:px-8 sm:pb-10 lg:px-10'>
				<SiteHeader variant='dashboard' />

				<PageMainTransition className='flex flex-1 flex-col gap-6 py-6 sm:gap-8 sm:py-8'>
					

					<Suspense fallback={<RecentBuildsSectionSkeleton />}>
						<DashboardViewSwitcherLoader
							initialSectionPromise={initialSectionPromise}
							buildForm={<DashboardBuildForm />}
							recentBuilds={<RecentBuildsSection />}
						/>
					</Suspense>
				</PageMainTransition>
			</div>
		</div>
	)
}

async function DashboardViewSwitcherLoader({
	initialSectionPromise,
	buildForm,
	recentBuilds,
}: {
	initialSectionPromise: Promise<{ section?: string }>
	buildForm: ReactNode
	recentBuilds: ReactNode
}) {
	const { section } = await initialSectionPromise
	const initialSection = section === 'saved-builds' ? 'saved-builds' : 'new-build'

	return (
		<DashboardViewSwitcher
			initialSection={initialSection}
			buildForm={buildForm}
			recentBuilds={recentBuilds}
		/>
	)
}
