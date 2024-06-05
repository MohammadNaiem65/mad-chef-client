import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Rating from './Rating';
import ArrowLink from './ArrowLink';

export default function Recipe({ recipe }) {
	const { _id, img, title, ingredients, rating } = recipe;

	return (
		<motion.div
			className='bg-Primary/20 mt-3 p-3 md:p-5 lg:p-6 text-slate-500 text-sm font-Popins rounded flex items-center'
			initial={{ y: 100, opacity: 0 }}
			whileInView={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6 }}
			viewport={{ once: true }}>
			<img
				className='size-[5rem] md:w-36 md:h-24 rounded object-cover'
				src={img}
				alt={`${title}'s picture`}
			/>
			<div className='w-3/5 lg:w-4/5 ml-2 md:ml-3'>
				<Link to={`/recipes/recipe/${recipe._id}`}>
					<h2 className='w-[9.5rem] md:w-96 text-black  text-xl font-Vollokorn mb-1 truncate'>
						{title}
					</h2>
				</Link>
				<p className='w-full truncate'>
					Ingredients:{' '}
					{ingredients?.join(', ').length >= 50
						? ingredients?.join(', ').slice(0, 50) + '...'
						: ingredients?.join(', ')}
				</p>
				<div className='text-xl text-yellow-500 mt-2 flex gap-1'>
					{<Rating rating={rating} />}
				</div>
			</div>
			<div className='arrows w-12 h-6 ml-auto flex justify-center items-center'>
				<ArrowLink to={`/recipes/recipe/${_id}`} />
			</div>
		</motion.div>
	);
}
