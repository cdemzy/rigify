'use client'

import { useState } from 'react'

const storageOptions = ['HDD', 'SSD', 'M.2'] as const
const storageSizeOptions = [
	'250GB',
	'500GB',
	'1000GB',
	'2000GB',
	'4000GB',
	'8000GB',
] as const
const m2GenerationOptions = [
	'Gen 1',
	'Gen 2',
	'Gen 3',
	'Gen 4',
	'Gen 5',
	'Gen 6',
] as const

export default function StorageFields() {
	const [storageType, setStorageType] = useState('')
	const [storageGeneration, setStorageGeneration] = useState('')

	const isM2 = storageType === 'M.2'

	return (
		<fieldset className='w-full rounded-3xl border border-white/10 bg-white/3 p-3.5 md:col-span-3'>
			<legend className='px-2 text-sm font-medium text-slate-200'>Storage</legend>
			<div className='mt-2.5 grid gap-3 md:grid-cols-3'>
				<div>
					<label
						htmlFor='storage-type'
						className='block text-sm font-medium text-slate-200'
					>
						Type
					</label>
					<select
						id='storage-type'
						name='storageType'
						value={storageType}
						onChange={(event) =>
							setStorageType(event.target.value)
						}
						className='mt-1.5 block w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
					>
						<option value='' disabled>
							Select a type
						</option>
						{storageOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>

				<div>
					<label
						htmlFor='storage-size'
						className='block text-sm font-medium text-slate-200'
					>
						Size
					</label>
					<select
						id='storage-size'
						name='storageSize'
						defaultValue=''
						className='mt-1.5 block w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
					>
						<option value='' disabled>
							Select a size
						</option>
						{storageSizeOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>

				<div>
					<label
						htmlFor='storage-gen'
						className='block text-sm font-medium text-slate-200'
					>
						Gen version
					</label>
					<select
						id='storage-gen'
						name='storageGen'
						value={isM2 ? storageGeneration : 'N/A'}
						onChange={(event) => setStorageGeneration(event.target.value)}
						disabled={!isM2}
						className='mt-1.5 block w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30 disabled:cursor-not-allowed disabled:opacity-60'
					>
						{isM2 ? (
							<option value='' disabled>
								Select a gen
							</option>
						) : (
							<option value='N/A'>N/A</option>
						)}
						{m2GenerationOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
			</div>
		</fieldset>
	)
}
