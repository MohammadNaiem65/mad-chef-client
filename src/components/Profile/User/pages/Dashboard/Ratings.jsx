import { useSelector } from 'react-redux';
import { useGetRecipeRatingsQuery } from '../../../../../features/recipe/recipeApi';
import { NoContent, Spinner } from '../../../../../shared';
import RatingComponent from './Rating';

export default function Ratings() {
	const { _id: userId } = useSelector((state) => state.user);
	const { data, isLoading, isSuccess, isError, error } =
		useGetRecipeRatingsQuery({ data_filter: { userId } });

	const { data: ratings } = data || {};

	let content;
	if (isLoading) {
		content = <Spinner />;
	} else if (isSuccess && ratings?.length === 0) {
		content = <NoContent />;
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
					<RatingComponent key={rating?._id} rating={rating} />
				))}
			</>
		);
	}

	return (
		<section className='text-gray-600 body-font'>
			<div className='container px-5 py-24 mx-auto flex flex-wrap'>
				<div className='flex flex-wrap -m-4'>{content}</div>
			</div>
		</section>
	);
}
