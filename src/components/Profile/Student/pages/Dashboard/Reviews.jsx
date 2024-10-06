import { useSelector } from 'react-redux';
import { useGetChefReviewsByStudentQuery } from '../../../../../features/student/studentApi';
import { NoContent, Spinner } from '../../../../../shared';
import RatingCardForChefReview from './RatingCardForChefReview';
import { Helmet } from 'react-helmet-async';

export default function Reviews() {
    const { _id: userId, pkg } = useSelector((state) => state.user);
    const { data, isLoading, isSuccess, isError, error } =
        useGetChefReviewsByStudentQuery(
            { studentId: userId },
            { skip: pkg !== 'pro' }
        );

    const { data: reviews } = data || {};

    let content;
    if (pkg !== 'pro') {
        content = (
            <p className='md:mx-auto my-28 md:my-36 px-5 text-center text-slate-600 text-xl font-semibold'>
                Only{' '}
                <span className='mt-6 lg:mt-10 px-3 py-1 font-semibold text-white text-sm bg-Primary/70 rounded'>
                    Pro
                </span>{' '}
                students can give reviews to Chefs
            </p>
        );
    } else if (isLoading) {
        content = <Spinner />;
    } else if (isSuccess && reviews?.length === 0) {
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
    } else if (isSuccess && reviews?.length > 0) {
        content = (
            <>
                {reviews.map((rating) => (
                    <RatingCardForChefReview
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
                <title>Chef Reviews | Profile - Mad Chef</title>
            </Helmet>

            <div
                className={`w-full h-[20rem] my-4 px-2 md:pr-3 flex flex-wrap gap-3 ${
                    reviews?.length > 2 && 'overflow-y-scroll'
                }`}
            >
                {content}
            </div>
        </section>
    );
}
