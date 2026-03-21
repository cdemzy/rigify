'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { getSafeAuthErrorMessage } from '@/lib/security'

export default function AuthErrorRedirectHandler() {
	const hasHandledRef = useRef(false)
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const error = searchParams.get('error')
		const errorCode = searchParams.get('error_code')

		if (
			hasHandledRef.current ||
			pathname !== '/dashboard' ||
			error !== 'access_denied'
		) {
			return
		}

		hasHandledRef.current = true

		toast.error(getSafeAuthErrorMessage(errorCode))
		router.replace('/')
	}, [pathname, router, searchParams])

	return null
}
