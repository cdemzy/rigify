import { notFound } from 'next/navigation'

import PageMainTransition from '@/components/page-main-transition'
import SiteHeader from '@/components/site-header'
import { getBuildForCurrentUser } from '@/lib/builds-server'

import BuildResultsView from './build-results-view'

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const build = await getBuildForCurrentUser(id)

	if (!build) {
		notFound()
	}

	return (
		<div className='relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_40%,#04060d_100%)] text-white'>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
			/>

			<div className='mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pb-8 pt-4 sm:px-8 sm:pb-10 lg:px-10'>
				<SiteHeader variant='dashboard' />

				<PageMainTransition className='flex flex-1 flex-col gap-6 py-6 sm:gap-8 sm:py-8'>
					<BuildResultsView build={build} />
				</PageMainTransition>
			</div>
		</div>
	)
}
