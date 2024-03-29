import { motion } from 'framer-motion';
import Recipe from '../../../shared/Recipe';
import { NoContent } from '../../../shared';

export default function FavoriteRecipe({ favorites }) {
	return (
		<section className='w-11/12 mt-20 mx-auto overflow-hidden'>
			<h3 className='w-1/4 text-2xl font-semibold text-black/80 border-b-2 border-Primary px-2'>
				Favorites:
			</h3>

			{favorites.length > 0 ? (
				<motion.div
					initial='hide'
					whileInView='show'
					variants={{
						hide: { opacity: 0 },
						show: { opacity: 1 },
					}}
					viewport={{ once: true }}
					transition={{ when: 'beforeChildren', delayChildren: 0.5 }}
					className='w-11/12 mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3'>
					{[1, 2, 3, 4, 5].map((el, index) => (
						<Recipe
							key={el}
							index={index}
							link={`/recipes/recipe/${el}`}
						/>
					))}
				</motion.div>
			) : (
				<NoContent />
			)}
		</section>
	);
}
