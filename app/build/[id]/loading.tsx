export default function Loading() {
	return (
		<div className='relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1c_40%,#04060d_100%)] text-white'>
			<div className='mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pb-8 pt-4 sm:px-8 sm:pb-10 lg:px-10'>
				<div className='h-16 w-full animate-pulse rounded-full bg-white/6' />

				<div className='mt-8 grid gap-6'>
					<div className='h-40 animate-pulse rounded-[2rem] border border-white/10 bg-slate-950/55' />
					<div className='grid gap-6 xl:grid-cols-2'>
						<div className='h-[340px] animate-pulse rounded-[2rem] border border-white/10 bg-slate-950/55' />
						<div className='h-[340px] animate-pulse rounded-[2rem] border border-white/10 bg-slate-950/55' />
					</div>
					<div className='h-[440px] animate-pulse rounded-[2rem] border border-white/10 bg-slate-950/55' />
					<div className='grid gap-6 xl:grid-cols-2'>
						<div className='h-60 animate-pulse rounded-[2rem] border border-white/10 bg-slate-950/55' />
						<div className='h-60 animate-pulse rounded-[2rem] border border-white/10 bg-slate-950/55' />
					</div>
				</div>
			</div>
		</div>
	)
}
