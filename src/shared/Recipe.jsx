import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Rating from './Rating';
import ArrowLink from './ArrowLink';

export default function Recipe({ index, recipe }) {
	const { img, title, ingredients, rating } = recipe;

	return (
		<motion.div
			className='bg-Primary/20 mt-3 p-3 md:p-5 lg:p-6 text-slate-500 text-sm font-Popins rounded flex items-center'
			initial={{ y: 100, opacity: 0 }}
			whileInView={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, delay: index * 0.25 }}
			viewport={{ once: true }}>
			<img
				className='w-36 h-24 rounded object-cover'
				src={img}
				alt={`${title}'s picture`}
			/>
			<div className='ml-3'>
				<Link to={`/recipes/recipe/${recipe._id}`}>
					<h2 className='w-[9.5rem] md:w-96 text-black  text-xl font-Vollokorn mb-1 truncate'>
						{title}
					</h2>
				</Link>
				<p>
					Ingredients:{' '}
					{ingredients.join(', ').length >= 50
						? ingredients.join(', ').slice(0, 50) + '...'
						: ingredients.join(', ')}
				</p>
				<div className='text-xl text-yellow-500 mt-2 flex gap-1'>
					{<Rating rating={rating} />}
				</div>
			</div>
			<Link
				to={`/recipes/recipe/${recipe._id}`}
				className='arrows ml-auto flex justify-center items-center w-12 h-6'>
				<ArrowLink />
			</Link>
		</motion.div>
	);
}
