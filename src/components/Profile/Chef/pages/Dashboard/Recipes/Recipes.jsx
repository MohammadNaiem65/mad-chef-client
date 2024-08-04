import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { NoContent, Pagination, Recipe } from '../../../../../../shared';
import { useGetRecipesQuery } from '../../../../../../features/recipe/recipeApi';
import { usePaginationInfo } from '../../../../../../hooks';

export default function Recipes() {
	const { _id } = useSelector((state) => state.user);

	const { data, isSuccess, isError, error } = useGetRecipesQuery({
		data_filter: {
			chefId: _id,
		},
		include: '_id,img,title,ingredients,rating',
	});

	const { data: recipes, meta } = data || {};

	// Get the page details
	const { activePage, totalPages } = usePaginationInfo(meta?.page || '');

	let content;
	if (isSuccess && recipes?.length === 0) {
		content = <NoContent />;
	} else if (isError) {
		content = (
			<p className='w-fit mt-10 p-3 bg-red-300 text-lg text-red-700 font-semibold rounded'>
				{error?.data?.error}
			</p>
		);
	} else if (isSuccess && recipes?.length > 0) {
		content = (
			<>
				{recipes.map((recipe, index) => (
					<Recipe key={index} recipe={recipe} />
				))}

				<Pagination activePage={activePage} totalPages={totalPages} />
			</>
		);
	}

	return (
		<section className='w-full my-5 px-2 md:px-5'>
			<Helmet>
				<title>Recipes | Profile - Mad Chef</title>
			</Helmet>

			<h3 className='w-3/4 md:w-1/2 mb-5 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
				My Recipes:
			</h3>

			{content}
		</section>
	);
}
