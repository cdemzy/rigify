'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function RecentBuildsScrollTarget() {
	const searchParams = useSearchParams()

	useEffect(() => {
		if (searchParams.get('section') !== 'recent-builds') {
			return
		}

		const recentBuildsSection = document.getElementById('recent-builds')

		if (!recentBuildsSection) {
			return
		}

		requestAnimationFrame(() => {
			recentBuildsSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		})
	}, [searchParams])

	return null
}
