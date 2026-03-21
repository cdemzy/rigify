'use client'

import { Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const triggerClassName =
	'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

export default function DashboardAccountMenuClient() {
	const router = useRouter()

	async function handleLogout() {
		const supabase = createClient()
		await supabase.auth.signOut()
		router.push('/auth/login')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={triggerClassName}>
				<Settings className='h-4 w-4' />
				<span className='sr-only'>Open account menu</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='w-72 rounded-3xl border border-white/10 bg-slate-950/95 p-2 text-white shadow-[0_24px_80px_rgba(2,6,23,0.5)] backdrop-blur'
			>
				{/* <DropdownMenuItem
					className='rounded-2xl px-4 py-3 text-sm font-medium text-white focus:bg-white/10 focus:text-white'
				>
					<Settings className='h-4 w-4 text-sky-300' />
					Account settings
				</DropdownMenuItem>

				<DropdownMenuSeparator className='my-2 bg-white/10' /> */}

				<DropdownMenuItem
					onSelect={(event) => {
						event.preventDefault()
						void handleLogout()
					}}
					className='rounded-2xl px-4 py-3 text-sm font-medium text-rose-200 focus:bg-rose-400/10 focus:text-rose-100'
				>
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
