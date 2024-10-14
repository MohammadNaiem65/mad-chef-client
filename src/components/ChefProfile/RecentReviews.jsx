import { useGetChefReviewsQuery } from '../../features/chef/chefApi';
import { Error, NoContent, RoundSpinner } from '../../shared';
import Review from './Review';

export default function RecentReviews({ chefId }) {
    const { data, isLoading, isSuccess, isError, error } =
        useGetChefReviewsQuery({
            chef_id: chefId,
            sort: 'createdAt',
            limit: 3,
        });
    const { data: reviews } = data || {};

    let content;
    if (isLoading) {
        content = <RoundSpinner className='mt-20' />;
    } else if (!isLoading && isError) {
        content = <Error message={error?.data?.message} />;
    } else if (!isLoading && isSuccess && reviews?.length === 0) {
        content = <NoContent message='No reviews yet' />;
    } else if (!isLoading && isSuccess && reviews?.length > 0) {
        content = reviews.map((review) => (
            <Review key={review._id} review={review} />
        ));
    }

    return (
        <section className='mt-4 '>
            <h2 className='mb-2 text-xl text-black text-start font-Vollkorn font-semibold'>
                Recent Reviews
            </h2>

            {content}
        </section>
    );
}
