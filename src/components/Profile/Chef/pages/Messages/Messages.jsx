import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Spinner } from '../../../../../shared';
import Conversations from '../../../Conversations';

export default function Messages() {
    useEffect(() => {
        window.scrollTo(0, 130);
    }, []);

    return (
        <>
            <Helmet>
                <title>Messages | Profile - Mad Chef</title>
            </Helmet>

            <section className='w-full min-h-[24.5rem] border-b border-gray-300 flex'>
                {/* Conversations */}
                <Conversations />

                {/* Chat */}
                <section className='flex-grow'>
                    <Suspense fallback={<Spinner />}>
                        <Outlet />
                    </Suspense>
                </section>
            </section>
        </>
    );
}
