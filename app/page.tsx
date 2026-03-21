import Link from 'next/link'
import PageMainTransition from './components/page-main-transition'
import SmoothScrollLink from './components/smooth-scroll-link'

const steps = [
	{
		title: 'Enter your core parts',
		description:
			'Start with the hardware that matters most: CPU, GPU, RAM, and PSU. Rigify turns your raw parts list into a build that can actually be evaluated.',
		label: '01',
	},
	{
		title: 'Add your games and display',
		description:
			'Tell the app what you really plan to play and the resolution you care about, from competitive 1080p to high-fidelity ultrawide setups.',
		label: '02',
	},
	{
		title: 'See the build verdict',
		description:
			'Get compatibility notes, wattage guidance, bottleneck insights, and projected frame rate expectations in one focused result.',
		label: '03',
	},
]

const features = [
	{
		title: 'Compatibility checks',
		description:
			'Spot risky part combinations early before they become expensive mistakes.',
	},
	{
		title: 'Bottleneck estimate',
		description:
			'Understand whether your CPU and GPU are balanced for the games you play.',
	},
	{
		title: 'PSU and wattage guidance',
		description:
			'Get smarter power recommendations instead of guessing your headroom.',
	},
	{
		title: 'FPS by game and resolution',
		description:
			'See performance expectations in the context that actually matters to you.',
	},
	{
		title: 'Saved build history',
		description:
			'Track past submissions and compare upgrades as your setup evolves.',
	},
	{
		title: 'Actionable summaries',
		description:
			'Get a readable verdict that helps you decide what to keep, swap, or upgrade next.',
	},
]

const trustPoints = [
	'Built for gamers, streamers, and first-time PC builders',
	'Designed to turn confusing spec lists into practical decisions',
	'Focused on real-world playability, balance, and upgrade planning',
]

export default function Home() {
	return (
		<div className='relative isolate overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_38%,#04060d_100%)] text-white'>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
			/>

			<div className='relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-20 pt-10 sm:px-10 lg:px-12'>
				<header className='flex items-center justify-between gap-4 py-4'>
					<Link href='/' className='flex items-center gap-3'>
						<div className='flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold tracking-[0.25em] text-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.18)]'>
							RG
						</div>
						<div>
							<p className='text-sm font-medium uppercase tracking-[0.3em] text-slate-400'>
								Rigify
							</p>
							<p className='text-sm text-slate-500'>PC build intelligence</p>
						</div>
					</Link>

					<div className='flex items-center gap-3 sm:gap-4'>
						<nav aria-label='Primary' className='hidden items-center gap-8 md:flex'>
							<SmoothScrollLink
								href='#how-it-works'
								className='text-sm text-slate-300 transition hover:text-white'
							>
								How it works
							</SmoothScrollLink>
							<SmoothScrollLink
								href='#features'
								className='text-sm text-slate-300 transition hover:text-white'
							>
								Features
							</SmoothScrollLink>
							<SmoothScrollLink
								href='#trust'
								className='text-sm text-slate-300 transition hover:text-white'
							>
								Why Rigify
							</SmoothScrollLink>
						</nav>

						<Link
							href='/login'
							className='inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
						>
							Login
						</Link>
					</div>
				</header>

				<PageMainTransition className='flex flex-1 flex-col'>
					<section className='relative grid flex-1 items-center gap-16 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:py-20'>
						<div className='max-w-3xl'>
							<p className='inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200'>
								Plan smarter builds before you spend
							</p>
							<h1 className='mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl'>
								Build a PC setup around the games you play, not guesswork.
							</h1>
							<p className='mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl'>
								Rigify helps you enter your parts, target resolution, and favorite
								games to get clear compatibility notes, bottleneck warnings,
								wattage guidance, and realistic FPS expectations.
							</p>

							<div className='mt-10 flex flex-col gap-4 sm:flex-row'>
								<Link
									href='/login'
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

							<div className='mt-12 grid gap-4 sm:grid-cols-3'>
								<div className='rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur'>
									<p className='text-3xl font-semibold text-white'>5</p>
									<p className='mt-2 text-sm text-slate-300'>core build signals in one review</p>
								</div>
								<div className='rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur'>
									<p className='text-3xl font-semibold text-white'>1</p>
									<p className='mt-2 text-sm text-slate-300'>place to compare parts, power, and expected performance</p>
								</div>
								<div className='rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur'>
									<p className='text-3xl font-semibold text-white'>0</p>
									<p className='mt-2 text-sm text-slate-300'>need to dig through scattered forum threads for answers</p>
								</div>
							</div>
						</div>

						<div className='relative'>
							<div className='absolute inset-0 -z-10 rounded-4xl bg-sky-400/10 blur-3xl' />
							<div className='rounded-4xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.55)] backdrop-blur xl:p-7'>
								<div className='flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between'>
									<div>
										<p className='text-xs uppercase tracking-[0.28em] text-slate-500'>
											Build preview
										</p>
										<h2 className='mt-2 text-xl font-semibold text-white'>
											1440p performance check
										</h2>
									</div>
									<span className='inline-flex self-start whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-medium leading-none text-emerald-300 sm:self-auto'>
										Ready to evaluate
									</span>
								</div>

								<div className='mt-6 space-y-4'>
									<div className='rounded-2xl border border-white/8 bg-white/3 p-4'>
										<p className='text-xs uppercase tracking-[0.25em] text-slate-500'>
											Selected hardware
										</p>
										<div className='mt-4 grid gap-3 sm:grid-cols-2'>
											<div className='rounded-2xl bg-black/20 p-3'>
												<p className='text-xs text-slate-500'>CPU</p>
												<p className='mt-1 font-medium text-white'>Ryzen 7 9700X</p>
											</div>
											<div className='rounded-2xl bg-black/20 p-3'>
												<p className='text-xs text-slate-500'>GPU</p>
												<p className='mt-1 font-medium text-white'>RTX 5070</p>
											</div>
											<div className='rounded-2xl bg-black/20 p-3'>
												<p className='text-xs text-slate-500'>Memory</p>
												<p className='mt-1 font-medium text-white'>32GB DDR5</p>
											</div>
											<div className='rounded-2xl bg-black/20 p-3'>
												<p className='text-xs text-slate-500'>Display</p>
												<p className='mt-1 font-medium text-white'>1440p / 165Hz</p>
											</div>
										</div>
									</div>

									<div className='grid gap-4 sm:grid-cols-2'>
										<div className='rounded-2xl border border-white/8 bg-white/3 p-4'>
											<p className='text-xs uppercase tracking-[0.25em] text-slate-500'>
												Compatibility
											</p>
											<p className='mt-3 text-lg font-semibold text-white'>Well balanced</p>
											<p className='mt-2 text-sm leading-6 text-slate-300'>
												The 9700X and RTX 5070 pair cleanly for high-refresh 1440p
												gaming without an obvious CPU-side bottleneck.
											</p>
										</div>
										<div className='rounded-2xl border border-white/8 bg-white/3 p-4'>
											<p className='text-xs uppercase tracking-[0.25em] text-slate-500'>
												Power target
											</p>
											<p className='mt-3 text-lg font-semibold text-white'>850W recommended</p>
											<p className='mt-2 text-sm leading-6 text-slate-300'>
												Enough headroom for transient spikes, sustained gaming loads,
												and a cleaner upgrade path later on.
											</p>
										</div>
									</div>

									<div className='rounded-2xl border border-white/8 bg-linear-to-br from-sky-400/12 via-transparent to-blue-500/12 p-4'>
										<div className='flex items-center justify-between gap-4'>
											<div>
												<p className='text-xs uppercase tracking-[0.25em] text-slate-500'>
													Estimated outcome
												</p>
												<p className='mt-3 text-lg font-semibold text-white'>
													Ultra-friendly 1440p performance with strong frame-time stability
												</p>
											</div>
											<p className='text-right text-sm font-medium text-sky-200'>
												FPS modeled by game
											</p>
										</div>
										<div className='mt-5 grid gap-3 sm:grid-cols-3'>
											<div className='rounded-2xl bg-slate-950/70 p-3'>
												<p className='text-xs text-slate-500'>Warzone</p>
												<p className='mt-2 text-xl font-semibold text-white'>170+</p>
											</div>
											<div className='rounded-2xl bg-slate-950/70 p-3'>
												<p className='text-xs text-slate-500'>Fortnite</p>
												<p className='mt-2 text-xl font-semibold text-white'>220+</p>
											</div>
											<div className='rounded-2xl bg-slate-950/70 p-3'>
												<p className='text-xs text-slate-500'>Cyberpunk</p>
												<p className='mt-2 text-xl font-semibold text-white'>110+</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section
						id='how-it-works'
						className='mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-20 sm:px-10 lg:px-12'
					>
						<div className='max-w-2xl'>
							<p className='text-sm font-semibold uppercase tracking-[0.3em] text-sky-300'>
								How it works
							</p>
							<h2 className='mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl'>
								From parts list to build confidence in three steps
							</h2>
							<p className='mt-4 text-lg leading-8 text-slate-300'>
								The goal is simple: give you a better answer than scattered specs,
								reddit guesses, and vague recommendations.
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
						className='mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-20 sm:px-10 lg:px-12'
					>
						<div className='grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start'>
							<div className='max-w-xl'>
								<p className='text-sm font-semibold uppercase tracking-[0.3em] text-sky-300'>
									Features
								</p>
								<h2 className='mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl'>
									The checks builders actually care about
								</h2>
								<p className='mt-4 text-lg leading-8 text-slate-300'>
									Rigify is built to answer the practical questions behind every build:
									will these parts work well together, how much power do I need, and
									what should I expect in the games I play most?
								</p>
							</div>

							<div className='grid gap-4 sm:grid-cols-2'>
								{features.map((feature) => (
									<article
										key={feature.title}
										className='rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.25)]'
									>
										<h3 className='text-xl font-semibold text-white'>{feature.title}</h3>
										<p className='mt-3 text-base leading-7 text-slate-300'>
											{feature.description}
										</p>
									</article>
								))}
							</div>
						</div>
					</section>

					<section
						id='trust'
						className='mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-20 sm:px-10 lg:px-12'
					>
						<div className='rounded-4xl border border-white/10 bg-white/4 p-8 backdrop-blur sm:p-10'>
							<div className='grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center'>
								<div>
									<p className='text-sm font-semibold uppercase tracking-[0.3em] text-sky-300'>
										Why Rigify
									</p>
									<h2 className='mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl'>
										Built for gamers, streamers, and first-time PC builders
									</h2>
									<p className='mt-4 text-lg leading-8 text-slate-300'>
										Whether you are planning your first build or trying to optimize an
										upgrade path, Rigify is meant to make hardware decisions clearer,
										faster, and less intimidating.
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
						className='mx-auto w-full max-w-7xl scroll-mt-20 px-6 pb-24 pt-10 sm:px-10 lg:px-12'
					>
						<div className='rounded-4xl border border-sky-300/20 bg-linear-to-br from-sky-400/12 via-slate-950/90 to-blue-500/12 p-8 shadow-[0_24px_80px_rgba(14,165,233,0.12)] sm:p-10 lg:p-12'>
							<div className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
								<div className='max-w-2xl'>
									<p className='text-sm font-semibold uppercase tracking-[0.3em] text-sky-300'>
										Start with the page that matters
									</p>
									<h2 className='mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl'>
										Try your first build and see whether your setup actually fits your goals.
									</h2>
									<p className='mt-4 text-lg leading-8 text-slate-300'>
										Use Rigify to turn a parts list into a more informed gaming PC
										decision before you buy, upgrade, or second-guess the build.
									</p>
								</div>

								<div className='flex flex-col gap-4 sm:flex-row'>
									<Link
										href='/login'
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
