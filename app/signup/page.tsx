import PageMainTransition from '../components/page-main-transition'
import SignupForm from '../components/signup-form'
import SiteHeader from '../components/site-header'

export default function SignupPage() {
	return (
		<div className='relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_42%,#04060d_100%)] text-white'>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
			/>

			<div className='mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 sm:px-10 lg:px-12'>
				<SiteHeader variant='auth' />

				<PageMainTransition className='flex flex-1 items-center justify-center py-12 lg:py-16'>
					<div className='relative w-full max-w-md'>
						<div className='absolute inset-0 -z-10 rounded-4xl bg-sky-400/10 blur-3xl' />
						<div className='rounded-4xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.5)] backdrop-blur sm:p-8'>
							<h1 className='text-4xl font-semibold tracking-[-0.04em] text-white'>
								Get started
							</h1>
							<p className='mt-2 text-base text-slate-300'>Create a new account</p>
							<SignupForm />
						</div>
					</div>
				</PageMainTransition>
			</div>
		</div>
	)
}
