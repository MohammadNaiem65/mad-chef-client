import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

import { useGetRecipesQuery } from '../../features/recipe/recipeApi';
import Recipe from '../../shared/Recipe';
import { Pagination } from '../../shared';
import { useSelector } from 'react-redux';
import { usePaginationInfo } from '../../hooks';

export default function ChefRecipes({ chefId }) {
    const [currPage, setCurrPage] = useState(1);

    const recipeFilter = useSelector((state) => state.recipeFilter);

    const { data, isLoading } = useGetRecipesQuery({
        data_filter: {
            chefId,
            searchQuery: recipeFilter.keyword,
            uploadDate: recipeFilter.uploadDate,
            region: recipeFilter.region,
        },
        sort: recipeFilter.sortBy,
        order: recipeFilter.order,
        page: currPage,
        include: 'title,ingredients,rating,img',
    });
    const { data: recipes, meta } = data || {};

    const { activePage, totalPages } = usePaginationInfo(meta?.page);

    return (
        <section className='w-full px-5 lg:p-0'>
            {!recipes?.length ? (
                <p className='h-full mt-36 text-slate-700 text-center font-semibold'>
                    No Content Found
                </p>
            ) : (
                <div className='flex justify-between items-center'>
                    <h3 className='text-xl font-semibold font-Vollkorn'>
                        Recipes:
                    </h3>
                    <div className='text-3xl text-Primary flex items-center gap-x-2'>
                        <button
                            disabled={currPage === 1}
                            className='disabled:translate-y-1 disabled:scale-95 duration-300 disabled:text-blue-700 translate-y-0'
                            onClick={() => setCurrPage((prev) => prev - 1)}
                        >
                            <FaAngleLeft className='cursor-pointer' />
                        </button>
                        <button
                            disabled={
                                currPage === totalPages || totalPages === 1
                            }
                            className='disabled:translate-y-1 disabled:scale-95 duration-300 disabled:text-blue-700 translate-y-0'
                            onClick={() => setCurrPage((prev) => prev + 1)}
                        >
                            <FaAngleRight className='cursor-pointer' />
                        </button>
                    </div>
                </div>
            )}

            <section className='mt-4'>
                {recipes?.map((recipe) => (
                    <Recipe key={recipe._id} recipe={recipe} />
                ))}
            </section>

            {!isLoading && totalPages > 1 && (
                <Pagination
                    activePage={activePage}
                    totalPages={totalPages}
                    setCurrPage={setCurrPage}
                />
            )}
        </section>
    );
}
