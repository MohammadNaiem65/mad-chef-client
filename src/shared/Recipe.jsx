import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Rating from './Rating';
import ArrowLink from './ArrowLink';
import { modelImg } from '../assets';

export default function Recipe({ recipe, index }) {
	// const { picture, name, ingredients, rating } = recipe;
	const name = 'Hey you, what do you think? where are you going';

	return (
		<motion.div
			className='bg-Primary/20 mt-3 p-3 md:p-5 lg:p-6 text-slate-500 text-sm font-Popins rounded flex items-center'
			// use hide and show variants in the parent container
			variants={{
				hide: { y: 100, opacity: 0 },
				show: {
					y: 0,
					opacity: 1,
				},
			}}
			transition={{ duration: 0.6, delay: index * 0.25 }}
			viewport={{ once: true }}>
			<img
				className='w-36 h-24 rounded object-cover'
				src={modelImg}
				alt={`${name}'s picture`}
			/>
			<div className='ml-3'>
				<Link>
					<h2 className='w-[9.5rem] md:w-96 text-black  text-xl font-Vollokorn mb-1 truncate'>
						{name}
					</h2>
				</Link>
				{/* <p>
					Ingredient:{' '}
					{ingredients.join(', ').length >= 50
						? ingredients.join(', ').slice(0, 50) + '...'
						: ingredients.join(', ')}
				</p> */}
				<p className='w-[9.5rem] md:w-96 truncate -mt-1'>
					Whats up, ki obstha?Hey you, what do you think? where are
					you going
				</p>
				<div className='text-xl text-yellow-500 mt-2 flex gap-1'>
					{<Rating rating={5} />}
				</div>
			</div>
			<Link
				to={{
					pathname: `${location}/recipe-details`,
					state: { recipe: recipe },
				}}
				className='arrows ml-auto flex justify-center items-center w-12 h-6'
				onClick={() => {
					sessionStorage.setItem('recipe', JSON.stringify(recipe));
					sessionStorage.setItem('prev-location', location);
				}}>
				<ArrowLink />
			</Link>
		</motion.div>
	);
}
