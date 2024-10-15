import { useEffect, useState } from 'react';
import {
    useAddChefReviewMutation,
    useGetChefReviewsQuery,
} from '../../features/chef/chefApi';
import { showNotification } from '../../helpers';
import { usePaginationInfo } from '../../hooks';
import {
    Error,
    NoContent,
    Pagination,
    RoundSpinner,
    StudentRating,
    SubmitRatingForm,
} from '../../shared';

export default function Ratings({ chefId }) {
    const [page, setPage] = useState(1);

    const [addChefReview, { isError, error }] = useAddChefReviewMutation();
    const {
        data,
        isLoading: ratingsIsLoading,
        isError: ratingIsError,
        error: ratingsError,
    } = useGetChefReviewsQuery({
        chef_id: chefId,
        sort: 'rating,createdAt',
        page,
        limit: 10,
    });
    const { data: ratings, meta } = data || {};

    const { activePage, totalPages } = usePaginationInfo(meta?.page);

    // Show error notification if any error occurs while posting chef review
    useEffect(() => {
        if (isError) {
            showNotification('error', error?.data?.message);
        }
    }, [isError, error?.data?.message]);

    // Decide what to render
    let content;
    if (ratingsIsLoading) {
        content = <RoundSpinner className='text-Primary mt-28' />;
    } else if (!ratingsIsLoading && ratingIsError) {
        content = <Error message={ratingsError?.data?.message} />;
    } else if (!ratingsIsLoading && !ratingIsError && ratings?.length === 0) {
        content = <NoContent message='No ratings yet' />;
    } else if (!ratingsIsLoading && !ratingIsError && ratings?.length > 0) {
        content = ratings.map((rating) => (
            <StudentRating key={rating?._id} rating={rating} />
        ));
    }

    return (
        <section className='col-span-4 md:col-span-3 text-slate-700 text-lg'>
            <SubmitRatingForm
                ratingForDoc={{
                    queryName: 'chef_id',
                    fieldName: 'chefId',
                    fieldValue: chefId,
                }}
                submitFn={addChefReview}
            />

            {content}

            {totalPages > 1 && (
                <Pagination
                    activePage={activePage}
                    totalPages={totalPages}
                    setCurrPage={setPage}
                />
            )}
        </section>
    );
}
