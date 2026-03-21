import PageMainTransition from '@/components/page-main-transition'
import SiteHeader from '@/components/site-header'
import SmoothScrollLink from '@/components/smooth-scroll-link'
import Link from 'next/link'

const steps = [
	{
		title: 'Build around your real setup',
		description:
			'Start with your CPU, GPU, RAM, resolution, refresh rate, and the games you actually care about. Rigify evaluates the build around how you plan to use it.',
		label: '01',
	},
	{
		title: 'Get an AI build breakdown',
		description:
			'See bottleneck risk, compatibility scoring, FPS estimates, PSU guidance, and an overall performance summary in one focused results page.',
		label: '02',
	},
	{
		title: 'Save and refine later',
		description:
			'Every completed analysis is saved to your dashboard so you can revisit older builds, compare ideas, and refine the same build without starting from scratch.',
		label: '03',
	},
]

const features = [
	{
		title: 'Structured AI analysis',
		description:
			'Each build returns a clean AI verdict with bottlenecks, compatibility, FPS, power, and upgrade guidance.',
	},
	{
		title: 'Bottleneck estimate',
		description:
			'Understand whether your CPU and GPU are balanced for the games and display target you picked.',
	},
	{
		title: 'FPS estimates by title',
		description:
			'Get per-game frame-rate projections, with Rigify padding additional popular titles when needed for a fuller picture.',
	},
	{
		title: 'PSU guidance',
		description:
			'See a recommended wattage target and supporting explanation instead of guessing your power headroom.',
	},
	{
		title: 'Saved build history',
		description:
			'Keep a running list of your recent analyses so you can reopen previous builds from the dashboard any time.',
	},
	{
		title: 'Refine build workflow',
		description:
			'Open an existing result, tweak the inputs, and regenerate the same build instead of manually rebuilding the form every time.',
	},
]

const trustPoints = [
	'Built around gaming-focused build decisions instead of generic spec comparisons',
	'Designed to turn scattered part lists into saved, readable build reports',
	'Focused on playability, balance, and upgrade clarity before you spend money',
]

const sampleCharts = [
	{
		label: 'Bottleneck',
		value: 12,
		toneClassName: 'text-sky-200',
		strokeClassName: 'text-sky-300',
	},
	{
		label: 'Compatibility',
		value: 92,
		toneClassName: 'text-cyan-200',
		strokeClassName: 'text-cyan-300',
	},
	{
		label: '1440p fit',
		value: 88,
		toneClassName: 'text-blue-200',
		strokeClassName: 'text-blue-300',
	},
]

export default function Home() {
	return (
		<div className='relative isolate overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_38%,#04060d_100%)] text-white'>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
			/>

			<div className='relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 pb-20 pt-4 sm:px-10 lg:px-12'>
				<SiteHeader variant='marketing' />

				<PageMainTransition className='flex flex-1 flex-col'>
					<section id='hero-preview' className='relative grid flex-1 gap-10 py-12 lg:grid-cols-[minmax(0,1.18fr)_minmax(280px,0.82fr)] lg:items-stretch lg:py-8'>
						<div className='flex h-full max-w-3xl flex-col justify-center'>
							<p className='inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200'>
								Plan smarter builds before you spend
							</p>
							<h1 className='mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl'>
								Plan a gaming PC with AI-backed answers, not scattered guesses.
							</h1>
							<p className='mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg'>
								Rigify lets you submit a build, generate a structured AI analysis,
								save the result to your dashboard, and refine that build later when
								you want to compare upgrades or new part combinations.
							</p>

							<div className='mt-8 flex flex-col gap-4 sm:flex-row'>
								<Link
									href='/auth/login'
									className='inline-flex min-h-14 whitespace-nowrap items-center justify-center rounded-full bg-sky-400 px-7 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
								>
									Build My Setup
								</Link>
								<SmoothScrollLink
									href='#how-it-works'
									className='inline-flex min-h-14 whitespace-nowrap items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
								>
									See How It Works
								</SmoothScrollLink>
							</div>

							<div className='mt-9 grid gap-4 sm:grid-cols-3'>
								<div className='rounded-3xl border border-white/10 bg-white/4 p-4 backdrop-blur'>
									<p className='text-2xl font-semibold text-white'>6+</p>
									<p className='mt-2 text-sm text-slate-300'>FPS estimates returned in each AI analysis</p>
								</div>
								<div className='rounded-3xl border border-white/10 bg-white/4 p-4 backdrop-blur'>
									<p className='text-2xl font-semibold text-white'>1</p>
									<p className='mt-2 text-sm text-slate-300'>saved dashboard for new builds and past results</p>
								</div>
								<div className='rounded-3xl border border-white/10 bg-white/4 p-4 backdrop-blur'>
									<p className='text-2xl font-semibold text-white'>3</p>
									<p className='mt-2 text-sm text-slate-300'>core phases: submit, review, refine</p>
								</div>
							</div>
						</div>

						<div className='relative flex h-full lg:justify-end'>
							<div className='absolute inset-0 -z-10 rounded-4xl bg-sky-400/10 blur-3xl' />
							<div className='flex h-full w-full max-w-120 flex-col rounded-4xl border border-white/10 bg-slate-950/70 p-4.5 shadow-[0_30px_80px_rgba(2,6,23,0.55)] backdrop-blur xl:p-5'>
								<div className='flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between'>
									<div>
										<p className='text-xs uppercase tracking-[0.28em] text-slate-500'>
											Build preview
										</p>
										<h2 className='mt-2 text-lg font-semibold text-white'>
											Saved analysis preview
										</h2>
									</div>
									<span className='inline-flex self-start whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-medium leading-none text-emerald-300 sm:self-auto'>
										Evaluation Complete
									</span>
								</div>

								<div className='mt-4 space-y-3'>
									<div className='rounded-2xl border border-white/8 bg-white/3 p-3'>
										<p className='text-xs uppercase tracking-[0.25em] text-slate-500'>
											Selected hardware
										</p>
										<div className='mt-3 grid gap-2.5 sm:grid-cols-2'>
											<div className='rounded-2xl bg-black/20 p-2.5'>
												<p className='text-xs text-slate-500'>CPU</p>
												<p className='mt-1 text-sm font-medium text-white'>Ryzen 7 9700X</p>
											</div>
											<div className='rounded-2xl bg-black/20 p-2.5'>
												<p className='text-xs text-slate-500'>GPU</p>
												<p className='mt-1 text-sm font-medium text-white'>RTX 5070</p>
											</div>
											<div className='rounded-2xl bg-black/20 p-2.5'>
												<p className='text-xs text-slate-500'>Memory</p>
												<p className='mt-1 text-sm font-medium text-white'>32GB DDR5</p>
											</div>
											<div className='rounded-2xl bg-black/20 p-2.5'>
												<p className='text-xs text-slate-500'>Display</p>
												<p className='mt-1 text-sm font-medium text-white'>1440p / 165Hz</p>
											</div>
										</div>
									</div>

									<div className='grid gap-3 sm:grid-cols-2'>
										<div className='rounded-2xl border border-white/8 bg-white/3 p-3'>
											<p className='text-xs uppercase tracking-[0.25em] text-slate-500'>
												Overall review
											</p>
											<p className='mt-2 text-base font-semibold text-white'>
												Excellent 1440p balance
											</p>
										</div>
										<div className='rounded-2xl border border-white/8 bg-white/3 p-3'>
											<p className='text-xs uppercase tracking-[0.25em] text-slate-500'>
												Power target
											</p>
											<p className='mt-2 text-base font-semibold text-white'>850W recommended</p>
										</div>
									</div>

									<div className='rounded-2xl border border-white/8 bg-linear-to-br from-sky-400/12 via-transparent to-blue-500/12 p-3'>
										<div className='flex items-center justify-between gap-4'>
											<div>
												<p className='text-xs uppercase tracking-[0.25em] text-slate-500'>
													Analysis snapshot
												</p>
												<p className='mt-2 text-base font-semibold text-white'>
													Saved builds keep the verdict, FPS breakdown, and upgrade direction in one place
												</p>
											</div>
										</div>
										<div className='mt-4 grid grid-cols-3 gap-2.5'>
											{sampleCharts.map((chart) => {
												const dashOffset = 100 - chart.value

												return (
													<div
														key={chart.label}
														className='min-w-0 rounded-2xl border border-sky-300/10 bg-linear-to-br from-sky-400/8 via-slate-950/75 to-blue-500/8 p-2.5'
													>
														<p className='text-xs text-slate-500'>{chart.label}</p>
														<div className='mt-2.5 flex justify-center'>
															<div className='relative h-12 w-12 shrink-0'>
																<svg
																	viewBox='0 0 36 36'
																	className='h-12 w-12 -rotate-90'
																	aria-hidden='true'
																>
																	<circle
																		cx='18'
																		cy='18'
																		r='15.5'
																		fill='none'
																		stroke='currentColor'
																		strokeWidth='3.25'
																		className='text-white/10'
																	/>
																	<circle
																		cx='18'
																		cy='18'
																		r='15.5'
																		fill='none'
																		stroke='currentColor'
																		strokeWidth='3.25'
																		strokeLinecap='round'
																		pathLength='100'
																		strokeDasharray='100'
																		strokeDashoffset={dashOffset}
																		className={chart.strokeClassName}
																	/>
																</svg>
																<div className='absolute inset-0 flex items-center justify-center text-sm font-semibold text-white'>
																	{chart.value}%
																</div>
															</div>
														</div>
														<div className={`mt-2 text-center text-xs font-medium ${chart.toneClassName}`}>
															{chart.label === 'Bottleneck'
																? 'Low impact'
																: chart.value >= 90
																? 'Excellent'
																: chart.value >= 80
																	? 'Strong'
																	: 'Low impact'}
														</div>
													</div>
												)
											})}
										</div>
										<div className='mt-4 grid grid-cols-3 gap-2.5'>
											<div className='rounded-2xl bg-slate-950/70 p-2.5'>
												<p className='text-xs text-slate-500'>Warzone</p>
												<p className='mt-2 text-lg font-semibold text-white'>170+</p>
											</div>
											<div className='rounded-2xl bg-slate-950/70 p-2.5'>
												<p className='text-xs text-slate-500'>Fortnite</p>
												<p className='mt-2 text-lg font-semibold text-white'>220+</p>
											</div>
											<div className='rounded-2xl bg-slate-950/70 p-2.5'>
												<p className='text-xs text-slate-500'>Cyberpunk</p>
												<p className='mt-2 text-lg font-semibold text-white'>110+</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section
						id='how-it-works'
						className='mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-20 sm:px-10 lg:px-12'
					>
						<div className='max-w-2xl'>
							<p className='text-sm font-semibold uppercase tracking-[0.3em] text-sky-300'>
								How it works
							</p>
							<h2 className='mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl'>
								From first idea to saved result in three steps
							</h2>
							<p className='mt-4 text-lg leading-8 text-slate-300'>
								Rigify is built around a simple loop: submit a build, review the
								analysis, and come back later to refine or compare it from your
								dashboard.
							</p>
						</div>

						<div className='mt-12 grid gap-5 lg:grid-cols-3'>
							{steps.map((step) => (
								<article
									key={step.title}
									className='rounded-[1.75rem] border border-white/10 bg-white/4 p-6 backdrop-blur'
								>
									<p className='text-sm font-semibold uppercase tracking-[0.3em] text-sky-300'>
										{step.label}
									</p>
									<h3 className='mt-5 text-2xl font-semibold text-white'>{step.title}</h3>
									<p className='mt-4 text-base leading-7 text-slate-300'>
										{step.description}
									</p>
								</article>
							))}
						</div>
					</section>

					<section
						id='features'
						className='mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-20 sm:px-10 lg:px-12'
					>
						<div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
							<div className='max-w-xl xl:col-span-2'>
								<p className='text-sm font-semibold uppercase tracking-[0.3em] text-sky-300'>
									Features
								</p>
								<h2 className='mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl'>
									The product you actually use after signing in
								</h2>
								<p className='mt-4 text-lg leading-8 text-slate-300'>
									The current Rigify flow is built around repeated decision-making:
									create a build, inspect the AI verdict, save it automatically, and
									revisit it later from Saved Builds when you want to refine it.
								</p>
							</div>

							{features.map((feature) => (
								<article
									key={feature.title}
									className='h-full rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.25)]'
								>
									<h3 className='text-xl font-semibold text-white'>{feature.title}</h3>
									<p className='mt-3 text-base leading-6 text-slate-300'>
										{feature.description}
									</p>
								</article>
							))}
						</div>
					</section>

					<section
						id='trust'
						className='mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-20 sm:px-10 lg:px-12'
					>
						<div className='rounded-4xl border border-white/10 bg-white/4 p-8 backdrop-blur sm:p-10'>
							<div className='grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center'>
								<div>
									<p className='text-sm font-semibold uppercase tracking-[0.3em] text-sky-300'>
										Why Rigify
									</p>
									<h2 className='mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl'>
										Built for people actively planning a gaming PC
									</h2>
									<p className='mt-4 text-lg leading-8 text-slate-300'>
										Whether you are sketching a first build or testing upgrade ideas,
										Rigify is meant to make each decision clearer with saved context,
										structured AI output, and a tighter workflow than piecing answers
										together manually.
									</p>
								</div>

								<ul className='grid gap-4' aria-label='Rigify trust points'>
									{trustPoints.map((point) => (
										<li
											key={point}
											className='rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-4 text-base leading-7 text-slate-200'
										>
											{point}
										</li>
									))}
								</ul>
							</div>
						</div>
					</section>

					<section
						id='final-cta'
						className='mx-auto w-full max-w-5xl scroll-mt-20 px-6 pb-24 pt-10 sm:px-10 lg:px-12'
					>
						<div className='rounded-4xl border border-sky-300/20 bg-linear-to-br from-sky-400/12 via-slate-950/90 to-blue-500/12 p-8 shadow-[0_24px_80px_rgba(14,165,233,0.12)] sm:p-10 lg:p-12'>
							<div className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
								<div className='max-w-2xl'>
									<p className='text-sm font-semibold uppercase tracking-[0.3em] text-sky-300'>
										Get started
									</p>
									<h2 className='mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl'>
										Start a build, save the result, and come back smarter on the next pass.
									</h2>
									<p className='mt-4 text-lg leading-8 text-slate-300'>
										Use Rigify to turn a parts list into a saved AI review you can
										revisit, refine, and compare before you buy or upgrade anything.
									</p>
								</div>

								<div className='flex flex-col gap-4 sm:flex-row'>
									<Link
										href='/auth/login'
										className='inline-flex min-h-14 whitespace-nowrap items-center justify-center rounded-full bg-sky-400 px-7 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
									>
										Build My Setup
									</Link>
									<SmoothScrollLink
										href='#features'
										className='inline-flex min-h-14 whitespace-nowrap items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
									>
										Explore Features
									</SmoothScrollLink>
								</div>
							</div>
						</div>
					</section>
				</PageMainTransition>
			</div>
		</div>
	)
}
