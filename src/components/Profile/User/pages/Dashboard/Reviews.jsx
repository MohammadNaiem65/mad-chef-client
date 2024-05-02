import { useSelector } from 'react-redux';
import { useGetChefReviewsByUserQuery } from '../../../../../features/user/userApi';
import { NoContent, Spinner } from '../../../../../shared';
import RatingCardForReview from './RatingCardForReview';

export default function Reviews() {
	const { _id: userId, pkg } = useSelector((state) => state.user);
	const { data, isLoading, isSuccess, isError, error } =
		useGetChefReviewsByUserQuery({ userId }, { skip: pkg !== 'pro' });

	const { data: reviews } = data || {};

	let content;
	if (pkg !== 'pro') {
		content = (
			<p className='my-10 text-center text-slate-600 text-xl font-semibold'>
				Only pro students can give reviews to Chefs
			</p>
		);
	} else if (isLoading) {
		content = <Spinner />;
	} else if (isSuccess && reviews?.length === 0) {
		content = <NoContent />;
	} else if (isError) {
		content = (
			<p className='w-fit mt-10 p-3 bg-red-300 text-lg text-red-700 font-semibold rounded'>
				{error?.data}
			</p>
		);
	} else if (isSuccess && reviews?.length > 0) {
		content = (
			<>
				{reviews.map((rating) => (
					<RatingCardForReview
						key={rating?._id}
						userId={userId}
						rating={rating}
					/>
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
