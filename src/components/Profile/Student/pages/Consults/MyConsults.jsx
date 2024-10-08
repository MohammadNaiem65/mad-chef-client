import { useState, useEffect } from 'react';
import { useGetConsultsQuery } from '../../../../../features/consult/consultApi';
import { NoContent, Spinner } from '../../../../../shared';
import ConsultCards from './ConsultCards';

export default function MyConsults() {
    const [error, setError] = useState('');

    const {
        data: activeConsultsData,
        isLoading: activeConsultsIsLoading,
        error: activeConsultsErr,
    } = useGetConsultsQuery({
        status: 'accepted,pending',
    });
    const {
        data: consultHistoryData,
        isLoading: consultHistoryIsLoading,
        error: consultHistoryErr,
    } = useGetConsultsQuery({
        status: 'completed,failed,rejected,cancelled',
    });
    const { data: activeConsults } = activeConsultsData || {};
    const { data: consultHistories } = consultHistoryData || {};

    useEffect(() => {
        if (activeConsultsErr?.data?.message) {
            setError(activeConsultsErr?.data?.message);
        }
        if (consultHistoryErr?.data?.message) {
            setError(consultHistoryErr?.data?.message);
        }
    }, [activeConsultsErr?.data?.message, consultHistoryErr?.data?.message]);

    return (
        <section className='pl-5 pt-3'>
            {activeConsultsIsLoading ? (
                <Spinner />
            ) : (
                activeConsults?.length > 0 && (
                    <ConsultCards
                        title='Active Consults'
                        consults={activeConsults}
                    />
                )
            )}
            <section className='mt-10'>
                {consultHistoryIsLoading ? (
                    <Spinner />
                ) : (
                    consultHistories?.length > 0 && (
                        <ConsultCards
                            title='Consult History'
                            consults={consultHistories}
                            error={error}
                        />
                    )
                )}
            </section>

            {!activeConsults?.length && !consultHistories?.length && (
                <section className='mt-32'>
                    <NoContent />
                </section>
            )}
        </section>
    );
}
