import { useGetRecipeRatingsQuery } from '../../features/recipe/recipeApi';
import { Error, NoContent, RoundSpinner } from '../../shared';
import RatingField from './RatingField';
import RecipeRating from './RecipeRating';

export default function RatingSection({ recipeId }) {
    const {
        data,
        isLoading: ratingsIsLoading,
        isError: ratingIsError,
        error: ratingsError,
    } = useGetRecipeRatingsQuery({ recipeId });
    const { data: ratings } = data || {};

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
            <RecipeRating key={rating?._id} rating={rating} />
        ));
    }

    return (
        <section className='text-slate-700'>
            <RatingField recipeId={recipeId} />

            {content}
        </section>
    );
}
