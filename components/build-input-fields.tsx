'use client'

import { useState } from 'react'

import { BuildFormValues, MAX_BUILD_GAMES } from '@/lib/builds'

const ramCapacityOptions = [
	'8GB',
	'16GB',
	'24GB',
	'32GB',
	'48GB',
	'64GB',
	'96GB',
	'128GB',
] as const

const ramGenerationOptions = ['DDR3', 'DDR4', 'DDR5'] as const

const baseInputClassName =
	'mt-1.5 block w-full rounded-2xl border px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:ring-2'

const validInputClassName =
	'border-white/10 bg-white/4 focus:border-sky-300 focus:ring-sky-300/30'

const invalidInputClassName =
	'border-rose-400/45 bg-rose-400/10 focus:border-rose-300 focus:ring-rose-300/25'

interface BuildInputFieldsProps {
	values: BuildFormValues
	fieldErrors: Partial<Record<keyof BuildFormValues, string>>
	isDisabled?: boolean
	onChange: (nextValues: BuildFormValues) => void
}

function getInputClassName(hasError: boolean) {
	return `${baseInputClassName} ${
		hasError ? invalidInputClassName : validInputClassName
	}`
}

function FieldError({ message }: { message?: string }) {
	if (!message) {
		return null
	}

	return <p className='mt-2 text-sm font-medium text-rose-300'>{message}</p>
}

export default function BuildInputFields({
	values,
	fieldErrors,
	isDisabled = false,
	onChange,
}: BuildInputFieldsProps) {
	const [gameInput, setGameInput] = useState('')

	function updateField<K extends keyof BuildFormValues>(
		field: K,
		value: BuildFormValues[K],
	) {
		onChange({
			...values,
			[field]: value,
		})
	}

	function addGame() {
		const trimmedGame = gameInput.trim()

		if (!trimmedGame || values.games.length >= MAX_BUILD_GAMES) {
			return
		}

		const hasGame = values.games.some(
			(game) => game.toLowerCase() === trimmedGame.toLowerCase(),
		)

		if (hasGame) {
			setGameInput('')
			return
		}

		updateField('games', [...values.games, trimmedGame])
		setGameInput('')
	}

	function removeGame(gameToRemove: string) {
		updateField(
			'games',
			values.games.filter((game) => game !== gameToRemove),
		)
	}

	return (
		<div className='grid gap-4 lg:grid-cols-2'>
			<div className='w-full'>
				<label htmlFor='cpu' className='block text-sm font-medium text-slate-200'>
					CPU
				</label>
				<input
					id='cpu'
					name='cpu'
					type='text'
					placeholder='Ryzen 7 9700X'
					value={values.cpu}
					disabled={isDisabled}
					onChange={(event) => updateField('cpu', event.target.value)}
					className={getInputClassName(Boolean(fieldErrors.cpu))}
				/>
				<FieldError message={fieldErrors.cpu} />
			</div>

			<div className='w-full'>
				<label htmlFor='gpu' className='block text-sm font-medium text-slate-200'>
					GPU
				</label>
				<input
					id='gpu'
					name='gpu'
					type='text'
					placeholder='RTX 5070'
					value={values.gpu}
					disabled={isDisabled}
					onChange={(event) => updateField('gpu', event.target.value)}
					className={getInputClassName(Boolean(fieldErrors.gpu))}
				/>
				<FieldError message={fieldErrors.gpu} />
			</div>

			<fieldset className='w-full rounded-3xl border border-white/10 bg-white/3 p-3.5'>
				<legend className='px-2 text-sm font-medium text-slate-200'>RAM</legend>
				<div className='mt-2.5 grid gap-3 sm:grid-cols-2'>
					<div>
						<label
							htmlFor='ram-capacity'
							className='block text-sm font-medium text-slate-200'
						>
							Capacity
						</label>
						<select
							id='ram-capacity'
							name='ram-capacity'
							value={values.ramCapacity}
							disabled={isDisabled}
							onChange={(event) =>
								updateField('ramCapacity', event.target.value)
							}
							className={getInputClassName(Boolean(fieldErrors.ramCapacity))}
						>
							<option value='' disabled className='bg-slate-950 text-slate-500'>
								Select capacity
							</option>
							{ramCapacityOptions.map((option) => (
								<option key={option} value={option} className='bg-slate-950'>
									{option}
								</option>
							))}
						</select>
						<FieldError message={fieldErrors.ramCapacity} />
					</div>

					<div>
						<label
							htmlFor='ram-generation'
							className='block text-sm font-medium text-slate-200'
						>
							Generation
						</label>
						<select
							id='ram-generation'
							name='ram-generation'
							value={values.ramGeneration}
							disabled={isDisabled}
							onChange={(event) =>
								updateField('ramGeneration', event.target.value)
							}
							className={getInputClassName(Boolean(fieldErrors.ramGeneration))}
						>
							<option value='' disabled className='bg-slate-950 text-slate-500'>
								Select generation
							</option>
							{ramGenerationOptions.map((option) => (
								<option key={option} value={option} className='bg-slate-950'>
									{option}
								</option>
							))}
						</select>
						<FieldError message={fieldErrors.ramGeneration} />
					</div>
				</div>
			</fieldset>

			<fieldset className='w-full rounded-3xl border border-white/10 bg-white/3 p-3.5'>
				<legend className='px-2 text-sm font-medium text-slate-200'>Display</legend>
				<div className='mt-2.5 grid gap-3 sm:grid-cols-2'>
					<div>
						<label
							htmlFor='resolution'
							className='block text-sm font-medium text-slate-200'
						>
							Resolution
						</label>
						<input
							id='resolution'
							name='resolution'
							type='text'
							placeholder='1440p'
							value={values.resolution}
							disabled={isDisabled}
							onChange={(event) => updateField('resolution', event.target.value)}
							className={getInputClassName(Boolean(fieldErrors.resolution))}
						/>
						<FieldError message={fieldErrors.resolution} />
					</div>

					<div>
						<label
							htmlFor='refresh-rate'
							className='block text-sm font-medium text-slate-200'
						>
							Refresh rate
						</label>
						<input
							id='refresh-rate'
							name='refresh-rate'
							type='text'
							placeholder='165Hz'
							value={values.refreshRate}
							disabled={isDisabled}
							onChange={(event) =>
								updateField('refreshRate', event.target.value)
							}
							className={getInputClassName(Boolean(fieldErrors.refreshRate))}
						/>
						<FieldError message={fieldErrors.refreshRate} />
					</div>
				</div>
			</fieldset>

			<fieldset className='w-full rounded-3xl border border-white/10 bg-white/3 p-3.5 lg:col-span-2'>
				<legend className='px-2 text-sm font-medium text-slate-200'>
					Selected games
				</legend>
				<div className='mt-2.5 flex flex-col gap-3'>
					<div className='flex flex-col gap-3 sm:flex-row'>
						<div className='flex-1'>
							<label
								htmlFor='build-games'
								className='block text-sm font-medium text-slate-200'
							>
								Add a game
							</label>
							<input
								id='build-games'
								name='build-games'
								type='text'
								placeholder='Type one game and press Add'
								value={gameInput}
								disabled={isDisabled || values.games.length >= MAX_BUILD_GAMES}
								onChange={(event) => setGameInput(event.target.value)}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										event.preventDefault()
										addGame()
									}
								}}
								className={getInputClassName(Boolean(fieldErrors.games))}
							/>
						</div>

						<div className='sm:self-end'>
							<button
								type='button'
								disabled={isDisabled || values.games.length >= MAX_BUILD_GAMES}
								onClick={addGame}
								className='inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-sky-300/30 bg-sky-400/10 px-5 text-sm font-semibold text-sky-100 transition hover:border-sky-200/60 hover:bg-sky-400/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-28'
							>
								Add
							</button>
						</div>
					</div>

					<div className='flex items-center justify-between gap-4'>
						<p className='text-sm text-slate-400'>
							Add up to {MAX_BUILD_GAMES} games. We'll pad the rest in the AI
							analysis when needed.
						</p>
						<p className='text-xs font-medium uppercase tracking-[0.2em] text-slate-500'>
							{values.games.length}/{MAX_BUILD_GAMES}
						</p>
					</div>

					<FieldError message={fieldErrors.games} />

					{values.games.length > 0 ? (
						<div className='flex flex-wrap gap-2'>
							{values.games.map((game) => (
								<button
									key={game}
									type='button'
									disabled={isDisabled}
									onClick={() => removeGame(game)}
									className='group inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-medium text-white transition hover:border-rose-300/30 hover:bg-rose-400/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:opacity-50'
								>
									<span>{game}</span>
									<span className='text-slate-500 transition group-hover:text-rose-200'>
										x
									</span>
								</button>
							))}
						</div>
					) : (
						<p className='text-sm text-slate-400'>
							Added games will appear here as removable tags.
						</p>
					)}
				</div>
			</fieldset>
		</div>
	)
}
