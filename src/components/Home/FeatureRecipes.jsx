import { motion } from 'framer-motion';
import { allFood, regionFood, taste } from '../../assets';

export default function FeatureRecipes() {
	return (
		<section className='w-10/12 mx-auto my-10'>
			<motion.div
				whileHover='hover'
				whileTap='hover'
				className='flex justify-center items-center relative overflow-hidden'>
				<motion.img
					variants={{
						hover: {
							scale: 1.15,
							rotate: '2.5deg',
							duration: 0.3,
						},
					}}
					className='w-[22.125rem] h-36 object-cover brightness-50 rounded relative z-10'
					src={regionFood}
					alt='any region'
				/>
				<div className='font-semibold font-Popins text-white absolute z-20'>
					<motion.h2
						layout
						initial={{ y: 15 }}
						variants={{
							hover: {
								y: -7,
							},
						}}
						transition={{
							duration: 0.3,
						}}
						className='text-2xl text-center'>
						Any Region
					</motion.h2>
					<motion.span
						initial={{ scale: 0 }}
						variants={{
							hover: {
								scale: 1,
							},
						}}
						transition={{
							duration: 0.3,
						}}
						className='h-[4px] w-48 bg-Primary block origin-left rounded-full z-20'
					/>
					<motion.p
						initial={{ opacity: 0, y: -10 }}
						variants={{
							hover: {
								opacity: 1,
								y: 0,
							},
						}}
						transition={{ duration: 0.3 }}
						className='text-center'>
						You Like
					</motion.p>
				</div>
			</motion.div>
			{/* <div>
				<img className='w-full' src={taste} alt='any taste' />
			</div>*/}
			{/* 
			<div className='flex justify-center items-center relative overflow-hidden'>
				<img
					className='w-[22.125rem] h-36 object-cover rounded relative z-10'
					src={regionFood}
					alt='any region'
				/>
				<div className='font-semibold font-Popins text-white absolute z-20'>
					<h2 className='text-2xl text-Primary drop-shadow shadow'>
						Any Region
					</h2>
					<p className='text-center'>You Like</p>
				</div>
			</div> */}

			{/* <div>
				<img className='w-full' src={allFood} alt='all food' />
			</div> */}
		</section>
	);
}
