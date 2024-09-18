import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { IoFilter, IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import {
    Error,
    NoContent,
    Pagination,
    RoundSpinner,
} from '../../../../../../shared';
import {
    useDeleteRecipeMutation,
    useGetRecipeQuery,
    useGetRecipesQuery,
    useUpdateRecipeStatusMutation,
} from '../../../../../../features/recipe/recipeApi';
import { usePaginationInfo } from '../../../../../../hooks';
import showNotification from '../../../../../../helpers/showNotification';
import Recipe from './Recipe';

export default function Recipes() {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [recipeId, setRecipeId] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [currPage, setCurrPage] = useState(1);

    const filters = {
        page: currPage,
        include: 'author,region,rating,status',
        role: 'admin',
    };

    const {
        data: recipesData,
        isLoading: recipesIsLoading,
        isError: recipesIsError,
        error: recipesError,
    } = useGetRecipesQuery(filters);
    const {
        data: recipeData,
        isLoading: recipeIsLoading,
        isError: recipeIsError,
        error: recipeError,
    } = useGetRecipeQuery(recipeId, {
        skip: !recipeId,
    });
    const [updateStatus] = useUpdateRecipeStatusMutation();
    const [deleteRecipe] = useDeleteRecipeMutation();

    const { activePage, totalPages } = usePaginationInfo(
        recipesData?.meta?.page || ''
    );

    // Handle the loading state
    useEffect(() => {
        if (recipesIsLoading || recipeIsLoading) {
            setLoading(true);
        } else if (!recipesIsLoading || !recipeIsLoading) {
            setLoading(false);
        }
    }, [recipesIsLoading, recipeIsLoading]);

    // Handle applications state using useGetRecipeQuery result
    useEffect(() => {
        if (recipeData?.data?._id) {
            setRecipes([recipeData.data]);
        }
    }, [recipeData?.data, recipeData?.data?._id]);

    // Handle applications state using useGetRecipesQuery result
    useEffect(() => {
        if (!recipeId && recipesData?.data?.length > 0) {
            setRecipes(recipesData?.data);
        }
    }, [recipeId, recipesData?.data]);

    // Handle error state
    useEffect(() => {
        if (recipeIsError || recipesIsError) {
            setError(
                recipeError?.data?.error ||
                    recipesError?.data?.error ||
                    'Something went wrong!'
            );
        }
    }, [recipeError?.data, recipesError?.data, recipeIsError, recipesIsError]);

    // Handle update recipe status
    const updateRecipeStatus = (recipeId, status) => {
        showNotification('promise', 'Updating the recipe status...', {
            promise: updateStatus({ recipeId, status, filters }),
            successMessage: 'Successfully updated the status.',
            errorMessage: 'An error occurred while updating.',
        });
    };

    // Handle delete recipe
    const handleDeleteRecipe = (recipeId) => {
        showNotification('promise', 'Deleting the recipe...', {
            promise: deleteRecipe({ recipeId, filters }),
            successMessage: 'Successfully deleted the status.',
            errorMessage: 'An error occurred while deleting.',
        });
    };

    // ** Decide what to render
    let content;

    if (loading && !error) {
        content = <RoundSpinner className='mt-36 text-Primary' />;
    } else if (!loading && error) {
        content = <Error message={error} />;
    } else if (!loading && !error && recipes?.length === 0) {
        content = <NoContent message='No recipes found.' />;
    } else if (!loading && !error && recipes?.length > 0) {
        content = (
            <section className='w-full min-h-96 ml-5 divide-y-2 overflow-x-scroll md:overflow-x-auto'>
                <div className='w-[58.875rem] lg:w-full p-2 text-sm text-gray-500 grid grid-cols-12 group/parent'>
                    <span className='text-base text-gray-700 col-span-2'>
                        Recipe Id
                    </span>
                    <span className='text-base text-gray-700 truncate ml-3 col-span-2'>
                        Chef Id
                    </span>
                    <span className='ml-5 text-base text-gray-700 truncate col-span-2'>
                        Region
                    </span>
                    <span className='text-base text-gray-700 truncate col-span-2'>
                        Rating
                    </span>
                    <span className='text-base text-gray-700 capitalize truncate col-span-2'>
                        Status
                    </span>
                    <span className='text-base text-gray-700 truncate col-span-2'>
                        Actions
                    </span>
                </div>

                {/* Recipes */}
                {recipes.map((recipe) => (
                    <Recipe
                        key={recipe._id}
                        recipe={recipe}
                        updateRecipeStatus={updateRecipeStatus}
                        handleDeleteRecipe={handleDeleteRecipe}
                    />
                ))}
            </section>
        );
    }

    return (
        <section className='w-full my-5 px-2 md:px-5'>
            <Helmet>
                <title>Recipes | Profile - Mad Chef</title>
            </Helmet>

            <section className='w-full h-9 mb-5 flex items-center justify-between overflow-hidden'>
                <h3
                    className={`w-1/2 h-9 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary col-span-3 ${
                        showSearchBar
                            ? 'translate-x-[-100%] duration-300'
                            : 'translate-x-0 duration-200'
                    }`}
                >
                    Recipes:
                </h3>

                <div className={`w-1/2 flex items-center justify-end`}>
                    {/* Form for smaller devices */}
                    <form
                        className={`relative ${
                            showSearchBar
                                ? 'translate-x-[-3%] duration-300'
                                : 'translate-x-[140%] duration-200'
                        }`}
                    >
                        <input
                            type='text'
                            value={recipeId}
                            onChange={(e) => {
                                setRecipeId(e.target.value);
                                setError('');
                            }}
                            className='w-[18rem] px-2 py-1 bg-slate-200 text-slate-500 font-semibold border-Primary/70 outline-Primary/70 rounded'
                            placeholder='Enter Recipe ID'
                        />
                        <button type='submit'>
                            <IoSearch className='text-2xl absolute right-3 top-1' />
                        </button>
                    </form>

                    {/* Form for larger devices */}
                    <form className='hidden lg:block relative'>
                        <input
                            type='text'
                            value={recipeId}
                            onChange={(e) => {
                                setRecipeId(e.target.value);
                                setError('');
                            }}
                            className='w-[18rem] px-2 py-1 bg-slate-200 text-slate-500 font-semibold border-Primary/70 outline-Primary/70 rounded'
                            placeholder='Enter Recipe ID'
                        />
                        <button type='submit'>
                            <IoSearch className='text-2xl absolute right-3 top-1' />
                        </button>
                    </form>

                    <div className='text-2xl lg:hidden flex items-center justify-center'>
                        <span onClick={() => setShowSearchBar((prev) => !prev)}>
                            {showSearchBar ? <RxCross2 /> : <IoFilter />}
                        </span>
                    </div>
                </div>
            </section>

            {content}

            {!loading && totalPages !== 1 && !recipeId && !error && (
                <Pagination
                    activePage={activePage}
                    totalPages={totalPages}
                    setCurrPage={setCurrPage}
                />
            )}
        </section>
    );
}
