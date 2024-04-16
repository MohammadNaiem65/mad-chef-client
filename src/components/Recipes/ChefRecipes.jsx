import { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

import { useGetRecipesQuery } from '../../features/recipe/recipeApi';
import Recipe from '../../shared/Recipe';
import { Pagination } from '../../shared';
import { useSelector } from 'react-redux';

export default function ChefRecipes({ chefId }) {
	const [pageDetails, setPageDetails] = useState({
		currPage: 1,
		totalPages: null,
	});
	const recipeFilter = useSelector((state) => state.recipeFilter);

	const { data } = useGetRecipesQuery({
		data_filter: {
			chefId,
			searchQuery: recipeFilter.keyword,
			uploadDate: recipeFilter.uploadDate,
			region: recipeFilter.region,
		},
		sort: recipeFilter.sortBy,
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
			{!recipes?.length ? (
				<p className='h-full mt-36 text-slate-700 text-center font-semibold'>
					No Content Found
				</p>
			) : (
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
								pageDetails.currPage ===
									pageDetails.totalPages ||
								pageDetails.currPage === null
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
			)}

			<section className='mt-4'>
				{recipes?.map((recipe, index) => (
					<Recipe key={recipe._id} index={index} recipe={recipe} />
				))}
			</section>

			{recipes?.length > 0 && (
				<Pagination
					activePage={pageDetails.currPage}
					totalPages={pageDetails.totalPages}
				/>
			)}
		</section>
	);
}
