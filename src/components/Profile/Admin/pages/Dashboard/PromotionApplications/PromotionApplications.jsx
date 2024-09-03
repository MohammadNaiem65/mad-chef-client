import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    useGetRolePromotionApplicationQuery,
    useGetRolePromotionApplicationsQuery,
} from '../../../../../../features/role/roleApi';
import { IoFilter, IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import {
    Error,
    NoContent,
    Pagination,
    RoundSpinner,
} from '../../../../../../shared';
import { useEffect } from 'react';
import Application from './Application';
import { usePaginationInfo } from '../../../../../../hooks';

export default function PromotionApplications() {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [applicationId, setApplicationId] = useState('');
    const [promotionApplications, setPromotionApplications] = useState([]);
    const [currPage, setCurrPage] = useState(1);

    const {
        data: application,
        isLoading: isLoadingApplication,
        isError: isErrorApplication,
        error: applicationError,
    } = useGetRolePromotionApplicationQuery(
        {
            applicationId,
        },
        { skip: !applicationId }
    );
    const {
        data: applications,
        isLoading: isLoadingApplications,
        isError: isErrorApplications,
        error: applicationsError,
    } = useGetRolePromotionApplicationsQuery({ page: currPage });

    const { activePage, totalPages } = usePaginationInfo(
        applications?.meta?.page || ''
    );

    // Handle the loading state
    useEffect(() => {
        if (isLoadingApplication || isLoadingApplications) {
            setLoading(true);
        } else if (!isLoadingApplication || !isLoadingApplications) {
            setLoading(false);
        }
    }, [isLoadingApplication, isLoadingApplications]);

    // Handle applications state using useGetRolePromotionApplicationQuery result
    useEffect(() => {
        if (application?.data?._id) {
            setPromotionApplications([application.data]);
        }
    }, [application?.data, application?.data?._id]);

    // Handle applications state using useGetRolePromotionApplicationsQuery result
    useEffect(() => {
        if (!applicationId && applications?.data?.length > 0) {
            setPromotionApplications(applications?.data);
        }
    }, [applicationId, applications?.data]);

    // Handle error state
    useEffect(() => {
        if (isErrorApplication || isErrorApplications) {
            setError(
                applicationError?.data?.error ||
                    applicationsError?.data?.error ||
                    'Something went wrong!'
            );
        }
    }, [
        applicationError?.data,
        applicationsError?.data,
        isErrorApplication,
        isErrorApplications,
    ]);

    // ** Decide what to render
    let content;

    if (loading && !error) {
        content = <RoundSpinner className='mt-36 text-Primary' />;
    } else if (!loading && error) {
        content = <Error message={error} />;
    } else if (!loading && !error && promotionApplications?.length === 0) {
        content = <NoContent message='No role promotion application found.' />;
    } else if (!loading && !error && promotionApplications?.length > 0) {
        content = (
            <section className='w-full min-h-96 ml-5 divide-y-2 overflow-x-scroll md:overflow-x-auto'>
                <div className='w-[58.875rem] lg:w-full p-2 text-sm text-gray-500 grid grid-cols-12 group/parent'>
                    <span className='text-base text-gray-700 col-span-2'>
                        Application Id
                    </span>
                    <span className='text-base text-gray-700 truncate ml-3 col-span-2'>
                        User Id
                    </span>
                    <span className='ml-5 text-base text-gray-700 truncate col-span-2'>
                        Role
                    </span>
                    <span className='text-base text-gray-700 capitalize truncate col-span-2'>
                        Status
                    </span>
                    <span className='text-base text-gray-700 truncate col-span-2'>
                        Applied On
                    </span>
                    <span className='text-base text-gray-700 truncate col-span-2'>
                        Actions
                    </span>
                </div>

                {/* Applications */}
                {promotionApplications.map((application) => (
                    <Application
                        key={application._id}
                        application={application}
                    />
                ))}
            </section>
        );
    }

    return (
        <section className='w-full my-5 px-2 md:px-5'>
            <Helmet>
                <title>Promotion Applications | Profile - Mad Chef</title>
            </Helmet>

            <section className='w-full h-9 mb-5 flex items-center justify-between overflow-hidden'>
                <h3
                    className={`w-1/2 h-9 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary col-span-3 ${
                        showSearchBar
                            ? 'translate-x-[-100%] duration-300'
                            : 'translate-x-0 duration-200'
                    }`}
                >
                    Promotion Applications:
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
                            value={applicationId}
                            onChange={(e) => {
                                setApplicationId(e.target.value);
                                setError('');
                            }}
                            className='w-[18rem] px-2 py-1 bg-slate-200 text-slate-500 font-semibold border-Primary/70 outline-Primary/70 rounded'
                            placeholder='Enter Application ID'
                        />
                        <button type='submit'>
                            <IoSearch className='text-2xl absolute right-3 top-1' />
                        </button>
                    </form>

                    {/* Form for larger devices */}
                    <form className='hidden lg:block relative'>
                        <input
                            type='text'
                            value={applicationId}
                            onChange={(e) => {
                                setApplicationId(e.target.value);
                                setError('');
                            }}
                            className='w-[18rem] px-2 py-1 bg-slate-200 text-slate-500 font-semibold border-Primary/70 outline-Primary/70 rounded'
                            placeholder='Enter Application ID'
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

            {totalPages !== 1 && !applicationId && !error && (
                <Pagination
                    activePage={activePage}
                    totalPages={totalPages}
                    setCurrPage={setCurrPage}
                />
            )}
        </section>
    );
}
