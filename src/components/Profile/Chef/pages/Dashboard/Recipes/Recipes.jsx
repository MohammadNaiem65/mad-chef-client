import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { usePaginationInfo } from '../../../../../../hooks';
import { useGetRecipesQuery } from '../../../../../../features/recipe/recipeApi';
import {
    Error,
    NoContent,
    Pagination,
    Recipe,
    RoundSpinner,
} from '../../../../../../shared';

export default function Recipes() {
    const { _id } = useSelector((state) => state.user);

    const { data, isLoading, isSuccess, isError, error } = useGetRecipesQuery({
        data_filter: {
            chefId: _id,
        },
        include: '_id,img,title,ingredients,status,author,rating',
        role: 'chef',
    });

    const { data: recipes, meta } = data || {};

    // Get the page details
    const { activePage, totalPages } = usePaginationInfo(meta?.page || '');

    // Decide what to render
    let content;
    if (isLoading) {
        content = <RoundSpinner className='mt-28 text-Primary' />;
    } else if (!isSuccess && isError) {
        content = <Error message={error?.data?.message} />;
    } else if (isSuccess && !isError && recipes?.length === 0) {
        content = (
            <div className='mt-28'>
                <NoContent message='You have not added any recipes yet.' />
            </div>
        );
    } else if (isSuccess && !isError && recipes?.length > 0) {
        content = (
            <>
                {recipes.map((recipe, index) => (
                    <Recipe key={index} recipe={recipe} />
                ))}

                {totalPages > 1 && (
                    <Pagination
                        activePage={activePage}
                        totalPages={totalPages}
                    />
                )}
            </>
        );
    }

    return (
        <section className='w-full my-5 px-2 md:px-5'>
            <Helmet>
                <title>Recipes | Profile - Mad Chef</title>
            </Helmet>

            <div className='w-full mb-5 px-2 flex justify-between items-center'>
                <h3 className='w-1/2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
                    My Recipes:
                </h3>

                <Link
                    to='/recipes/post-recipe'
                    className='bg-Primary/60 text-white px-4 py-2 rounded-md'
                >
                    Post Recipe
                </Link>
            </div>

            {content}
        </section>
    );
}
