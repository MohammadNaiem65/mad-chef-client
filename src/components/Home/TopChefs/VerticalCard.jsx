import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rating } from '../../../shared';
import { modelImg } from '../../../assets';

export default function VerticalCard({ e }) {
	const name = 'Naiem';
	const rating = 5;
	const yearsOfExperience = 3;
	const availableRecipes = 5;
	const _id = 2;

	const arrowVariant = {
		hover: {
			x: [-20, 0],
			opacity: [0, 1],
			rotate: '45deg',
		},
	};

	return (
		<div className='h-[22rem] font-semibold flex flex-col justify-between relative rounded overflow-hidden'>
			<img
				src={modelImg}
				alt={`image of chef ${name}`}
				className='h-60 w-full object-cover object-center'
			/>
			<div className='h-28 px-5 md:px-2 py-2 bg-white text-slate-500 relative'>
				<div className='w-[7.25rem] h-12 bg-white grid place-items-center absolute left-0 -top-12 rounded-tr'>
					<p className='px-1 py-[0.375rem] bg-Primary text-yellow-300 flex items-center gap-x-[2px] rounded'>
						{<Rating rating={rating} />}
					</p>
				</div>

				<h3 className='text-lg text-black mt-2'>{e}</h3>
				<p>Experience: {yearsOfExperience} Years</p>
				<div className='flex justify-between items-center relative z-20'>
					<p>Recipes: {availableRecipes}</p>

					<Link
						to={`https://assignment-10-phr.netlify.app/dashboard/chefs/chef/${_id}`}
						className='cursor-pointer'>
						<motion.p
							whileHover='hover'
							whileTap='hover'
							className='w-12 h-6 flex justify-center items-center'>
							{[0, 1, 2].map((time) => (
								<motion.span
									key={time}
									initial={{
										x: 0,
										opacity: 1,
										rotate: '45deg',
									}}
									variants={arrowVariant}
									transition={{
										duration: 0.7,
										delay: 0.25 * time,
									}}
									className='w-3 h-3 border-t-[3px] border-r-[3px] border-Primary rounded-tr-[2px] block transform rotate-45'
								/>
							))}
						</motion.p>
					</Link>
				</div>

				{/* Right-Bottom blob */}
				<div className='shape-bg-one h-36 aspect-square bg-Primary bg-opacity-20 absolute -right-6 -bottom-16 z-10' />
			</div>
		</div>
	);
}
