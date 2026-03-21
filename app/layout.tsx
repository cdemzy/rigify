import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Rigify',
	description:
		'Rigify helps you enter your parts, target resolution, and favorite games to get clear compatibility notes, bottleneck warnings, wattage guidance, and realistic FPS expectations.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			data-scroll-behavior='smooth'
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body suppressHydrationWarning className='min-h-full flex flex-col'>
				{children}
			</body>
		</html>
	)
}
