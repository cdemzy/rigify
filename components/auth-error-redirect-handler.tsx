'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

function getAuthErrorMessage(
	errorCode: string | null,
	errorDescription: string | null,
) {
	if (errorCode === 'otp_expired') {
		return 'This email link is invalid or has expired. Please request a new one.'
	}

	if (errorDescription) {
		return errorDescription
	}

	return 'We could not complete that email verification request.'
}

export default function AuthErrorRedirectHandler() {
	const hasHandledRef = useRef(false)
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const error = searchParams.get('error')
		const errorCode = searchParams.get('error_code')
		const errorDescription = searchParams.get('error_description')

		if (
			hasHandledRef.current ||
			pathname !== '/dashboard' ||
			error !== 'access_denied'
		) {
			return
		}

		hasHandledRef.current = true

		toast.error(getAuthErrorMessage(errorCode, errorDescription))
		router.replace('/')
	}, [pathname, router, searchParams])

	return null
}
