'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface PageMainTransitionProps {
	children: ReactNode
	className?: string
}

export default function PageMainTransition({
	children,
	className,
}: PageMainTransitionProps) {
	const shouldReduceMotion = useReducedMotion()

	return (
		<motion.main
			initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
			animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
			transition={{
				duration: shouldReduceMotion ? 0 : 0.3,
				ease: [0.22, 1, 0.36, 1],
			}}
			className={className}
		>
			{children}
		</motion.main>
	)
}
