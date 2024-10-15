import { useCallback, useState } from 'react';
import { FaBriefcase, FaStar } from 'react-icons/fa6';
import {
    HiClipboardDocumentCheck,
    HiOutlineClipboardDocument,
} from 'react-icons/hi2';
import { MdFastfood } from 'react-icons/md';

export default function Banner({ chefData }) {
    const {
        name,
        img,
        email,
        bio,
        rating,
        recipes,
        yearsOfExperience,
        createdAt,
    } = chefData;
    const [copyEmail, setCopyEmail] = useState(false);

    // Handle copying chef ID
    const handleCopyEmail = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopyEmail(true);
            setTimeout(() => setCopyEmail(false), 2000);
        } catch (error) {
            console.error('Failed to copy ID:', error);
        }
    }, [email]);

    return (
        <section className='col-span-4 lg:col-span-3 p-6 bg-Primary/20 text-gray-400 font-Popins md:flex items-center gap-x-5 rounded'>
            <img
                className='size-52 mx-auto p-[1px] border-2 border-Primary/70 rounded-full object-cover flex-shrink-0'
                src={img}
                alt='Chef picture'
            />

            <section className='h-fit mt-1 my-auto text-justify grow'>
                <div className='mx-auto w-fit md:w-full flex items-center gap-x-2'>
                    <h2 className='text-2xl text-black text-center md:text-start lg:text-start font-Vollkorn font-semibold'>
                        {name}
                    </h2>
                    <span className='size-1 bg-black rounded-full' />
                    <h2 className='text-xl text-center md:text-start capitalize text-slate-800'>
                        Chef
                    </h2>
                </div>

                <div className='mb-2 lg:flex justify-between items-center'>
                    {/* Email and Joined */}
                    <div className='text-center md:text-start'>
                        <p className='w-fit md:w-full mx-auto flex items-center'>
                            <span className='mr-1 text-slate-700'>Email:</span>{' '}
                            <span className='lg:w-52 truncate mr-2'>
                                {email}
                            </span>
                            {copyEmail ? (
                                <HiClipboardDocumentCheck className='text-xl text-Primary cursor-pointer' />
                            ) : (
                                <HiOutlineClipboardDocument
                                    className='text-xl text-slate-700 cursor-pointer'
                                    onClick={handleCopyEmail}
                                />
                            )}
                        </p>
                        <p>
                            <span className='text-slate-700'>Joined:</span>{' '}
                            {new Date(createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </p>
                    </div>

                    {/* Rating, Experience and Recipes */}
                    <div className='mt-2 lg:mt-0 px-6 md:px-8 lg:px-5 py-3 bg-gray-50 flex justify-between gap-x-3 divide-x-2 divide-gray-400 rounded-xl'>
                        <div className='flex items-center gap-x-2'>
                            <FaStar className='mr-1 text-xl' />
                            <p title='Rating' className='flex flex-col'>
                                <span className='text-2xl text-slate-900 leading-5'>
                                    {rating ? rating : 'Null'}
                                </span>
                                {rating && <span>Stars</span>}
                            </p>
                        </div>

                        <div className='pl-7 md:pl-10 lg:pl-2 flex items-center gap-x-0 md:gap-x-2'>
                            <FaBriefcase className='mr-1 text-xl' />
                            <p title='Experience' className='flex flex-col'>
                                <span className='text-2xl text-slate-900 leading-5'>
                                    {yearsOfExperience
                                        ? yearsOfExperience
                                        : 'Null'}
                                </span>
                                {yearsOfExperience && <span>Years</span>}
                            </p>
                        </div>

                        <div className='pl-7 md:pl-10 lg:pl-2 flex items-center gap-x-0 md:gap-x-2'>
                            <MdFastfood className='mr-1 text-xl' />
                            <p title='Recipes' className='flex flex-col'>
                                <span className='text-2xl text-slate-900 leading-5'>
                                    {recipes?.length ? recipes?.length : 0}
                                </span>
                                <span>Recipe</span>
                            </p>
                        </div>
                    </div>
                </div>

                {bio && <p className='text-justify'>{bio}</p>}
            </section>
        </section>
    );
}
