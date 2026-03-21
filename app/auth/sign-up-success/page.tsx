import Link from 'next/link'

import PageMainTransition from '@/components/page-main-transition'
import SiteHeader from '@/components/site-header'
import SignUpSuccessCookieClearer from './sign-up-success-cookie-clearer'

export default function Page() {
	return (
		<div className='relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_42%,#04060d_100%)] text-white'>
			<SignUpSuccessCookieClearer />
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
			/>

			<div className='mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 pb-10 pt-4 sm:px-10 lg:px-12'>
				<SiteHeader variant='auth' />

				<PageMainTransition className='flex flex-1 items-center justify-center py-12 lg:py-16'>
					<div className='relative w-full max-w-sm'>
						<div className='absolute inset-0 -z-10 rounded-4xl bg-sky-400/10 blur-3xl' />
						<div className='rounded-4xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_30px_80px_rgba(2,6,23,0.5)] backdrop-blur sm:p-6'>
							<p className='inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200'>
								Sign-up complete
							</p>
							<h1 className='mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2rem]'>
								Check your email
							</h1>
							<p className='mt-3 text-sm leading-6 text-slate-300 sm:text-[0.95rem]'>
								Your account has been created. Open your inbox and confirm your
								email address before signing in.
							</p>

							<div className='mt-6 rounded-3xl border border-white/10 bg-white/3 p-4'>
								<p className='text-sm leading-6 text-slate-300'>
									Once you verify your email, you can head back to the login page
									and access your dashboard.
								</p>
							</div>

							<div className='mt-6 flex flex-col gap-3'>
								<Link
									href='/auth/login'
									className='inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-sky-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
								>
									Go to login
								</Link>
								<Link
									href='/'
									className='inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
								>
									Return home
								</Link>
							</div>
						</div>
					</div>
				</PageMainTransition>
			</div>
		</div>
	)
}
