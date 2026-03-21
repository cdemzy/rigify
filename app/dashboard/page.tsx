import PageMainTransition from '@/components/page-main-transition'
import SiteHeader from '@/components/site-header'
import SmoothScrollLink from '@/components/smooth-scroll-link'
import { IoSparkles } from 'react-icons/io5'

import SelectedGamesFields from './selected-games-fields'
import StorageFields from './storage-fields'

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
					<section className='mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between'>
						<div className='max-w-3xl'>
							<h1 className='inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xl font-semibold uppercase tracking-[0.3em] text-sky-200'>
								Build dashboard
							</h1>
						</div>

						<SmoothScrollLink
							href='#recent-builds'
							className='inline-flex min-h-10 self-start whitespace-nowrap items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
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

							<form className='mt-5 space-y-4'>
								<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
									<div className='w-full'>
										<label htmlFor='cpu' className='block text-sm font-medium text-slate-200'>
											CPU
										</label>
										<input
											id='cpu'
											name='cpu'
											type='text'
											placeholder='Ryzen 7 9700X'
											className='mt-1.5 block w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
										/>
									</div>

									<div className='w-full'>
										<label htmlFor='gpu' className='block text-sm font-medium text-slate-200'>
											GPU
										</label>
										<input
											id='gpu'
											name='gpu'
											type='text'
											placeholder='RTX 5070'
											className='mt-1.5 block w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
										/>
									</div>

									<div className='w-full'>
										<label htmlFor='psu' className='block text-sm font-medium text-slate-200'>
											PSU
										</label>
										<input
											id='psu'
											name='psu'
											type='text'
											placeholder='850W 80+ Gold'
											className='mt-1.5 block w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
										/>
									</div>

									<fieldset className='w-full rounded-3xl border border-white/10 bg-white/3 p-3.5 sm:col-span-2 xl:col-span-2'>
										<legend className='px-2 text-sm font-medium text-slate-200'>RAM</legend>
										<div className='mt-2.5 grid gap-3 sm:grid-cols-2'>
											<div>
												<label
													htmlFor='ram-capacity'
													className='block text-sm font-medium text-slate-200'
												>
													Capacity
												</label>
												<input
													id='ram-capacity'
													name='ramCapacity'
													type='text'
													placeholder='32GB'
													className='mt-1.5 block w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
												/>
											</div>
											<div>
												<label
													htmlFor='ram-generation'
													className='block text-sm font-medium text-slate-200'
												>
													Generation
												</label>
												<input
													id='ram-generation'
													name='ramGeneration'
													type='text'
													placeholder='DDR5'
													className='mt-1.5 block w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
												/>
											</div>
										</div>
									</fieldset>

									<fieldset className='w-full rounded-3xl border border-white/10 bg-white/3 p-3.5 sm:col-span-2 xl:col-span-1'>
										<legend className='px-2 text-sm font-medium text-slate-200'>Display</legend>
										<div className='mt-2.5 grid gap-3 sm:grid-cols-2'>
											<div>
												<label
													htmlFor='monitor-resolution'
													className='block text-sm font-medium text-slate-200'
												>
													Resolution
												</label>
												<input
													id='monitor-resolution'
													name='monitorResolution'
													type='text'
													placeholder='1440p'
													className='mt-1.5 block w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
												/>
											</div>
											<div>
												<label
													htmlFor='monitor-refresh-rate'
													className='block text-sm font-medium text-slate-200'
												>
													Refresh rate
												</label>
												<input
													id='monitor-refresh-rate'
													name='monitorRefreshRate'
													type='text'
													placeholder='165Hz'
													className='mt-1.5 block w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
												/>
											</div>
										</div>
									</fieldset>

									<StorageFields />

									<SelectedGamesFields />
								</div>

								<button
									type='submit'
									className='cta-glow inline-flex min-h-11 w-full items-center justify-center rounded-full border border-sky-300/40 bg-slate-950 px-6 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(14,165,233,0.28)] transition hover:border-sky-200/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 gap-2'
								>
									<IoSparkles className='h-3 w-3 text-white' />
									<span>Evaluate</span>
								</button>
							</form>
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
								<p className='mt-3 text-sm leading-6 text-slate-300'>
									Jump back into your latest drafts, comparisons, and reviewed builds
									without losing focus on the form.
								</p>
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
