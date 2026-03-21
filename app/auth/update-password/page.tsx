'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useId, useState } from 'react'

import PageMainTransition from '@/components/page-main-transition'
import { isValidPasswordLength, MAX_PASSWORD_LENGTH } from '@/lib/security'
import { createClient } from '@/lib/supabase/client'

const passwordRequirements = [
	{
		id: 'uppercase',
		label: 'Uppercase letter',
		test: (value: string) => /[A-Z]/.test(value),
		errorText: 'Password must contain at least 1 uppercase character',
	},
	{
		id: 'lowercase',
		label: 'Lowercase letter',
		test: (value: string) => /[a-z]/.test(value),
		errorText: 'Password must contain at least 1 lowercase character',
	},
	{
		id: 'number',
		label: 'Number',
		test: (value: string) => /\d/.test(value),
		errorText: 'Password must contain at least 1 number',
	},
	{
		id: 'special',
		label: 'Special character (e.g. !?<>@#$%)',
		test: (value: string) => /[^A-Za-z0-9]/.test(value),
		errorText: 'Password must contain at least 1 special character',
	},
	{
		id: 'length',
		label: '8 characters or more',
		test: (value: string) => value.length >= 8,
		errorText: 'Password must be at least 8 characters long',
	},
]

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

function RequirementIcon({ isMet }: { isMet: boolean }) {
	if (isMet) {
		return (
			<span className='flex h-4 w-4 items-center justify-center rounded-full border border-slate-300/70 bg-slate-200 text-slate-950'>
				<svg
					aria-hidden='true'
					viewBox='0 0 16 16'
					className='h-2.5 w-2.5'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path d='M3.5 8.5 6.5 11.5 12.5 5.5' />
				</svg>
			</span>
		)
	}

	return (
		<span
			aria-hidden='true'
			className='h-4 w-4 rounded-full border border-slate-400/70'
		/>
	)
}

function getFirstPasswordError(password: string) {
	const unmetRequirement = passwordRequirements.find(
		(requirement) => !requirement.test(password),
	)

	return unmetRequirement?.errorText ?? ''
}

export default function Page() {
	const passwordId = useId()
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const hasPasswordValue = password.length > 0
	const passwordChecks = passwordRequirements.map((requirement) => ({
		...requirement,
		isMet: requirement.test(password),
	}))
	const isPasswordValid = passwordChecks.every((requirement) => requirement.isMet)
	const showPasswordError = hasPasswordValue && !isPasswordValid
	const passwordError = showPasswordError ? getFirstPasswordError(password) : ''

	const inputBaseClassName =
		'mt-2 block w-full rounded-xl border px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500'

	const validInputClassName =
		'border-white/12 bg-white/3 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'

	const invalidInputClassName =
		'border-rose-400/45 bg-rose-400/8 focus:border-rose-300 focus:ring-2 focus:ring-rose-300/20'

	async function handleUpdatePassword(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setError(null)

		if (!isValidPasswordLength(password) || !isPasswordValid) {
			setError('Please create a password that meets all requirements')
			return
		}

		const supabase = createClient()
		setIsLoading(true)

		try {
			const { error: updateError } = await supabase.auth.updateUser({ password })

			if (updateError) {
				throw updateError
			}

			router.push('/dashboard')
		} catch (updatePasswordError: unknown) {
			setError(
				updatePasswordError instanceof Error
					? updatePasswordError.message
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
								Update password
							</h1>
							<p className='mt-2 text-sm text-slate-300 sm:text-[0.95rem]'>
								Choose a new password for your Rigify account.
							</p>
							<form onSubmit={handleUpdatePassword} className='mt-6 space-y-4.5'>
								<div>
									<label
										htmlFor={passwordId}
										className='block text-sm font-medium text-slate-200'
									>
										New password
									</label>
									<div className='relative'>
										<input
											id={passwordId}
											name='password'
											type={showPassword ? 'text' : 'password'}
											autoComplete='new-password'
											placeholder='Create a new password'
											value={password}
											onChange={(event) => setPassword(event.target.value)}
											maxLength={MAX_PASSWORD_LENGTH}
											className={`${inputBaseClassName} pr-12 ${
												showPasswordError
													? invalidInputClassName
													: validInputClassName
											}`}
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
									{showPasswordError ? (
										<p className='mt-2 text-sm font-medium text-rose-300'>
											{passwordError}
										</p>
									) : null}

									{hasPasswordValue ? (
										<ul className='mt-3 space-y-1.5' aria-live='polite'>
											{passwordChecks.map((requirement) => (
												<li
													key={requirement.id}
													className={`flex items-center gap-3 text-sm ${
														requirement.isMet ? 'text-slate-100' : 'text-slate-400'
													}`}
												>
													<RequirementIcon isMet={requirement.isMet} />
													<span>{requirement.label}</span>
												</li>
											))}
										</ul>
									) : null}
								</div>

								{error ? (
									<p className='text-sm font-medium text-rose-300'>{error}</p>
								) : null}

								<button
									type='submit'
									disabled={isLoading}
									className='inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-sky-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:bg-sky-300/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
								>
									{isLoading ? 'Saving...' : 'Save new password'}
								</button>

								<p className='pt-2 text-center text-sm text-slate-300'>
									Need to start over?{' '}
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
