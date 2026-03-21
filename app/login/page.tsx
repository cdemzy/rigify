import Link from 'next/link'
import PageMainTransition from '../components/page-main-transition'

export default function LoginPage() {
	return (
		<div className='relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_42%,#04060d_100%)] text-white'>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
			/>

			<div className='mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 sm:px-10 lg:px-12'>
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

					<Link
						href='/'
						className='inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
					>
						Back to home
					</Link>
				</header>

				<PageMainTransition className='flex flex-1 items-center py-12 lg:py-16'>
					<div className='grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.85fr)] lg:gap-14'>
						<div className='max-w-2xl'>
							<p className='inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200'>
								Access your saved builds
							</p>
							<h1 className='mt-8 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl'>
								Log in to continue building smarter PCs.
							</h1>
							<p className='mt-6 max-w-xl text-lg leading-8 text-slate-300'>
								Sign in to return to your saved submissions, compare upgrades, and
								pick up where your last build evaluation left off.
							</p>

							<div className='mt-10 grid gap-4 sm:grid-cols-3'>
								<div className='rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur'>
									<p className='text-sm font-semibold uppercase tracking-[0.25em] text-sky-300'>
										Saved builds
									</p>
									<p className='mt-3 text-sm leading-6 text-slate-300'>
										Keep your part lists organized in one place.
									</p>
								</div>
								<div className='rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur'>
									<p className='text-sm font-semibold uppercase tracking-[0.25em] text-sky-300'>
										FPS history
									</p>
									<p className='mt-3 text-sm leading-6 text-slate-300'>
										Revisit past performance estimates and comparisons.
									</p>
								</div>
								<div className='rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur'>
									<p className='text-sm font-semibold uppercase tracking-[0.25em] text-sky-300'>
										Upgrade planning
									</p>
									<p className='mt-3 text-sm leading-6 text-slate-300'>
										Track what changed as you refine your build over time.
									</p>
								</div>
							</div>
						</div>

						<div className='relative'>
							<div className='absolute inset-0 -z-10 rounded-4xl bg-sky-400/10 blur-3xl' />
							<div className='rounded-4xl border border-white/10 bg-slate-950/75 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.55)] backdrop-blur sm:p-8'>
								<div className='border-b border-white/10 pb-6'>
									<p className='text-xs uppercase tracking-[0.28em] text-slate-500'>
										Account access
									</p>
									<h2 className='mt-3 text-2xl font-semibold text-white'>Welcome back</h2>
									<p className='mt-3 text-sm leading-6 text-slate-300'>
										Use your account to continue reviewing builds, part choices, and
										performance expectations.
									</p>
								</div>

								<form className='mt-6 space-y-5'>
									<div>
										<label
											htmlFor='email'
											className='block text-sm font-medium text-slate-200'
										>
											Email address
										</label>
										<input
											id='email'
											name='email'
											type='email'
											autoComplete='email'
											placeholder='you@example.com'
											className='mt-2 block w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
										/>
									</div>

									<div>
										<div className='flex items-center justify-between gap-4'>
											<label
												htmlFor='password'
												className='block text-sm font-medium text-slate-200'
											>
												Password
											</label>
											<Link
												href='/forgot-password'
												className='text-sm font-medium text-sky-300 transition hover:text-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
											>
												Forgot password?
											</Link>
										</div>
										<input
											id='password'
											name='password'
											type='password'
											autoComplete='current-password'
											placeholder='Enter your password'
											className='mt-2 block w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
										/>
									</div>

									<button
										type='submit'
										className='inline-flex min-h-14 w-full items-center justify-center rounded-full bg-sky-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
									>
										Log In
									</button>
								</form>

								<div className='mt-6 rounded-2xl border border-white/8 bg-white/3 p-4'>
									<p className='text-sm leading-6 text-slate-300'>
										Log in to return to saved builds, past evaluations, and the part
										comparisons you were already working through.
									</p>
								</div>

								<p className='mt-6 text-center text-sm text-slate-400'>
									New to Rigify?{' '}
									<Link
										href='/signup'
										className='font-semibold text-sky-300 transition hover:text-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
									>
										Create an account
									</Link>
								</p>
							</div>
						</div>
					</div>
				</PageMainTransition>
			</div>
		</div>
	)
}
