import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import useWindowSize from '../../../hooks/useWindowSize';

// Lazy load the RightSideContainer for better performance on larger screens
const RightSideContainer = lazy(() => import('./RightSideContainer'));

export default function Banner() {
    const { width } = useWindowSize();

    return (
        <section className='gradient-bg w-full lg:w-10/12 h-96 my-10 lg:mx-auto flex justify-center md:justify-evenly rounded shadow-lg overflow-hidden relative z-10'>
            {/* Left Side blobs */}
            <Blob className='h-64 shape-bg-one bg-Primary bg-opacity-20 absolute top-24 -left-32 rotate-45' />
            <Blob className='h-64 shape-bg-one bg-Primary bg-opacity-20 absolute top-28 -left-32 rotate-45' />
            <Blob className='shape-bg-two h-32 bg-Primary bg-opacity-10 hidden md:block absolute left-32 -top-12 rotate-45' />
            <Blob className='shape-bg-two h-32 bg-Primary bg-opacity-10 hidden md:block absolute left-32 -top-10 rotate-45' />

            {/* Left Container */}
            <div className='h-full flex flex-col justify-center items-center'>
                {/* Center blobs */}
                <Blob className='h-64 hidden lg:block shape-bg-one bg-Primary bg-opacity-20 absolute top-24 right-48 rotate-45' />
                <Blob className='h-64 hidden lg:block shape-bg-one bg-Primary bg-opacity-20 absolute top-24 right-52 rotate-[35deg]' />

                <div className='w-4/5 lg:w-3/5 mx-auto lg:ml-36'>
                    <h2 className='text-[2.6rem] text-Primary font-semibold font-Popins relative z-10'>
                        Mad Chef
                    </h2>
                    <p className='font-Popins text-slate-500'>
                        Discover Delicious and Healthy Dishes to Delight and
                        Satisfy Your Family&apos;s Plates
                    </p>
                    <Link
                        to='/recipes'
                        className='btn btn-primary inline-block mt-4'
                    >
                        Explore
                    </Link>
                </div>
            </div>

            {/* Right side blobs */}
            <Blob className='h-32 shape-bg-two bg-Primary bg-opacity-10 absolute right-0 md:right-40 lg:right-1/2 -bottom-10 lg:-bottom-16 rotate-45' />
            <Blob className='h-20 shape-bg-two bg-Primary bg-opacity-20 absolute -right-10 -top-3 rotate-45' />

            {/* Right Container */}
            {width >= 768 && (
                <div className='w-1/2 hidden lg:mr-10 md:flex justify-center items-center relative'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <RightSideContainer />
                    </Suspense>
                </div>
            )}
        </section>
    );
}

// Blob component to reduce repetition
const Blob = ({ className }) => (
    <div className={`aspect-square ${className}`} />
);
