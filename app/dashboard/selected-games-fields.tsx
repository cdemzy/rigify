'use client'

import { useState } from 'react'

const inputClassName =
	'mt-1.5 block w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'

export default function SelectedGamesFields() {
	const [gameInput, setGameInput] = useState('')
	const [games, setGames] = useState<string[]>([])

	function addGame() {
		const trimmedGame = gameInput.trim()

		if (!trimmedGame) {
			return
		}

		const hasGame = games.some(
			(game) => game.toLowerCase() === trimmedGame.toLowerCase(),
		)

		if (hasGame) {
			setGameInput('')
			return
		}

		setGames((currentGames) => [...currentGames, trimmedGame])
		setGameInput('')
	}

	function removeGame(gameToRemove: string) {
		setGames((currentGames) =>
			currentGames.filter((game) => game !== gameToRemove),
		)
	}

	return (
		<fieldset className='w-full rounded-3xl border border-white/10 bg-white/3 p-3.5 md:col-span-3'>
			<legend className='px-2 text-sm font-medium text-slate-200'>
				Selected games
			</legend>
			<div className='mt-2.5 flex flex-col gap-3'>
				<div className='flex flex-col gap-3 sm:flex-row'>
					<div className='flex-1'>
						<label
							htmlFor='games'
							className='block text-sm font-medium text-slate-200'
						>
							Add a game
						</label>
						<input
							id='games'
							name='games'
							type='text'
							placeholder='Type one game and press Add'
							value={gameInput}
							onChange={(event) => setGameInput(event.target.value)}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									event.preventDefault()
									addGame()
								}
							}}
							className={inputClassName}
						/>
					</div>

					<div className='sm:self-end'>
						<button
							type='button'
							onClick={addGame}
							className='inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-sky-300/30 bg-sky-400/10 px-5 text-sm font-semibold text-sky-100 transition hover:border-sky-200/60 hover:bg-sky-400/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:min-w-28'
						>
							Add
						</button>
					</div>
				</div>

				{games.length > 0 ? (
					<div className='flex flex-wrap gap-2'>
						{games.map((game) => (
							<button
								key={game}
								type='button'
								onClick={() => removeGame(game)}
								className='group inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-medium text-white transition hover:border-rose-300/30 hover:bg-rose-400/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
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
	)
}
