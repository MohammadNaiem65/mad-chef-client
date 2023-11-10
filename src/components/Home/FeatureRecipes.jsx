import { motion } from 'framer-motion';
import {
	regionFood,
	regionFoodMd,
	regionFoodLg,
	taste,
	tasteMd,
	tasteLg,
	allFood,
	allFoodMd,
	allFoodLg,
} from '../../assets';

const cardDetails = [
	{ id: 1, img: 'region', title: 'Any Region', sub: 'You Want' },
	{ id: 2, img: 'taste', title: 'Any Flavour', sub: 'You Wanna Test' },
	{ id: 3, img: 'all', title: 'Everything', sub: 'On One Place' },
];

export default function FeatureRecipes() {
	return (
		<section className='w-10/12 md:w-11/12 lg:w-10/12 mx-auto my-16 flex flex-col md:flex-row gap-y-5 md:gap-x-3'>
			{cardDetails.map((card) => {
				const { id, img, title, sub } = card;
				return (
					<motion.div
						key={id}
						whileHover='hover'
						whileTap='hover'
						className='flex justify-center items-center relative overflow-hidden'>
						<picture>
							<source
								media='(min-width:769px )'
								srcSet={
									img === 'region'
										? regionFoodLg
										: img === 'taste'
										? tasteLg
										: allFoodLg
								}
							/>
							<source
								media='(max-width:768px)'
								srcSet={
									img === 'region'
										? regionFoodMd
										: img === 'taste'
										? tasteMd
										: allFoodMd
								}
							/>
							<source
								media='(max-width:425px)'
								srcSet={
									img === 'region'
										? regionFood
										: img === 'taste'
										? taste
										: allFood
								}
							/>
							<motion.img
								variants={{
									hover: {
										scale: 1.15,
										rotate: '5deg',
										duration: 0.3,
									},
								}}
								className='w-[22.125rem] lg:w-[26rem] h-36 lg:h-52 object-cover brightness-50 rounded relative z-10'
								src={
									img === 'region'
										? regionFoodLg
										: img === 'taste'
										? tasteLg
										: allFoodLg
								}
								alt={title}
							/>
						</picture>
						<div className='font-semibold font-Popins text-white absolute z-20'>
							<motion.h2
								layout
								initial={{ y: 15 }}
								variants={{
									hover: {
										y: -4,
									},
								}}
								transition={{
									duration: 0.3,
								}}
								className='text-2xl text-center'>
								{title}
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
								{sub}
							</motion.p>
						</div>
					</motion.div>
				);
			})}
		</section>
	);
}
