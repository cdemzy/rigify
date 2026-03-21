'use client'

import { useRouter } from 'next/navigation'

export default function RecentBuildsButton() {
	const router = useRouter()

	function handleClick() {
		router.push('/dashboard?section=recent-builds')
	}

	return (
		<button
			type='button'
			onClick={handleClick}
			className='inline-flex min-h-10 w-full items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:w-auto md:self-auto'
		>
			Recent Builds
		</button>
	)
}
