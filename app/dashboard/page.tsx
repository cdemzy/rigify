import PageMainTransition from '@/components/page-main-transition'
import SiteHeader from '@/components/site-header'
import SmoothScrollLink from '@/components/smooth-scroll-link'

import DashboardBuildForm from './dashboard-build-form'

const historyItems = [
	{
		title: '9700X + RTX 5070',
		date: 'March 20',
		summary: 'Well-balanced 1440p build with strong headroom for modern AAA titles.',
		status: 'Ready for review',
	},
	{
		title: '7800X3D Upgrade Draft',
		date: 'March 18',
		summary: 'Focused on competitive FPS gains and lower bottleneck risk at high refresh rates.',
		status: 'Needs comparison',
	},
	{
		title: 'Budget 1080p Starter Build',
		date: 'March 15',
		summary: 'Entry-level gaming setup with a tighter wattage envelope and upgrade-first path.',
		status: 'Archived',
	},
]

export default function Page() {
	return (
		<div className='relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_40%,#04060d_100%)] text-white'>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
			/>

			<div className='mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pb-8 pt-4 sm:px-8 sm:pb-10 lg:px-10'>
				<SiteHeader variant='dashboard' />

				<PageMainTransition className='flex flex-1 flex-col gap-6 py-6 sm:gap-8 sm:py-8'>
					<section className='mx-auto flex w-full flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between'>
						<div className='max-w-3xl'>
							<h1 className='inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xl font-semibold uppercase tracking-[0.3em] text-sky-200'>
								Build dashboard
							</h1>
						</div>

						<SmoothScrollLink
							href='#recent-builds'
							className='inline-flex min-h-10 w-full items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:w-auto md:self-auto'
						>
							Recent Builds
						</SmoothScrollLink>
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

							<div className='mt-6 grid gap-4 xl:grid-cols-2'>
								{historyItems.map((item) => (
									<article
										key={item.title}
										className='rounded-3xl border border-white/10 bg-slate-950/65 p-5'
									>
										<div className='flex flex-col gap-4'>
											<div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
												<div>
													<p className='text-lg font-semibold text-white'>{item.title}</p>
													<p className='mt-1 text-sm text-slate-500'>{item.date}</p>
												</div>
												<span className='inline-flex self-start rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-200'>
													{item.status}
												</span>
											</div>
											<p className='text-sm leading-6 text-slate-300'>{item.summary}</p>
										</div>
									</article>
								))}
							</div>
						</aside>
					</section>
				</PageMainTransition>
			</div>
		</div>
	)
}
