'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export default function LoginVerifiedToast() {
	const hasShownToastRef = useRef(false)
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		if (hasShownToastRef.current || searchParams.get('verified') !== '1') {
			return
		}

		hasShownToastRef.current = true

		toast.success('Email verified. You can log in now.')

		const nextParams = new URLSearchParams(searchParams.toString())
		nextParams.delete('verified')

		const nextQuery = nextParams.toString()
		const nextUrl = nextQuery.length > 0 ? `${pathname}?${nextQuery}` : pathname

		window.history.replaceState(null, '', nextUrl)
	}, [pathname, searchParams])

	return null
}
