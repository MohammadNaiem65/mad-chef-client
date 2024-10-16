import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa6';
import { perseDate, showNotification } from '../../../../../helpers';
import { useUpdateChefDataMutation } from '../../../../../features/chef/chefApi';
import { Error, RoundSpinner } from '../../../../../shared';

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
    const [showInputField, setShowInputField] = useState(false);
    const [error, setError] = useState('');
    const [formDetails, setFormDetails] = useState({
        name,
        bio,
        yearsOfExperience,
    });

    const [updateChefData, { isLoading, isError, error: updateError }] =
        useUpdateChefDataMutation();

    // Perse the date
    const formattedDate = perseDate(updatedAt || createdAt, 'short');

    const showForm = () => {
        window.scrollTo({
            top: 40,
            behavior: 'smooth',
        });

        setShowInputField(true);
    };

    const handleUpdateData = async () => {
        let isValid = true;

        Object.entries(formDetails).forEach(([, value]) => {
            if (!value) {
                setError('All fields are required');
                isValid = false;
                return;
            }
        });

        if (!isValid) {
            return; // Exit the function if any field is invalid
        }

        showNotification('promise', 'Updating profile...', {
            promise: updateChefData({ data: formDetails }),
            successMessage: 'Successfully updated the profile',
        });
        setShowInputField(false);
    };

    useEffect(() => {
        if (isError) {
            setError(updateError?.data?.message);
        }
    }, [isError, updateError?.data?.message]);

    return (
        <>
            <Helmet>
                <title>My Profile | Profile - Mad Chef</title>
            </Helmet>

            <section className='w-full p-5 relative'>
                <div className='w-full text-lg text-gray-700 font-semibold grid grid-cols-3 gap-y-2 md:gap-y-4'>
                    {/* Name */}
                    <label htmlFor='name' className='col-span-1'>
                        Name:{' '}
                    </label>
                    {showInputField ? (
                        <input
                            id='name'
                            className='col-span-2 w-full md:w-[25rem] xl:w-96 px-2 py-1 text-sm md:text-base border-2 border-Primary outline-Primary rounded'
                            placeholder='Enter your name'
                            value={formDetails.name}
                            onChange={(e) =>
                                setFormDetails((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                        />
                    ) : (
                        <p
                            id='name'
                            className='text-gray-500 text-base col-span-3 md:col-span-2'
                        >
                            {name || 'N/A'}
                        </p>
                    )}

                    {/* Email */}
                    <label htmlFor='email' className='col-span-1'>
                        Email:
                    </label>
                    <p
                        id='email'
                        className='text-gray-500 text-base col-span-3 md:col-span-2'
                    >
                        {email}
                    </p>

                    {/* Role */}
                    <label htmlFor='role' className='col-span-2 md:col-span-1'>
                        Role:
                    </label>
                    <p
                        id='role'
                        className='text-gray-500 text-base col-span-1 md:col-span-2 capitalize'
                    >
                        {role}
                    </p>

                    {/* Rating */}
                    <label id='rating' className='col-span-2 md:col-span-1'>
                        Rating:
                    </label>
                    <p
                        id='rating'
                        className='w-36 text-gray-500 text-base flex items-center gap-x-2 md:col-span-2'
                    >
                        {rating || 'N/A'}{' '}
                        <FaStar className='text-lg text-yellow-500' />
                    </p>

                    {/* Experience */}
                    <label
                        htmlFor='experience'
                        className={`md:col-span-1 ${
                            showInputField ? 'col-span-1' : 'col-span-2'
                        }`}
                    >
                        Experience:
                    </label>
                    {showInputField ? (
                        <input
                            id='experience'
                            className='col-span-2 w-full md:w-[25rem] xl:w-96 px-2 py-1 text-sm md:text-base border-2 border-Primary outline-Primary rounded'
                            placeholder='Enter your experience'
                            value={formDetails.yearsOfExperience}
                            onChange={(e) =>
                                setFormDetails((prev) => ({
                                    ...prev,
                                    yearsOfExperience: e.target.value,
                                }))
                            }
                        />
                    ) : (
                        <p
                            id='experience'
                            className='text-gray-500 text-base flex items-center gap-x-2 col-span-1 md:col-span-2'
                        >
                            {yearsOfExperience ? (
                                <>
                                    {yearsOfExperience}
                                    {' Years'}
                                </>
                            ) : (
                                'N/A'
                            )}
                        </p>
                    )}

                    {/* Last Updated */}
                    <label
                        htmlFor='update-date'
                        className='col-span-2 md:col-span-1'
                    >
                        Last Updated:
                    </label>
                    <p
                        id='update-date'
                        className='text-gray-500 text-base col-span-1 md:col-span-2'
                    >
                        {formattedDate}
                    </p>

                    {/* Bio */}
                    <label
                        htmlFor='bio'
                        className={`md:col-span-1 ${
                            showInputField ? 'col-span-1' : 'col-span-2'
                        }`}
                    >
                        Bio:
                    </label>
                    {showInputField ? (
                        <textarea
                            id='bio'
                            rows='5'
                            className='col-span-2 w-full md:w-[25rem] xl:w-96 px-2 py-1 text-sm md:text-base border-2 border-Primary outline-Primary rounded'
                            placeholder='Enter your biodata'
                            value={formDetails.bio}
                            onChange={(e) =>
                                setFormDetails((prev) => ({
                                    ...prev,
                                    bio: e.target.value,
                                }))
                            }
                        />
                    ) : (
                        <p
                            id='bio'
                            className='text-gray-500 text-base col-span-1 md:col-span-2 self-end'
                        >
                            {bio || 'N/A'}
                        </p>
                    )}
                </div>

                {isLoading && (
                    <RoundSpinner className='text-Primary absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2' />
                )}

                {error && (
                    <Error
                        message={error}
                        className='w-fit mx-auto capitalize'
                    />
                )}

                {showInputField ? (
                    <div className='w-fit ml-auto md:mx-auto mt-5 '>
                        <button
                            onClick={handleUpdateData}
                            className='px-7 py-1 border-2 border-Primary hover:border-Primary/50 font-semibold text-Primary hover:text-white hover:bg-Primary/50 rounded duration-300'
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setShowInputField(false)}
                            className='ml-3 px-6 py-1 border-2 border-red-500 font-semibold text-red-500 hover:text-white hover:bg-red-500 rounded duration-300'
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={showForm}
                        className='ml-auto md:mx-auto mr-2 mt-5 px-2 py-1 border-2 border-Primary hover:border-Primary/50 block font-semibold text-Primary hover:text-white hover:bg-Primary/50 rounded duration-300'
                    >
                        Update Profile
                    </button>
                )}
            </section>
        </>
    );
}
