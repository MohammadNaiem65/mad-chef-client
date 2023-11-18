import { motion } from 'framer-motion';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Recipe from '../../shared/Recipe';

export default function ChefRecipes() {
	return (
		<section className='w-full mt-10 px-5 lg:p-0'>
			<div className='flex justify-between items-center'>
				<h3 className='text-xl font-semibold font-Vollokorn'>
					Recipe details:
				</h3>
				<div className='text-3xl text-Primary flex items-center gap-x-2'>
					<button
						// disabled={scrollProgress.curr === 0}
						className='disabled:translate-y-1 disabled:scale-95 duration-300 disabled:text-blue-700 translate-y-0'>
						<FaAngleLeft className='cursor-pointer' />
					</button>
					<button
						// disabled={scrollProgress.curr === containerWidth}
						className='disabled:translate-y-1 disabled:scale-95 duration-300 disabled:text-blue-700 translate-y-0'>
						<FaAngleRight className='cursor-pointer' />
					</button>
				</div>
			</div>

			<motion.section initial='hide' whileInView='show' className='mt-4'>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
					<Recipe key={el} index={el} />
				))}
			</motion.section>
		</section>
	);
}
