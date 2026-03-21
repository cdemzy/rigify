'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense, useId, useState } from 'react'

import PageMainTransition from '@/components/page-main-transition'
import LoginVerifiedToast from './login-verified-toast'
import { createClient } from '@/lib/supabase/client'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const baseActionClassName =
	'inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

function AuthHeader() {
	return (
		<header className='flex items-center justify-between gap-4 py-4'>
			<Link href='/' className='flex items-center gap-3'>
				<div className='flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold tracking-[0.25em] text-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.18)]'>
					RG
				</div>
				<div>
					<p className='text-sm font-medium uppercase tracking-[0.3em] text-slate-400'>
						Rigify
					</p>
				</div>
			</Link>

			<Link href='/' className={baseActionClassName}>
				Back to home
			</Link>
		</header>
	)
}

export default function Page() {
	const emailId = useId()
	const passwordId = useId()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const hasEmailValue = email.length > 0
	const isEmailValid = emailPattern.test(email)
	const showEmailError = hasEmailValue && !isEmailValid

	const inputBaseClassName =
		'mt-2 block w-full rounded-xl border px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500'

	const validInputClassName =
		'border-white/12 bg-white/3 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'

	const invalidInputClassName =
		'border-rose-400/45 bg-rose-400/8 focus:border-rose-300 focus:ring-2 focus:ring-rose-300/20'

	async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const supabase = createClient()
		setIsLoading(true)
		setError(null)

		try {
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email,
				password,
			})

			if (signInError) {
				throw signInError
			}

			router.push('/dashboard')
		} catch (loginError: unknown) {
			setError(
				loginError instanceof Error ? loginError.message : 'An error occurred',
			)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_42%,#04060d_100%)] text-white'>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
			/>

			<div className='mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-10 lg:px-12'>
				<AuthHeader />
				<Suspense fallback={null}>
					<LoginVerifiedToast />
				</Suspense>

				<PageMainTransition className='flex flex-1 items-center justify-center py-12 lg:py-16'>
					<div className='relative w-full max-w-sm'>
						<div className='absolute inset-0 -z-10 rounded-4xl bg-sky-400/10 blur-3xl' />
						<div className='rounded-4xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_30px_80px_rgba(2,6,23,0.5)] backdrop-blur sm:p-6'>
							<h1 className='text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2rem]'>
								Welcome back
							</h1>
							<p className='mt-2 text-sm text-slate-300 sm:text-[0.95rem]'>
								Log in to continue your build flow
							</p>
							<form onSubmit={handleLogin} className='mt-6 space-y-4.5'>
								<div>
									<label
										htmlFor={emailId}
										className='block text-sm font-medium text-slate-200'
									>
										Email
									</label>
									<input
										id={emailId}
										name='email'
										type='email'
										autoComplete='email'
										placeholder='you@example.com'
										value={email}
										onChange={(event) => setEmail(event.target.value)}
										className={`${inputBaseClassName} ${
											showEmailError ? invalidInputClassName : validInputClassName
										}`}
									/>
									{showEmailError ? (
										<p className='mt-2 text-sm font-medium text-rose-300'>
											Must be a valid email
										</p>
									) : null}
								</div>

								<div>
									<div className='flex items-center justify-between gap-4'>
										<label
											htmlFor={passwordId}
											className='block text-sm font-medium text-slate-200'
										>
											Password
										</label>
										<Link
											href='/auth/forgot-password'
											className='text-sm font-medium text-sky-300 transition hover:text-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
										>
											Forgot password?
										</Link>
									</div>

									<div className='relative'>
										<input
											id={passwordId}
											name='password'
											type={showPassword ? 'text' : 'password'}
											autoComplete='current-password'
											placeholder='Enter your password'
											value={password}
											onChange={(event) => setPassword(event.target.value)}
											className={`${inputBaseClassName} pr-12 ${validInputClassName}`}
										/>
										<button
											type='button'
											onClick={() =>
												setShowPassword((currentValue) => !currentValue)
											}
											aria-label={showPassword ? 'Hide password' : 'Show password'}
											className='absolute inset-y-2 right-2 inline-flex w-9 items-center justify-center rounded-lg border border-white/10 bg-white/4 text-slate-400 transition hover:bg-white/8 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
										>
											<svg
												aria-hidden='true'
												viewBox='0 0 24 24'
												className='h-4 w-4'
												fill='none'
												stroke='currentColor'
												strokeWidth='1.8'
												strokeLinecap='round'
												strokeLinejoin='round'
											>
												<path d='M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z' />
												<circle cx='12' cy='12' r='3' />
											</svg>
										</button>
									</div>
								</div>

								{error ? (
									<p className='text-sm font-medium text-rose-300'>{error}</p>
								) : null}

								<button
									type='submit'
									disabled={isLoading}
									className='inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-sky-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:bg-sky-300/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
								>
									{isLoading ? 'Logging in...' : 'Log in'}
								</button>

								<p className='pt-2 text-center text-sm text-slate-300'>
									New to Rigify?{' '}
									<Link
										href='/auth/signup'
										className='font-semibold text-sky-300 underline decoration-sky-300/30 underline-offset-4 transition hover:text-sky-200 hover:decoration-sky-200'
									>
										Create an account
									</Link>
								</p>
							</form>
						</div>
					</div>
				</PageMainTransition>
			</div>
		</div>
	)
}
