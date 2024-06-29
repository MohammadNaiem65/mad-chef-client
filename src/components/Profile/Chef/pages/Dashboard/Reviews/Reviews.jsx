import { useSelector } from 'react-redux';
import { useGetChefReviewsQuery } from '../../../../../../features/chef/chefApi';
import { Error, NoContent, Spinner } from '../../../../../../shared';
import Review from './Review';
import { Helmet } from 'react-helmet-async';

export default function Reviews() {
	const { _id } = useSelector((state) => state.user);

	const { data, isLoading, isSuccess, isError, error } =
		useGetChefReviewsQuery({
			chef_id: _id,
			sort: 'createdAt,updatedAt',
		});

	const { data: reviews } = data || {};

	let content;

	// Decide what to render
	if (isLoading) {
		content = <Spinner />;
	} else if (isError) {
		content = <Error message={error?.message} />;
	} else if (isSuccess && reviews?.length === 0) {
		content = <NoContent message='You have not made any reviews yet.' />;
	} else if (isSuccess && reviews?.length > 0) {
		content = reviews.map((review) => (
			<Review key={review._id} review={review} />
		));
	}

	return (
		<section className='w-full my-5 px-2 md:px-5'>
			<Helmet>
				<title>Reviews | Profile - Mad Chef</title>
			</Helmet>

			<h3 className='w-3/4 md:w-1/2 mb-5 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
				My Reviews:
			</h3>

			<div
				className={`w-full h-[20rem] my-4 px-2 md:pr-3 pb-10 flex flex-wrap gap-3 Bottom-Shadow ${
					reviews?.length > 2 && 'overflow-y-scroll'
				}`}>
				{content}
			</div>
		</section>
	);
}
