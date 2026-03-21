'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useId, useState } from 'react'
import { toast } from 'sonner'

import PageMainTransition from '@/components/page-main-transition'
import { isValidEmail, MAX_EMAIL_LENGTH, normalizeEmail } from '@/lib/security'
import { createClient } from '@/lib/supabase/client'

const baseActionClassName =
	'inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

function AuthHeader() {
	return (
		<header className='flex items-center justify-between gap-4 py-4'>
			<Link href='/' className='flex items-center gap-3'>
				<div className='flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(56,189,248,0.18)]'>
					<Image
						src='/RG_Logo.png'
						alt='Rigify logo'
						width={44}
						height={44}
						loading='eager'
						className='h-full w-full object-contain'
					/>
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
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const hasEmailValue = email.length > 0
	const isEmailValid = isValidEmail(email)
	const showEmailError = hasEmailValue && !isEmailValid

	const inputBaseClassName =
		'mt-2 block w-full rounded-xl border px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500'

	const validInputClassName =
		'border-white/12 bg-white/3 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'

	const invalidInputClassName =
		'border-rose-400/45 bg-rose-400/8 focus:border-rose-300 focus:ring-2 focus:ring-rose-300/20'

	async function handleForgotPassword(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const normalizedEmail = normalizeEmail(email)

		if (!isValidEmail(normalizedEmail)) {
			toast.error('Please enter a valid email before continuing')
			return
		}

		const supabase = createClient()
		setIsLoading(true)

		try {
			const { error: resetError } = await supabase.auth.resetPasswordForEmail(
				normalizedEmail,
				{
					redirectTo: `${window.location.origin}/auth/update-password`,
				},
			)

			if (resetError) {
				throw resetError
			}

			toast.success('Password reset email sent. Check your inbox.')
			setEmail('')
		} catch (forgotPasswordError: unknown) {
			toast.error(
				forgotPasswordError instanceof Error
					? forgotPasswordError.message
					: 'An error occurred',
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

			<div className='mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 pb-10 pt-4 sm:px-10 lg:px-12'>
				<AuthHeader />

				<PageMainTransition className='flex flex-1 items-center justify-center py-12 lg:py-16'>
					<div className='relative w-full max-w-sm'>
						<div className='absolute inset-0 -z-10 rounded-4xl bg-sky-400/10 blur-3xl' />
						<div className='rounded-4xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_30px_80px_rgba(2,6,23,0.5)] backdrop-blur sm:p-6'>
							<h1 className='text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2rem]'>
								Forgot password
							</h1>
							<p className='mt-2 text-sm text-slate-300 sm:text-[0.95rem]'>
								Enter your email and we&apos;ll send you a password reset link.
							</p>
							<form onSubmit={handleForgotPassword} className='mt-6 space-y-4.5'>
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
										maxLength={MAX_EMAIL_LENGTH}
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

								<button
									type='submit'
									disabled={isLoading}
									className='inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-sky-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:bg-sky-300/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
								>
									{isLoading ? 'Sending...' : 'Send reset email'}
								</button>

								<p className='pt-2 text-center text-sm text-slate-300'>
									Remembered it?{' '}
									<Link
										href='/auth/login'
										className='font-semibold text-sky-300 underline decoration-sky-300/30 underline-offset-4 transition hover:text-sky-200 hover:decoration-sky-200'
									>
										Back to login
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
