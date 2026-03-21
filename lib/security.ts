const MAX_EMAIL_LENGTH = 254
const MAX_PASSWORD_LENGTH = 128

const allowedAuthErrorMessages: Record<string, string> = {
	otp_expired: 'This email link is invalid or has expired. Please request a new one.',
	access_denied: 'We could not complete that email verification request.',
}

export function normalizeEmail(value: string) {
	return value.trim().toLowerCase()
}

export function isValidEmail(value: string) {
	const normalizedEmail = normalizeEmail(value)

	return (
		normalizedEmail.length > 0 &&
		normalizedEmail.length <= MAX_EMAIL_LENGTH &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
	)
}

export function isValidPasswordLength(value: string) {
	return value.length > 0 && value.length <= MAX_PASSWORD_LENGTH
}

export function getSafeAuthErrorMessage(errorCode: string | null) {
	if (errorCode && allowedAuthErrorMessages[errorCode]) {
		return allowedAuthErrorMessages[errorCode]
	}

	return allowedAuthErrorMessages.access_denied
}

export function getSafeInternalRedirect(
	value: string | null | undefined,
	fallback = '/auth/login',
) {
	if (!value) {
		return fallback
	}

	if (!value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
		return fallback
	}

	return value
}

export { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH }
