import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa6';
import { GiSpoon } from 'react-icons/gi';
import { perseDate } from '../../../../../helpers';

export default function MyProfile() {
    const {
        name,
        email,
        role,
        bio,
        rating,
        yearsOfExperience,
        createdAt,
        updatedAt,
    } = useSelector((state) => state.user);

    // Perse the date
    const formattedDate = perseDate(updatedAt || createdAt, 'short');

    return (
        <>
            <Helmet>
                <title>My Profile | Profile - Mad Chef</title>
            </Helmet>

            <section className='w-full p-5'>
                <div className='w-full text-lg text-gray-700 font-semibold grid grid-cols-3 md:gap-y-4'>
                    <label htmlFor='name' className='col-span-1'>
                        Name:{' '}
                    </label>
                    <p
                        id='name'
                        className='-mt-1 md:m-0 text-gray-500 text-base col-span-3 md:col-span-2'
                    >
                        {name}
                    </p>
                    <label htmlFor='email' className='mt-3 md:m-0 col-span-1'>
                        Email:
                    </label>
                    <p
                        id='email'
                        className='-mt-1 md:m-0 text-gray-500 text-base col-span-3 md:col-span-2'
                    >
                        {email}
                    </p>
                    <label
                        htmlFor='role'
                        className='mt-3 md:m-0 col-span-2 md:col-span-1'
                    >
                        Role:
                    </label>
                    <p
                        id='role'
                        className='mt-3 md:m-0 text-gray-500 text-base col-span-1 md:col-span-2 capitalize'
                    >
                        {role}
                    </p>
                    <label
                        id='rating'
                        className='mt-3 md:m-0 col-span-2 md:col-span-1'
                    >
                        Rating:
                    </label>
                    <p
                        id='rating'
                        className='w-36 mt-[.84rem] md:m-0 text-gray-500 text-base flex items-center gap-x-2 md:col-span-2'
                    >
                        {rating} <FaStar className='text-lg text-yellow-500' />
                    </p>
                    <label
                        htmlFor='experience'
                        className='mt-3 md:m-0 col-span-2 md:col-span-1'
                    >
                        Experience:
                    </label>
                    <p
                        id='experience'
                        className='mt-3 md:m-0 text-gray-500 text-base flex items-center gap-x-2 col-span-1 md:col-span-2'
                    >
                        {yearsOfExperience}{' '}
                        <GiSpoon className='text-lg text-slate-700' />
                    </p>
                    <label
                        htmlFor='update-date'
                        className='mt-3 md:m-0 col-span-2 md:col-span-1'
                    >
                        Last Updated:
                    </label>
                    <p
                        id='update-date'
                        className='mt-3 md:m-0 text-gray-500 text-base col-span-1 md:col-span-2'
                    >
                        {formattedDate}
                    </p>
                    <label
                        htmlFor='bio'
                        className='mt-3 md:m-0 col-span-2 md:col-span-1'
                    >
                        Bio:
                    </label>
                    <p
                        id='bio'
                        className='mt-3 md:m-0 text-gray-500 text-base col-span-1 md:col-span-2'
                    >
                        {bio}
                    </p>
                </div>
            </section>
        </>
    );
}
