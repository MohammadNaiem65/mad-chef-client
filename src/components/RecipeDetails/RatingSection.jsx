import { useState } from 'react';
import {
    useAddRecipeRatingMutation,
    useGetRecipeRatingsQuery,
} from '../../features/recipe/recipeApi';
import {
    Error,
    NoContent,
    Pagination,
    RoundSpinner,
    StudentRating,
    SubmitRatingForm,
} from '../../shared';
import { usePaginationInfo } from '../../hooks';

export default function RatingSection({ recipeId }) {
    const { page, setPage } = useState(1);
    const [addRecipeRating] = useAddRecipeRatingMutation();
    const {
        data,
        isLoading: ratingsIsLoading,
        isError: ratingIsError,
        error: ratingsError,
    } = useGetRecipeRatingsQuery({ recipeId, sort: 'createdAt,rating', page });
    const { data: ratings, meta } = data || {};
    const { activePage, totalPages } = usePaginationInfo(meta?.page);

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
        <section className='text-slate-700'>
            <SubmitRatingForm
                ratingForDoc={{
                    fieldName: 'recipeId',
                    fieldValue: recipeId,
                    queryName: 'recipeId',
                }}
                submitFn={addRecipeRating}
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
