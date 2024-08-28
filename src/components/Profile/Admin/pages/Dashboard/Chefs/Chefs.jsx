import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { IoFilter, IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import {
    useGetChefQuery,
    useGetChefsQuery,
} from '../../../../../../features/chef/chefApi';
import { useEffect } from 'react';
import {
    Error,
    NoContent,
    Pagination,
    RoundSpinner,
} from '../../../../../../shared';
import Chef from './Chef';
import usePaginationInfo from '../../../../../../hooks/usePaginationInfo';

export default function Chefs() {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [chefId, setChefId] = useState('');
    const [chefs, setChefs] = useState([]);
    const [currPage, setCurrPage] = useState(1);

    const {
        data: chefData,
        isLoading: isLoadingChefData,
        isError: isErrorChefData,
        error: errorChefData,
    } = useGetChefQuery(
        { chef_id: chefId, include: '_id,name,email,emailVerified,recipes' },
        {
            skip: !chefId,
        }
    );
    const {
        data: chefsData,
        isLoading: isLoadingChefsData,
        isError: isErrorChefsData,
        error: errorChefsData,
    } = useGetChefsQuery(
        { page: currPage, include: '_id,name,email,emailVerified,recipes' },
        { skip: chefId }
    );

    // Handle the loading state
    useEffect(() => {
        if (isLoadingChefData || isLoadingChefsData) {
            setLoading(true);
        } else if (!isLoadingChefData || !isLoadingChefsData) {
            setLoading(false);
        }
    }, [isLoadingChefData, isLoadingChefsData]);

    // Set the chefs array using the data from useGetChefsQuery
    useEffect(() => {
        if (chefsData?.data?.length > 0 && !chefId) {
            setChefs(chefsData?.data);
        }
    }, [chefId, chefsData?.data]);

    // Set the chefs array using the data from useGetChefQuery
    useEffect(() => {
        if (chefData?.data?._id) {
            setChefs([chefData?.data]);
        } else if (chefId && !chefData?.data?._id) {
            setChefs([chefData?.data]);
        }
    }, [chefId, chefData?.data]);

    // Handle the error state
    useEffect(() => {
        if (isErrorChefData || isErrorChefsData) {
            if (isErrorChefData) {
                setError(
                    errorChefData?.data?.error ||
                        'An error occurred while fetching the chef data.'
                );
            } else if (isErrorChefsData) {
                setError(
                    errorChefsData?.data?.error ||
                        'An error occurred while fetching the chefs data.'
                );
            }
        }
    }, [
        isErrorChefData,
        isErrorChefsData,
        errorChefData?.data?.error,
        errorChefsData?.data?.error,
    ]);

    const { activePage, totalPages } = usePaginationInfo(
        chefsData?.meta?.page || ''
    );

    // ** Decide what to render
    let content;

    if (loading && !error) {
        content = <RoundSpinner className='mt-36 text-Primary' />;
    } else if (!loading && error) {
        content = <Error message={error} />;
    } else if (!loading && chefs?.length === 0) {
        content = <NoContent message='No chefs data found.' />;
    } else if (!loading && chefs?.length > 0) {
        content = (
            <section className='w-full min-h-96 ml-5 divide-y-2 overflow-x-scroll md:overflow-x-auto'>
                <div className='w-[58.875rem] lg:w-full p-2 text-sm text-gray-500 grid grid-cols-12 group/parent'>
                    <span className='text-base text-gray-700 col-span-2'>
                        Chef Id
                    </span>
                    <span className='text-base text-gray-700 truncate ml-3 col-span-2'>
                        Chef Name
                    </span>
                    <span className='text-base text-gray-700 truncate col-span-3'>
                        Email
                    </span>
                    <span className='text-base text-gray-700 capitalize truncate col-span-2'>
                        Email Verified
                    </span>
                    <span className='text-base text-gray-700 col-span-3 truncate group-hover/parent:col-span-2'>
                        Total Recipes
                    </span>
                </div>

                {/* Chefs */}
                {chefs.map((chef) => (
                    <Chef key={chef._id} chef={chef} />
                ))}
            </section>
        );
    }

    return (
        <section className='w-full my-5 px-2 md:px-5'>
            <Helmet>
                <title>Chefs | Profile - Mad Chef</title>
            </Helmet>

            <section className='w-full h-9 mb-5 flex items-center justify-between overflow-hidden'>
                <h3
                    className={`w-1/2 h-9 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary col-span-3 ${
                        showSearchBar
                            ? 'translate-x-[-100%] duration-300'
                            : 'translate-x-0 duration-200'
                    }`}
                >
                    Chefs:
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
                            value={chefId}
                            onChange={(e) => setChefId(e.target.value)}
                            className='w-[18rem] px-2 py-1 bg-slate-200 text-slate-500 font-semibold border-Primary/70 outline-Primary/70 rounded'
                            placeholder='Enter Chef ID'
                        />
                        <button type='submit'>
                            <IoSearch className='text-2xl absolute right-3 top-1' />
                        </button>
                    </form>

                    {/* Form for larger devices */}
                    <form className='hidden lg:block relative'>
                        <input
                            type='text'
                            value={chefId}
                            onChange={(e) => setChefId(e.target.value)}
                            className='w-[18rem] px-2 py-1 bg-slate-200 text-slate-500 font-semibold border-Primary/70 outline-Primary/70 rounded'
                            placeholder='Enter Chef ID'
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

            {totalPages !== 1 && !chefId && (
                <Pagination
                    activePage={activePage}
                    totalPages={totalPages}
                    setCurrPage={setCurrPage}
                />
            )}
        </section>
    );
}
