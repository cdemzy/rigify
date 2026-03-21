import { Suspense } from 'react'

import { createClient } from '@/lib/supabase/server'

import DashboardAccountMenuClient from './dashboard-account-menu-client'

function DashboardAccountMenuFallback() {
	return (
		<div className='inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-slate-300'>
			Account
		</div>
	)
}

async function DashboardAccountMenuContent() {
	const supabase = await createClient()
	const { data } = await supabase.auth.getClaims()
	const email = data?.claims?.email ?? 'Account'

	return <DashboardAccountMenuClient email={email} />
}

export default function DashboardAccountMenu() {
	return (
		<Suspense fallback={<DashboardAccountMenuFallback />}>
			<DashboardAccountMenuContent />
		</Suspense>
	)
}
