import { NextResponse } from 'next/server'

const signupSuccessCookieName = 'rigify_signup_success'

export async function POST() {
	const response = NextResponse.json({ ok: true })

	response.cookies.set(signupSuccessCookieName, '', {
		httpOnly: true,
		maxAge: 0,
		path: '/auth/sign-up-success',
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
	})

	return response
}
