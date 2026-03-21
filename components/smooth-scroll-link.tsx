'use client'

import type { MouseEvent, ReactNode } from 'react'

interface SmoothScrollLinkProps {
	href: `#${string}`
	children: ReactNode
	className?: string
}

export default function SmoothScrollLink({
	href,
	children,
	className,
}: SmoothScrollLinkProps) {
	function handleClick(event: MouseEvent<HTMLAnchorElement>) {
		const targetId = href.slice(1)
		const targetElement = document.getElementById(targetId)

		if (!targetElement) {
			return
		}

		event.preventDefault()

		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches

		targetElement.scrollIntoView({
			behavior: prefersReducedMotion ? 'auto' : 'smooth',
			block: 'start',
		})
	}

	return (
		<a href={href} onClick={handleClick} className={className}>
			{children}
		</a>
	)
}
