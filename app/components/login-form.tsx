'use client'

import Link from 'next/link'
import { useId, useState } from 'react'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginForm() {
	const emailId = useId()
	const passwordId = useId()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const hasEmailValue = email.length > 0
	const isEmailValid = emailPattern.test(email)
	const showEmailError = hasEmailValue && !isEmailValid

	const inputBaseClassName =
		'mt-2 block w-full rounded-xl border px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-500'

	const validInputClassName =
		'border-white/12 bg-white/3 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'

	const invalidInputClassName =
		'border-rose-400/45 bg-rose-400/8 focus:border-rose-300 focus:ring-2 focus:ring-rose-300/20'

	return (
		<form className='mt-8 space-y-5'>
			<div>
				<label htmlFor={emailId} className='block text-sm font-medium text-slate-200'>
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
					<p className='mt-2 text-sm font-medium text-rose-300'>Must be a valid email</p>
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
						href='/forgot-password'
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
						onClick={() => setShowPassword((currentValue) => !currentValue)}
						aria-label={showPassword ? 'Hide password' : 'Show password'}
						className='absolute inset-y-2 right-2 inline-flex w-10 items-center justify-center rounded-lg border border-white/10 bg-white/4 text-slate-400 transition hover:bg-white/8 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
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

			<button
				type='submit'
				className='inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-sky-400 px-6 text-base font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
			>
				Log in
			</button>

			<p className='pt-2 text-center text-sm text-slate-300'>
				New to Rigify?{' '}
				<Link
					href='/signup'
					className='font-semibold text-sky-300 underline decoration-sky-300/30 underline-offset-4 transition hover:text-sky-200 hover:decoration-sky-200'
				>
					Create an account
				</Link>
			</p>
		</form>
	)
}
