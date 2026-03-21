import { Suspense } from 'react'

import { Settings } from 'lucide-react'

import DashboardAccountMenuClient from './dashboard-account-menu-client'

function DashboardAccountMenuFallback() {
	return (
		<div className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300'>
			<Settings className='h-4 w-4' />
		</div>
	)
}

function DashboardAccountMenuContent() {
	return <DashboardAccountMenuClient />
}

export default function DashboardAccountMenu() {
	return (
		<Suspense fallback={<DashboardAccountMenuFallback />}>
			<DashboardAccountMenuContent />
		</Suspense>
	)
}
