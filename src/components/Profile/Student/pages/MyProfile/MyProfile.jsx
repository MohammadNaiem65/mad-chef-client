import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { PiChefHatFill } from 'react-icons/pi';
import {
    formatFirebaseError,
    perseDate,
    showNotification,
} from '../../../../../helpers';
import { verifyEmailAddress } from '../../../../../helpers/authHelper';
import {
    useApplyForPromotionMutation,
    useCheckApplicationForPromotionQuery,
} from '../../../../../features/role/roleApi';
import { ConfirmationModal, Error, Spinner } from '../../../../../shared';
import { Helmet } from 'react-helmet-async';

export default function MyProfile() {
    const { name, email, emailVerified, role, pkg, createdAt, updatedAt } =
        useSelector((state) => state.user);
    // Perse the date
    const formattedDate = perseDate(updatedAt || createdAt, 'short');

    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        data: hasApplied,
        isLoading: hasAppliedIsLoading,
        isSuccess: hasAppliedIsSucc,
        isError: hasAppliedIsErr,
        error: hasAppliedErr,
    } = useCheckApplicationForPromotionQuery(
        { role: 'chef' },
        { skip: !emailVerified }
    );
    const [
        applyForPromotion,
        {
            isLoading: applyForPromotionIsLoading,
            isSuccess: applyForPromotionIsSucc,
            isError: applyForPromotionIsErr,
            error: applyForPromotionErr,
        },
    ] = useApplyForPromotionMutation();

    // Handle verify email address
    const handleVerifyEmail = async () => {
        try {
            await verifyEmailAddress();
            showNotification(
                'success',
                'Verification email sent successfully!'
            );
        } catch (error) {
            showNotification('error', formatFirebaseError(error));
        }
    };

    // Handle apply to be chef
    const handleApplyToBeChef = () => {
        if (applyForPromotionIsLoading) {
            return;
        }

        showNotification('promise', 'Applying for promotion...', {
            promise: applyForPromotion({ role: 'chef' }),
            successMessage: 'Promotion application successful',
            errorMessage: 'An error occurred while applying for promotion',
        });
    };

    // Handle loading states
    useEffect(() => {
        if (hasAppliedIsLoading || applyForPromotionIsLoading) {
            setIsLoading(true);
        }
    }, [hasAppliedIsLoading, applyForPromotionIsLoading]);

    // Handle success states
    useEffect(() => {
        if (hasAppliedIsSucc) {
            setIsLoading(false);
            setError('');
        } else if (applyForPromotionIsSucc) {
            setIsLoading(false);
            setError('');
        }
    }, [hasAppliedIsSucc, applyForPromotionIsSucc]);

    // Handle error states
    useEffect(() => {
        if (hasAppliedIsErr) {
            setIsLoading(false);
            setError(hasAppliedErr?.data?.msg);
        } else if (applyForPromotionIsErr) {
            setIsLoading(false);
            setError(applyForPromotionErr?.data?.msg);
        }
    }, [
        hasAppliedIsErr,
        hasAppliedErr,
        applyForPromotionIsErr,
        applyForPromotionErr?.data?.msg,
    ]);

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
                        htmlFor='email-status'
                        className='mt-3 md:m-0 col-span-2 md:col-span-1'
                    >
                        Email Verified:
                    </label>
                    <p
                        id='email-status'
                        className='w-36 mt-[.84rem] md:m-0 text-gray-500 text-base flex items-start gap-x-2 md:col-span-2 xl:col-span-2'
                    >
                        {emailVerified ? 'Verified' : 'Not Verified'}{' '}
                        <RiVerifiedBadgeFill
                            className={`mt-1 text-xl ${
                                emailVerified
                                    ? 'text-green-500'
                                    : 'text-gray-500'
                            }`}
                        />
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
                        id='package'
                        className='mt-3 md:m-0 col-span-2 md:col-span-1'
                    >
                        Package:
                    </label>
                    <p
                        id='email-status'
                        className='w-36 mt-[.84rem] md:m-0 text-gray-500 text-base flex items-start gap-x-2 md:col-span-2'
                    >
                        {pkg === 'pro' ? 'Pro' : 'Starter'}{' '}
                        <MdOutlineWorkspacePremium
                            className={`mt-1 text-xl ${
                                emailVerified
                                    ? 'text-yellow-500'
                                    : 'text-gray-500'
                            }`}
                        />
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
                </div>

                {/* Action buttons to verify email and become pro user */}
                <div className='w-full lg:w-2/3 mt-10 flex flex-col md:flex-row items-center justify-end gap-x-4 gap-y-3'>
                    {emailVerified || (
                        <button
                            className='btn border-2 border-green-500 text-green-500 flex items-center gap-x-2 hover:bg-green-500 hover:text-white'
                            onClick={handleVerifyEmail}
                        >
                            Verify Email{' '}
                            <RiVerifiedBadgeFill className='text-2xl' />
                        </button>
                    )}

                    {pkg !== 'pro' && (
                        <Link
                            to='/payment/user/upgrade-to-pro'
                            className='w-fit relative rounded-full overflow-hidden'
                        >
                            <button
                                disabled={emailVerified === false}
                                id='pro-btn'
                                className={`btn peer border-2 border-yellow-500 text-yellow-500 flex items-center gap-x-2 hover:bg-yellow-500 hover:text-white disabled:bg-yellow-700 disabled:border-yellow-700 disabled:hover:text-yellow-500 ${
                                    emailVerified && 'px-10'
                                }`}
                            >
                                Become Pro
                                <MdOutlineWorkspacePremium className='text-2xl' />
                            </button>
                            <label
                                htmlFor='pro-btn'
                                className={`p-1 text-lg text-white opacity-0 bg-yellow-500 absolute -top-10 -left-2 -right-2 rounded duration-300 peer-hover:opacity-100 ${
                                    emailVerified && 'hidden'
                                }`}
                            >
                                First verify Email address
                            </label>
                        </Link>
                    )}

                    {/* Action button to be chef */}
                    {emailVerified && (
                        <div className='relative'>
                            <button
                                onClick={() => setShowModal(true)}
                                className='btn btn-primary flex items-center gap-x-2 disabled:bg-blue-700 peer'
                                disabled={
                                    isLoading ||
                                    hasApplied?.data?.status ||
                                    applyForPromotionIsSucc
                                }
                            >
                                Wanna be Chef{' '}
                                <PiChefHatFill className='text-2xl' />
                            </button>
                            <label
                                htmlFor='pro-btn'
                                className={`p-1 text-lg text-white text-center opacity-0 bg-yellow-500 absolute -top-[4.3rem] -left-2 -right-2 rounded duration-300 peer-hover:opacity-100 ${
                                    hasApplied?.data?.status ||
                                    applyForPromotionIsSucc ||
                                    'hidden'
                                }`}
                            >
                                You have already applied to be Chef
                            </label>
                        </div>
                    )}
                </div>

                {error && <Error message={error} />}

                {isLoading && <Spinner />}

                {showModal && (
                    <ConfirmationModal
                        title='Want to apply to be Chef?'
                        details='All your data as a Student will be DELETED'
                        setIsVisible={setShowModal}
                        onConfirm={handleApplyToBeChef}
                    />
                )}
            </section>
        </>
    );
}
