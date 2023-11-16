import { motion } from 'framer-motion';

export default function Consult() {
	const time = '20:30';
	const date = '30-20-2015';
	const name = 'Naiem';

	return (
		<div className='w-fit'>
			<motion.div
				whileHover='hover'
				transition={{
					duration: 1,
					ease: 'backInOut',
				}}
				variants={{
					hover: {
						scale: 1.05,
					},
				}}
				className='relative h-96 w-80 shrink-0 overflow-hidden rounded-xl bg-Primary'>
				<div className='w-full h-full relative z-10 text-white backdrop-blur-sm p-8'>
					<span className='mb-3 block w-fit rounded-full bg-white/30 px-3 py-0.5 text-sm font-light text-white'>
						Consult
					</span>
					<motion.span
						initial={{ scale: 0.85 }}
						variants={{
							hover: {
								scale: 1,
							},
						}}
						transition={{
							duration: 1,
							ease: 'backInOut',
						}}
						className='mt-8 block origin-top-left font-mono text-6xl font-black leading-[1.2]'>
						{time}
						<br />
						PM
					</motion.span>
					<p className='text-xl'>Chef: {name}</p>
					<p className=''>Date: {date}</p>

					<button className='mt-7 w-full rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white'>
						Delete
					</button>
				</div>

				{/* background blobs */}
				<motion.svg
					width='320'
					height='384'
					viewBox='0 0 320 384'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='absolute inset-0 z-0'
					variants={{
						hover: {
							scale: 1.5,
						},
					}}
					transition={{
						duration: 1,
						ease: 'backInOut',
					}}>
					<motion.circle
						variants={{
							hover: {
								scaleY: 0.5,
								y: -25,
							},
						}}
						transition={{
							duration: 1,
							ease: 'backInOut',
							delay: 0.2,
						}}
						cx='160.5'
						cy='114.5'
						r='101.5'
						fill='#262626'
					/>
					<motion.ellipse
						variants={{
							hover: {
								scaleY: 2.25,
								y: -25,
							},
						}}
						transition={{
							duration: 1,
							ease: 'backInOut',
							delay: 0.2,
						}}
						cx='160.5'
						cy='265.5'
						rx='101.5'
						ry='43.5'
						fill='#262626'
					/>
				</motion.svg>
			</motion.div>
		</div>
	);
}
