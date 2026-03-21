import Link from 'next/link'

import PageMainTransition from '@/components/page-main-transition'
import SiteHeader from '@/components/site-header'

const headings = [
	'Well, this is awkward.',
	'You found the void.',
	'Nothing to see here. Literally.',
	'Oops. This page ghosted you.',
	'Lost? Same.',
	'404: Page not found (but at least you are)',
	'This page took a wrong turn.',
	'We looked everywhere. No luck.',
	"The page you're looking for doesn't exist — yet.",
	'Into the abyss you go.',
	'This page has left the building.',
	'Houston, we have a 404.',
	'The page is gone. Long live the page.',
	"Hmm, we can't find that page.",
	'Looks like this page moved on.',
	'That link must be on vacation.',
	"Let's get you back on track.",
	"Even we're not sure what happened here.",
	"You've reached the edge of the internet.",
	'Page not found. Neither is our dignity.',
	'This URL had one job.',
]

const messages = [
	"The page you're looking for pulled a disappearing act. Try heading home instead.",
	'Either the link is broken, or this page is on an unannounced sabbatical.',
	"Whatever you were looking for, it's not here. But hey, at least the homepage works.",
	"The page may have moved, been deleted, or never existed. Check the URL or start fresh from the homepage.",
	"Don't worry — it happens to everyone. Let's get you back to somewhere useful.",
	"We couldn't find what you were looking for, but we can help you find something better.",
	"This page doesn't exist. Try the homepage.",
	'Nothing here. Double-check your link or go back.',
	'Our bad. The page went missing on our watch. Head home and try again.',
	'Page unavailable. It may have moved or been removed.',
	"Yep, it's a 404. We're just as surprised as you are.",
]

export default function NotFound() {
	const heading = headings[0]
	const message = messages[0]

	return (
		<div className='relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_40%,#04060d_100%)] text-white'>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent'
			/>

			<div className='mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-10 lg:px-12'>
				<SiteHeader variant='auth' />

				<PageMainTransition className='flex flex-1 items-center justify-center py-12 lg:py-16'>
					<main className='w-full max-w-3xl text-center'>
						<p className='inline-flex items-center rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-rose-200'>
							Error 404
						</p>
						<h1 className='mt-8 text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl'>
							{heading}
						</h1>
						<p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl'>
							{message}
						</p>

						<div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
							<Link
								href='/'
								className='inline-flex min-h-14 min-w-44 items-center justify-center rounded-full bg-sky-400 px-7 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
							>
								Return Home
							</Link>
							<Link
								href='/auth/login'
								className='inline-flex min-h-14 min-w-44 items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
							>
								Go to Login
							</Link>
						</div>
					</main>
				</PageMainTransition>
			</div>
		</div>
	)
}
