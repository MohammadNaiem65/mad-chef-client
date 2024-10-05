import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    MdError,
    MdErrorOutline,
    MdFactCheck,
    MdOutlineFactCheck,
    MdOutlinePending,
    MdPending,
} from 'react-icons/md';
import { PiCardholderFill, PiCardholderLight } from 'react-icons/pi';
import { useGetConsultsQuery } from '../../../../../features/consult/consultApi';
import ConsultCards from './ConsultCards';

// Consult card filter options
const CARD_FILTERS = {
    ACCEPTED: 'accepted',
    PENDING: 'pending',
    SUCCEEDED: 'completed',
    FAILED: 'failed,rejected,cancelled',
};

export default function Consults() {
    const [filter, setFilter] = useState({
        curr: CARD_FILTERS.ACCEPTED,
        prev: null,
    });

    const { data, isLoading, error } = useGetConsultsQuery({
        status: filter.curr,
    });
    const consults = data?.data || [];

    // Handle filter changes of consults
    const handleSetFilter = (status) => {
        if (status !== filter.curr) {
            setFilter((prev) => ({
                curr: status,
                prev: prev.curr,
            }));
        }
    };

    return (
        <>
            <Helmet>
                <title>Consults | Profile - Mad Chef</title>
            </Helmet>

            <section className='w-full'>
                {/* Navbar for payment history page content */}
                <nav className='w-[90%] mb-10 text-lg flex items-center divide-x-2 overflow-x-scroll md:overflow-x-auto'>
                    <button
                        className={`w-52 px-[3.25rem] py-2 flex justify-center items-center gap-x-3 hover:bg-Primary/10 ${
                            filter.curr === CARD_FILTERS.ACCEPTED &&
                            'text-Primary'
                        }`}
                        onClick={() => handleSetFilter(CARD_FILTERS.ACCEPTED)}
                    >
                        {filter.curr === CARD_FILTERS.ACCEPTED ? (
                            <PiCardholderFill className='text-2xl' />
                        ) : (
                            <PiCardholderLight className='text-2xl' />
                        )}
                        Accepted
                    </button>
                    <button
                        className={`px-[3.25rem] py-2 flex justify-center items-center gap-x-3 hover:bg-Primary/10 ${
                            filter.curr === CARD_FILTERS.PENDING &&
                            'text-Primary'
                        }`}
                        onClick={() => handleSetFilter(CARD_FILTERS.PENDING)}
                    >
                        {filter.curr === CARD_FILTERS.PENDING ? (
                            <MdPending className='text-xl' />
                        ) : (
                            <MdOutlinePending className='text-xl' />
                        )}
                        Pending
                    </button>
                    <button
                        className={`px-[3.25rem] py-2 flex justify-center items-center gap-x-3 hover:bg-Primary/10 ${
                            filter.curr === CARD_FILTERS.SUCCEEDED &&
                            'text-Primary'
                        }`}
                        onClick={() => handleSetFilter(CARD_FILTERS.SUCCEEDED)}
                    >
                        {filter.curr === CARD_FILTERS.SUCCEEDED ? (
                            <MdFactCheck className='text-xl' />
                        ) : (
                            <MdOutlineFactCheck className='text-xl' />
                        )}
                        Succeeded
                    </button>
                    <button
                        className={`w-52 px-[3.25rem] py-2 flex justify-center items-center gap-x-3 hover:bg-Primary/10 ${
                            filter.curr === CARD_FILTERS.FAILED &&
                            'text-Primary'
                        }`}
                        onClick={() => handleSetFilter(CARD_FILTERS.FAILED)}
                    >
                        {filter.curr === CARD_FILTERS.FAILED ? (
                            <MdError className='text-2xl' />
                        ) : (
                            <MdErrorOutline className='text-2xl' />
                        )}
                        Failed
                    </button>
                </nav>

                <section className='p-5 z-0'>
                    <ConsultCards
                        isLoading={isLoading}
                        error={error?.data?.message}
                        consults={consults}
                    />
                </section>
            </section>
        </>
    );
}
