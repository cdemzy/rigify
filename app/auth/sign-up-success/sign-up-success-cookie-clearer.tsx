'use client'

import { useEffect } from 'react'

export default function SignUpSuccessCookieClearer() {
	useEffect(() => {
		void fetch('/auth/sign-up-success/clear', {
			method: 'POST',
		})
	}, [])

	return null
}
