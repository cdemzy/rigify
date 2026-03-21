import Link from 'next/link'

import SmoothScrollLink from './smooth-scroll-link'

type SiteHeaderVariant = 'marketing' | 'auth' | 'dashboard'

interface SiteHeaderProps {
	variant: SiteHeaderVariant
}

const baseActionClassName =
	'inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

function BrandMark() {
	return (
		<Link href='/' className='flex items-center gap-3'>
			<div className='flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold tracking-[0.25em] text-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.18)]'>
				RG
			</div>
			<div>
				<p className='text-sm font-medium uppercase tracking-[0.3em] text-slate-400'>
					Rigify
				</p>
				<p className='text-sm text-slate-500'>PC build intelligence</p>
			</div>
		</Link>
	)
}

function MarketingNavigation() {
	return (
		<nav aria-label='Primary' className='hidden items-center gap-8 md:flex'>
			<SmoothScrollLink
				href='#how-it-works'
				className='text-sm text-slate-300 transition hover:text-white'
			>
				How it works
			</SmoothScrollLink>
			<SmoothScrollLink
				href='#features'
				className='text-sm text-slate-300 transition hover:text-white'
			>
				Features
			</SmoothScrollLink>
			<SmoothScrollLink
				href='#trust'
				className='text-sm text-slate-300 transition hover:text-white'
			>
				Why Rigify
			</SmoothScrollLink>
		</nav>
	)
}

function HeaderAction({ variant }: SiteHeaderProps) {
	if (variant === 'marketing') {
		return (
			<div className='flex items-center gap-3 sm:gap-4'>
				<MarketingNavigation />
				<Link href='/auth/login' className={baseActionClassName}>
					Login
				</Link>
			</div>
		)
	}

	if (variant === 'auth') {
		return (
			<Link href='/' className={baseActionClassName}>
				Back to home
			</Link>
		)
	}

	return (
		<Link href='/auth/login' className={baseActionClassName}>
			Account
		</Link>
	)
}

export default function SiteHeader({ variant }: SiteHeaderProps) {
	return (
		<header className='flex items-center justify-between gap-4 py-4'>
			<BrandMark />
			<HeaderAction variant={variant} />
		</header>
	)
}
