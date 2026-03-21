'use client'

import { useState } from 'react'

import { VscSparkleFilled } from 'react-icons/vsc'

import SelectedGamesFields from './selected-games-fields'
import StorageFields from './storage-fields'

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

const requiredInputClassName =
	'mt-1.5 block w-full rounded-2xl border px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:ring-2'

const validInputClassName =
	'border-white/10 bg-white/4 focus:border-sky-300 focus:ring-sky-300/30'

const invalidInputClassName =
	'border-rose-400/45 bg-rose-400/10 focus:border-rose-300 focus:ring-rose-300/20'

export default function DashboardBuildForm() {
	const [cpu, setCpu] = useState('')
	const [gpu, setGpu] = useState('')
	const [ramCapacity, setRamCapacity] = useState('')
	const [ramGeneration, setRamGeneration] = useState('')
	const [monitorResolution, setMonitorResolution] = useState('')
	const [monitorRefreshRate, setMonitorRefreshRate] = useState('')
	const [hasSubmitted, setHasSubmitted] = useState(false)

	const isCpuMissing = hasSubmitted && !cpu.trim()
	const isGpuMissing = hasSubmitted && !gpu.trim()
	const isRamCapacityMissing = hasSubmitted && !ramCapacity.trim()
	const isRamGenerationMissing = hasSubmitted && !ramGeneration.trim()
	const isMonitorResolutionMissing = hasSubmitted && !monitorResolution.trim()
	const isMonitorRefreshRateMissing = hasSubmitted && !monitorRefreshRate.trim()

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setHasSubmitted(true)

		if (
			!cpu.trim() ||
			!gpu.trim() ||
			!ramCapacity.trim() ||
			!ramGeneration.trim() ||
			!monitorResolution.trim() ||
			!monitorRefreshRate.trim()
		) {
			return
		}
	}

	return (
		<form onSubmit={handleSubmit} className='mt-5 space-y-4' noValidate>
			<div className='grid gap-4 md:grid-cols-3'>
				<div className='w-full'>
					<label htmlFor='cpu' className='block text-sm font-medium text-slate-200'>
						CPU
					</label>
					<input
						id='cpu'
						name='cpu'
						type='text'
						placeholder='Ryzen 7 9700X'
						value={cpu}
						onChange={(event) => setCpu(event.target.value)}
						className={`${requiredInputClassName} ${
							isCpuMissing ? invalidInputClassName : validInputClassName
						}`}
					/>
					{isCpuMissing ? (
						<p className='mt-2 text-sm font-medium text-rose-300'>
							CPU is required
						</p>
					) : null}
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
						value={gpu}
						onChange={(event) => setGpu(event.target.value)}
						className={`${requiredInputClassName} ${
							isGpuMissing ? invalidInputClassName : validInputClassName
						}`}
					/>
					{isGpuMissing ? (
						<p className='mt-2 text-sm font-medium text-rose-300'>
							GPU is required
						</p>
					) : null}
				</div>

				<div className='w-full'>
					<label htmlFor='psu' className='block text-sm font-medium text-slate-200'>
						PSU (Optional)
					</label>
					<input
						id='psu'
						name='psu'
						type='text'
						placeholder='850W 80+ Gold'
						className='mt-1.5 block w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
					/>
				</div>

				<fieldset className='w-full rounded-3xl border border-white/10 bg-white/3 p-3.5 md:col-span-2'>
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
								name='ramCapacity'
								value={ramCapacity}
								onChange={(event) => setRamCapacity(event.target.value)}
								className={`${requiredInputClassName} ${
									isRamCapacityMissing
										? invalidInputClassName
										: validInputClassName
								}`}
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
							{isRamCapacityMissing ? (
								<p className='mt-2 text-sm font-medium text-rose-300'>
									RAM capacity is required
								</p>
							) : null}
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
								name='ramGeneration'
								value={ramGeneration}
								onChange={(event) => setRamGeneration(event.target.value)}
								className={`${requiredInputClassName} ${
									isRamGenerationMissing
										? invalidInputClassName
										: validInputClassName
								}`}
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
							{isRamGenerationMissing ? (
								<p className='mt-2 text-sm font-medium text-rose-300'>
									RAM generation is required
								</p>
							) : null}
						</div>
					</div>
				</fieldset>

				<fieldset className='w-full rounded-3xl border border-white/10 bg-white/3 p-3.5 md:col-span-1'>
					<legend className='px-2 text-sm font-medium text-slate-200'>Display</legend>
					<div className='mt-2.5 grid gap-3 sm:grid-cols-2'>
						<div>
							<label
								htmlFor='monitor-resolution'
								className='block text-sm font-medium text-slate-200'
							>
								Resolution
							</label>
							<input
								id='monitor-resolution'
								name='monitorResolution'
								type='text'
								placeholder='1440p'
								value={monitorResolution}
								onChange={(event) => setMonitorResolution(event.target.value)}
								className={`${requiredInputClassName} ${
									isMonitorResolutionMissing
										? invalidInputClassName
										: validInputClassName
								}`}
							/>
							{isMonitorResolutionMissing ? (
								<p className='mt-2 text-sm font-medium text-rose-300'>
									Resolution is required
								</p>
							) : null}
						</div>
						<div>
							<label
								htmlFor='monitor-refresh-rate'
								className='block text-sm font-medium text-slate-200'
							>
								Refresh rate
							</label>
							<input
								id='monitor-refresh-rate'
								name='monitorRefreshRate'
								type='text'
								placeholder='165Hz'
								value={monitorRefreshRate}
								onChange={(event) => setMonitorRefreshRate(event.target.value)}
								className={`${requiredInputClassName} ${
									isMonitorRefreshRateMissing
										? invalidInputClassName
										: validInputClassName
								}`}
							/>
							{isMonitorRefreshRateMissing ? (
								<p className='mt-2 text-sm font-medium text-rose-300'>
									Refresh rate is required
								</p>
							) : null}
						</div>
					</div>
				</fieldset>

				<StorageFields />

				<SelectedGamesFields />
			</div>

			<button
				type='submit'
				className='cta-glow inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full border border-sky-300/40 bg-slate-950 px-6  font-semibold text-white shadow-[0_18px_60px_rgba(14,165,233,0.28)] transition hover:border-sky-200/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
			>
				<VscSparkleFilled className='h-3 w-3 text-white' />
				<span>Calculate</span>
			</button>
		</form>
	)
}
