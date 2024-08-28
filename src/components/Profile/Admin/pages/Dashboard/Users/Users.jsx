import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { RxCross2 } from 'react-icons/rx';
import { IoFilter, IoSearch } from 'react-icons/io5';
import {
    useGetUserDataQuery,
    useGetUsersDataQuery,
} from '../../../../../../features/user/userApi';
import {
    Error,
    NoContent,
    Pagination,
    RoundSpinner,
} from '../../../../../../shared';
import User from './User';
import { usePaginationInfo } from '../../../../../../hooks';
import { showNotification } from '../../../../../../helpers';

export default function Users() {
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currPage, setCurrPage] = useState(1);
    const [showSearchBar, setShowSearchBar] = useState(false);

    const {
        data: userData,
        isLoading: isLoadingUserData,
        isError: isErrorUserData,
        error: errorUserData,
    } = useGetUserDataQuery(
        { userId },
        {
            skip: !userId,
        }
    );
    const {
        data: usersData,
        isLoading: isLoadingUsersData,
        isError: isErrorUsersData,
        error: errorUsersData,
    } = useGetUsersDataQuery({ page: currPage }, { skip: userId });
    const { data, meta } = usersData || {};

    // Set the users array using the data from useGetUsersDataQuery
    useEffect(() => {
        if (data?.length > 0 && !userId) {
            setUsers(data);
        }
    }, [data, userId]);

    // Set the users array using the data from useGetUserDataQuery
    useEffect(() => {
        if (userData?.data?._id) {
            setUsers([userData?.data]);
        }
    }, [userData?.data]);

    const { activePage, totalPages } = usePaginationInfo(meta?.page || '');

    // Handle the loading state
    useEffect(() => {
        if (isLoadingUserData || isLoadingUsersData) {
            setLoading(true);
        } else if (!isLoadingUserData || isLoadingUsersData) {
            setLoading(false);
        }
    }, [isLoadingUserData, isLoadingUsersData]);

    // Handle the error state
    useEffect(() => {
        if (isErrorUserData || isErrorUsersData) {
            if (isErrorUserData) {
                setError(
                    errorUserData?.data?.error ||
                        'An error occurred while fetching the user data.'
                );

                showNotification(
                    'error',
                    errorUserData?.data?.error ||
                        'An error occurred while fetching the user data.'
                );
            } else if (isErrorUsersData) {
                setError(
                    errorUsersData?.data?.error ||
                        'An error occurred while fetching the user data.'
                );

                showNotification(
                    'error',
                    errorUsersData?.data?.error ||
                        'An error occurred while fetching the user data.'
                );
            }
        }
    }, [
        isErrorUserData,
        isErrorUsersData,
        errorUserData?.data?.error,
        errorUsersData?.data?.error,
    ]);

    // Decide what to render
    let content;
    if (loading) {
        content = <RoundSpinner className='text-Primary' />;
    } else if (!loading && error) {
        content = <Error message={error} />;
    } else if (!loading && users?.length === 0) {
        content = <NoContent message='No users data found.' />;
    } else if (!loading && users?.length > 0) {
        content = (
            <section className='w-full min-h-96 ml-5 divide-y-2 overflow-x-scroll md:overflow-x-auto'>
                <div className='w-[58.875rem] lg:w-full p-2 text-sm text-gray-500 grid grid-cols-12 group/parent'>
                    <span className='text-base text-gray-700 col-span-2'>
                        UserId
                    </span>
                    <span className='text-base text-gray-700 truncate ml-3 col-span-2'>
                        Username
                    </span>
                    <span className='text-base text-gray-700 truncate col-span-3'>
                        Email
                    </span>
                    <span className='text-base text-gray-700 capitalize truncate col-span-2'>
                        Email Verified
                    </span>
                    <span className='text-base text-gray-700 col-span-3 truncate group-hover/parent:col-span-2'>
                        Package
                    </span>
                </div>

                {/* Users */}
                {users.map((user) => (
                    <User key={user._id} user={user} />
                ))}
            </section>
        );
    }

    return (
        <section className='w-full my-5 px-2 md:px-5'>
            <Helmet>
                <title>Users | Profile - Mad Chef</title>
            </Helmet>

            <section className='w-full h-9 mb-5 flex items-center justify-between overflow-hidden'>
                <h3
                    className={`w-1/2 h-9 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary col-span-3 ${
                        showSearchBar
                            ? 'translate-x-[-100%] duration-300'
                            : 'translate-x-0 duration-200'
                    }`}
                >
                    Users:
                </h3>

                <div className={`w-1/2 flex items-center justify-end`}>
                    <form
                        className={`relative ${
                            showSearchBar
                                ? 'translate-x-[-3%] duration-300'
                                : 'translate-x-[140%] duration-200'
                        }`}
                    >
                        <input
                            type='text'
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className='w-[18rem] px-2 py-1 bg-slate-200 text-slate-500 font-semibold border-Primary/70 outline-Primary/70 rounded'
                            placeholder='Enter User ID'
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

            {currPage && !userId && (
                <Pagination
                    activePage={activePage}
                    totalPages={totalPages}
                    setCurrPage={setCurrPage}
                />
            )}
        </section>
    );
}
