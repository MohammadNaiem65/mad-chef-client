import { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

import { useGetRecipesQuery } from '../../features/recipe/recipeApi';
import Recipe from '../../shared/Recipe';

export default function ChefRecipes({ chefId }) {
	const [pageDetails, setPageDetails] = useState({
		currPage: 1,
		totalPages: null,
	});

	const { data } = useGetRecipesQuery({
		chef_id: chefId,
		page: pageDetails.currPage,
		include: 'title,ingredients,rating,img',
	});
	const { data: recipes, meta } = data || {};

	useEffect(() => {
		const pNumber = meta?.page?.split('/');

		if (pNumber?.length > 0) {
			setPageDetails({
				currPage: parseInt(pNumber[0]),
				totalPages: parseInt(pNumber[1]),
			});
		}
	}, [recipes, meta?.page]);

	return (
		<section className='w-full px-5 lg:p-0'>
			<div className='flex justify-between items-center'>
				<h3 className='text-xl font-semibold font-Vollokorn'>
					Recipes:
				</h3>
				<div className='text-3xl text-Primary flex items-center gap-x-2'>
					<button
						disabled={pageDetails.currPage === 1}
						className='disabled:translate-y-1 disabled:scale-95 duration-300 disabled:text-blue-700 translate-y-0'
						onClick={() =>
							setPageDetails((prev) => ({
								...prev,
								currPage: prev.currPage - 1,
							}))
						}>
						<FaAngleLeft className='cursor-pointer' />
					</button>
					<button
						disabled={
							pageDetails.currPage === pageDetails.totalPages
						}
						className='disabled:translate-y-1 disabled:scale-95 duration-300 disabled:text-blue-700 translate-y-0'
						onClick={() =>
							setPageDetails((prev) => ({
								...prev,
								currPage: prev.currPage + 1,
							}))
						}>
						<FaAngleRight className='cursor-pointer' />
					</button>
				</div>
			</div>

			<section className='mt-4'>
				{recipes?.map((recipe, index) => (
					<Recipe key={recipe._id} index={index} recipe={recipe} />
				))}
			</section>
		</section>
	);
}
