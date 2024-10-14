import { useState } from 'react';
import { useGetRecipesQuery } from '../../features/recipe/recipeApi';
import {
    Error,
    NoContent,
    Pagination,
    Recipe,
    RoundSpinner,
} from '../../shared';
import { usePaginationInfo } from '../../hooks';

export default function Recipes({ chefId }) {
    const [sortBy, setSortBy] = useState('newest');
    const [page, setPage] = useState(1);
    const { data, isFetching, isSuccess, isError, error } = useGetRecipesQuery(
        {
            page,
            data_filter: { chefId },
            sort: sortBy === 'rating' ? 'rating' : 'createdAt',
            order: sortBy === 'oldest' ? 'asc' : 'desc',
        },
        { skip: !chefId }
    );
    const { data: recipes, meta } = data || {};
    const { activePage, totalPages } = usePaginationInfo(meta?.page);

    // Decide what to render
    let content;

    if (isFetching) {
        content = <RoundSpinner className='mt-32' />;
    } else if (!isFetching && isError) {
        content = <Error message={error.message} />;
    } else if (!isFetching && isSuccess && recipes?.length === 0) {
        content = <NoContent message='No data found.' />;
    } else if (!isFetching && isSuccess && recipes?.length > 0) {
        content = recipes.map((recipe) => (
            <Recipe key={recipe._id} recipe={recipe} />
        ));
    }

    return (
        <section className='min-h-96 font-Popins text-gray-400'>
            <section className='flex justify-between items-center'>
                <h3 className='text-xl text-black text-center md:text-start lg:text-start font-Vollkorn font-semibold'>
                    Recipes:
                </h3>
                <div className=''>
                    <label htmlFor='sortBy'>Sort By:</label>
                    <select
                        id='sortBy'
                        className='ml-2 px-2 py-1 text-slate-700 rounded cursor-pointer'
                        defaultValue={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value='newest'>Newest</option>
                        <option value='oldest'>Oldest</option>
                        <option value='rating'>Rating</option>
                    </select>
                </div>
            </section>

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
