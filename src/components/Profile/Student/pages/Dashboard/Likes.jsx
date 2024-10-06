import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { selectUser } from '../../../../../features/auth/authSelectors';
import { useGetLikedRecipesQuery } from '../../../../../features/recipe/recipeApi';
import { NoContent, Spinner } from '../../../../../shared';
import Like from './Like';

export default function Likes() {
    const { userId } = useSelector(selectUser);
    const { data, isLoading, isSuccess, isError, error } =
        useGetLikedRecipesQuery({
            studentId: userId,
        });

    const favorites = data?.data || [];

    let content;
    if (isLoading) {
        content = <Spinner />;
    } else if (isSuccess && favorites?.length === 0) {
        content = <NoContent />;
    } else if (isError) {
        content = (
            <p className='w-fit mt-10 p-3 bg-red-300 text-lg text-red-700 font-semibold rounded'>
                {error?.data}
            </p>
        );
    } else if (isSuccess && favorites?.length > 0) {
        content = favorites.map((recipe, index) => (
            <Like key={index} recipeId={recipe?.recipeId} />
        ));
    }

    return (
        <section className='w-full my-5 px-2 md:px-5'>
            <Helmet>
                <title>Liked Recipes | Profile - Mad Chef</title>
            </Helmet>

            <h3 className='w-3/4 md:w-1/2 mb-5 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
                Liked Recipes:
            </h3>
            {content}
        </section>
    );
}
