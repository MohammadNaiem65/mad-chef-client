import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    MdOutlineFactCheck,
    MdFactCheck,
    MdErrorOutline,
    MdError,
} from 'react-icons/md';
import { PiCardholderLight, PiCardholderFill } from 'react-icons/pi';

import { useGetPaymentReceiptsQuery } from '../../../../../features/payment/paymentApi';
import { usePaginationInfo } from '../../../../../hooks';
import { NoContent, Pagination } from '../../../../../shared';
import Payment from './Payment';

export default function Payments() {
    const [filter, setFilter] = useState({ curr: 'all', prev: null });
    const [currPage, setCurrPage] = useState(1);

    const { data, isLoading, isSuccess, isError, error } =
        useGetPaymentReceiptsQuery({
            filter: filter.curr,
            page: currPage,
        });
    const { data: receipts, meta } = data || {};
    const { activePage, totalPages } = usePaginationInfo(meta?.page);

    const handleSetFilter = (status) => {
        setCurrPage(1)
        if (status !== filter.curr) {
            setFilter((prev) => ({ curr: status, prev: prev.curr }));
        }
    };

    // Decide what to render
    let content;

    if (!isLoading && isError && !isSuccess) {
        content = (
            <div className='w-full mt-32 flex justify-center'>
                <p className='w-fit h-fit p-2 bg-red-300 text-red-700 rounded-sm'>
                    {error?.message}
                </p>
            </div>
        );
    } else if (!isLoading && isSuccess && !isError && receipts?.length === 0) {
        content = (
            <div className='mt-32'>
                <NoContent />
            </div>
        );
    } else if (!isLoading && isSuccess && !isError && receipts.length > 0) {
        content = (
            <section className='w-[90%] ml-5 divide-y-2 overflow-x-scroll md:overflow-x-auto'>
                <div className='w-[58.875rem] lg:w-full p-2 text-sm text-gray-500 grid grid-cols-12 group/parent'>
                    <span className='text-base text-gray-700 col-span-2'>
                        Amount
                    </span>
                    <span className='text-base text-gray-700 truncate ml-3 col-span-2'>
                        Username
                    </span>
                    <span className='text-base text-gray-700 truncate col-span-3'>
                        Email
                    </span>
                    <span className='text-base text-gray-700 capitalize truncate col-span-2'>
                        Package Name
                    </span>
                    <span className='text-base text-gray-700 col-span-3 truncate group-hover/parent:col-span-2'>
                        Date
                    </span>
                </div>

                {/* Receipts */}
                {receipts.map((payment, index) => (
                    <Payment key={index} payment={payment} />
                ))}
            </section>
        );
    }

    return (
        <>
            <Helmet>
                <title>Payment History | Profile - Mad Chef</title>
            </Helmet>

            <section className='w-full'>
                {/* Navbar for payment history page content */}
                <nav className='w-[90%] mb-10 text-lg flex items-center divide-x-2 overflow-x-scroll md:overflow-x-auto'>
                    <button
                        className={`px-[3.25rem] py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
                            filter.curr === 'all' && 'text-Primary'
                        }`}
                        onClick={() => handleSetFilter('all')}
                    >
                        {filter.curr === 'all' ? (
                            <PiCardholderFill className='text-2xl' />
                        ) : (
                            <PiCardholderLight className='text-2xl' />
                        )}
                        All
                    </button>
                    <button
                        className={`px-6 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
                            filter.curr === 'succeeded' && 'text-Primary'
                        }`}
                        onClick={() => handleSetFilter('succeeded')}
                    >
                        {filter.curr === 'succeeded' ? (
                            <MdFactCheck className='text-xl' />
                        ) : (
                            <MdOutlineFactCheck className='text-xl' />
                        )}
                        Succeeded
                    </button>
                    <button
                        className={`px-8 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
                            filter.curr === 'failed' && 'text-Primary'
                        }`}
                        onClick={() => handleSetFilter('failed')}
                    >
                        {filter.curr === 'failed' ? (
                            <MdError className='text-2xl' />
                        ) : (
                            <MdErrorOutline className='text-2xl' />
                        )}
                        Failed
                    </button>
                </nav>

                <div className='px-2 py-2 flex justify-between items-center'>
                    <h3 className='w-2/3 md:w-1/2 md:ml-4 md:mb-4 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
                        My Transactions:
                    </h3>
                </div>

                {content}

                {/* Pagination */}
                {!isLoading && !isError && totalPages > 1 && (
                    <Pagination
                        activePage={activePage}
                        totalPages={totalPages}
                        setCurrPage={setCurrPage}
                    />
                )}
            </section>
        </>
    );
}
