'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useId, useState } from 'react'

import { createClient } from '@/lib/supabase/client'

interface Requirement {
	id: string
	label: string
	test: (value: string) => boolean
	errorText: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const usernameRequirements: Requirement[] = [
	{
		id: 'length',
		label: '3 to 15 characters',
		test: (value) => value.length >= 3 && value.length <= 15,
		errorText: 'Username must be between 3 and 15 characters',
	},
	{
		id: 'start',
		label: 'Cannot start with a number',
		test: (value) => value.length === 0 || !/^\d/.test(value),
		errorText: 'Username cannot start with a number',
	},
	{
		id: 'characters',
		label: 'Only letters, numbers, underscores, and periods',
		test: (value) => /^[A-Za-z0-9._]+$/.test(value),
		errorText:
			'Username can only use letters, numbers, underscores, and periods',
	},
]

const passwordRequirements: Requirement[] = [
	{
		id: 'uppercase',
		label: 'Uppercase letter',
		test: (value) => /[A-Z]/.test(value),
		errorText: 'Password must contain at least 1 uppercase character',
	},
	{
		id: 'lowercase',
		label: 'Lowercase letter',
		test: (value) => /[a-z]/.test(value),
		errorText: 'Password must contain at least 1 lowercase character',
	},
	{
		id: 'number',
		label: 'Number',
		test: (value) => /\d/.test(value),
		errorText: 'Password must contain at least 1 number',
	},
	{
		id: 'special',
		label: 'Special character (e.g. !?<>@#$%)',
		test: (value) => /[^A-Za-z0-9]/.test(value),
		errorText: 'Password must contain at least 1 special character',
	},
	{
		id: 'length',
		label: '8 characters or more',
		test: (value) => value.length >= 8,
		errorText: 'Password must be at least 8 characters long',
	},
]

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

function getFirstUsernameError(username: string) {
	const unmetRequirement = usernameRequirements.find(
		(requirement) => !requirement.test(username),
	)

	return unmetRequirement?.errorText ?? ''
}

export function SignUpForm() {
	const usernameId = useId()
	const emailId = useId()
	const passwordId = useId()
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const hasUsernameValue = username.length > 0
	const usernameChecks = usernameRequirements.map((requirement) => ({
		...requirement,
		isMet: requirement.test(username),
	}))
	const isUsernameValid = usernameChecks.every((requirement) => requirement.isMet)
	const showUsernameError = hasUsernameValue && !isUsernameValid
	const usernameError = showUsernameError ? getFirstUsernameError(username) : ''

	const hasEmailValue = email.length > 0
	const isEmailValid = emailPattern.test(email)
	const showEmailError = hasEmailValue && !isEmailValid

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

	async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setError(null)

		if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
			setError('Please fix the highlighted fields before continuing')
			return
		}

		const supabase = createClient()
		setIsLoading(true)

		try {
			const { error: signUpError } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						username,
					},
					emailRedirectTo: `${window.location.origin}/protected`,
				},
			})

			if (signUpError) {
				throw signUpError
			}

			router.push('/auth/sign-up-success')
		} catch (signUpError: unknown) {
			setError(
				signUpError instanceof Error ? signUpError.message : 'An error occurred',
			)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='relative w-full max-w-sm'>
			<div className='absolute inset-0 -z-10 rounded-4xl bg-sky-400/10 blur-3xl' />
			<div className='rounded-4xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_30px_80px_rgba(2,6,23,0.5)] backdrop-blur sm:p-6'>
				<h1 className='text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2rem]'>
					Get started
				</h1>
				<p className='mt-2 text-sm text-slate-300 sm:text-[0.95rem]'>Create a new account</p>
				<form onSubmit={handleSignUp} className='mt-6 space-y-4.5'>
					<div>
						<label
							htmlFor={usernameId}
							className='block text-sm font-medium text-slate-200'
						>
							Username
						</label>
						<input
							id={usernameId}
							name='username'
							type='text'
							autoComplete='username'
							placeholder='rigify_user'
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							maxLength={15}
							className={`${inputBaseClassName} ${
								showUsernameError ? invalidInputClassName : validInputClassName
							}`}
						/>
						{showUsernameError ? (
							<p className='mt-2 text-sm font-medium text-rose-300'>
								{usernameError}
							</p>
						) : null}

						{hasUsernameValue ? (
							<ul className='mt-3 space-y-1.5' aria-live='polite'>
								{usernameChecks.map((requirement) => (
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
						<label
							htmlFor={passwordId}
							className='block text-sm font-medium text-slate-200'
						>
							Password
						</label>
						<div className='relative'>
							<input
								id={passwordId}
								name='password'
								type={showPassword ? 'text' : 'password'}
								autoComplete='new-password'
								placeholder='Create a password'
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								className={`${inputBaseClassName} pr-12 ${
									showPasswordError ? invalidInputClassName : validInputClassName
								}`}
							/>
							<button
								type='button'
								onClick={() => setShowPassword((currentValue) => !currentValue)}
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
						{isLoading ? 'Creating account...' : 'Sign up'}
					</button>

					<p className='pt-2 text-center text-sm text-slate-300'>
						Have an account?{' '}
						<Link
							href='/auth/login'
							className='font-semibold text-sky-300 underline decoration-sky-300/30 underline-offset-4 transition hover:text-sky-200 hover:decoration-sky-200'
						>
							Sign in
						</Link>
					</p>
				</form>
			</div>
		</div>
	)
}
