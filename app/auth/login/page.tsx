import { Suspense } from 'react'

import { LoginForm } from '@/components/login-form'
import PageMainTransition from '@/components/page-main-transition'
import SiteHeader from '@/components/site-header'

import LoginVerifiedToast from './login-verified-toast'

export default function Page() {
	return (
		<div className='relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_42%,#04060d_100%)] text-white'>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
			/>

			<div className='mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-10 lg:px-12'>
				<SiteHeader variant='auth' />
				<Suspense fallback={null}>
					<LoginVerifiedToast />
				</Suspense>

				<PageMainTransition className='flex flex-1 items-center justify-center py-12 lg:py-16'>
					<LoginForm />
				</PageMainTransition>
			</div>
		</div>
	)
}
