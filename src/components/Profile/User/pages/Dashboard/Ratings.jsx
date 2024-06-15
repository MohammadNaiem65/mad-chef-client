import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useGetRecipeRatingsQuery } from '../../../../../features/recipe/recipeApi';
import { NoContent, Spinner } from '../../../../../shared';
import RatingCardForRecipeRating from './RatingCardForRecipeRating';

export default function Ratings() {
	const { _id: userId } = useSelector((state) => state.user);
	const { data, isLoading, isSuccess, isError, error } =
		useGetRecipeRatingsQuery({ data_filter: { userId } });

	const { data: ratings } = data || {};

	let content;
	if (isLoading) {
		content = <Spinner />;
	} else if (isSuccess && ratings?.length === 0) {
		content = (
			<section className='my-28 md:mx-auto px-5'>
				<NoContent />
			</section>
		);
	} else if (isError) {
		content = (
			<p className='w-fit mt-10 p-3 bg-red-300 text-lg text-red-700 font-semibold rounded'>
				{error?.data}
			</p>
		);
	} else if (isSuccess && ratings?.length > 0) {
		content = (
			<>
				{ratings.map((rating) => (
					<RatingCardForRecipeRating
						key={rating?._id}
						userId={userId}
						rating={rating}
					/>
				))}
			</>
		);
	}

	return (
		<section className='px-2 text-gray-600'>
			<Helmet>
				<title>Recipe Ratings | Profile - Mad Chef</title>
			</Helmet>

			<div
				className={`w-full h-[20rem] my-4 px-2 md:pr-3 flex flex-wrap gap-3 ${
					ratings?.length > 2 && 'overflow-y-scroll'
				}`}>
				{content}
			</div>
		</section>
	);
}
