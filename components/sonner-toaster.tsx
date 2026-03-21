'use client'

import { Toaster } from 'sonner'

export default function SonnerToaster() {
	return (
		<Toaster
			position='top-center'
			richColors
			toastOptions={{
				classNames: {
					toast:
						'border border-white/10 bg-slate-950/90 text-slate-100 shadow-[0_18px_50px_rgba(2,6,23,0.55)] backdrop-blur',
					description: 'text-slate-300',
				},
			}}
		/>
	)
}
