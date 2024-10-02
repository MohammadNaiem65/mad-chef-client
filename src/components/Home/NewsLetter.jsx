import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa6';

import { useSubscribeToNewsletterMutation } from '../../features/newsletter/newsletter';
import { newsletterBgImg } from '../../assets';
import { Error, RoundSpinner } from '../../shared';
import showNotification from '../../helpers/showNotification';

const Newsletter = () => {
    const emailField = useRef(null);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [gotFocused, setGotFocused] = useState(false);
    const { _id: userId } = useSelector((state) => state.user);

    const [
        subscribe,
        {
            isLoading: subscriptionIsLoading,
            isSuccess: subscriptionIsSucc,
            isError: subscriptionIsErr,
            error: subscriptionErr,
        },
    ] = useSubscribeToNewsletterMutation();

    // Handle subscription
    const handleSubscription = (e) => {
        e.preventDefault();
        setError('');

        subscribe({ email, ...(userId ? { userId } : {}) });
    };

    // Handle success state
    useEffect(() => {
        if (subscriptionIsSucc) {
            showNotification(
                'success',
                'Successfully subscribed to newsletter'
            );
        }
    }, [subscriptionIsSucc]);

    // Handle error state
    useEffect(() => {
        if (subscriptionIsErr) {
            showNotification('error', subscriptionErr?.data?.message);
            setError(subscriptionErr?.data?.message);
        }
    }, [subscriptionIsErr, subscriptionErr?.data?.message]);

    return (
        <div
            className='h-[28rem] w-full mt-20 font-Popins flex flex-col justify-center items-center text-center text-slate-500 relative overflow-hidden'
            style={{
                backgroundImage: `url("${newsletterBgImg}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            {/*title */}
            <h1 className='section-title uppercase'>
                Hey you, Sign Up and <br />
                <span className='section-title-span after:w-[112%] mr-2'>
                    CONNECT
                </span>
                to{' '}
                <span className='text-[1.7rem] text-Primary font-semibold font-Popins normal-case'>
                    Mad Chef
                </span>
            </h1>

            <form onSubmit={handleSubscription}>
                <div className='text-lg mt-6 md:flex gap-5'>
                    <div className='w-72 relative'>
                        <label
                            htmlFor='email'
                            onClick={() => setGotFocused(true)}
                            className={`w-fit text-start bg-transparent absolute duration-500 ${
                                gotFocused
                                    ? 'text-sm px-0 py-0 -top-5 left-2'
                                    : ' h-full px-2 py-[.5rem] top-0 left-0'
                            }`}
                        >
                            Enter your email
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            className='w-full h-11 text-gray-500 px-3 py-1 border-2 border-Primary/50 outline-Primary rounded'
                            ref={emailField}
                            onChange={(e) => {
                                setError('');
                                setEmail(e.target.value);
                            }}
                            onFocus={() => setGotFocused(true)}
                            onBlur={() => {
                                if (emailField.current.value === '') {
                                    setGotFocused(false);
                                }
                            }}
                            required
                        />
                    </div>

                    {subscriptionIsLoading ? (
                        <RoundSpinner />
                    ) : subscriptionIsSucc ? (
                        <button
                            className='btn btn-primary mx-auto mt-3 md:mt-0'
                            disabled
                        >
                            Signed Up
                        </button>
                    ) : (
                        <button
                            className='btn btn-primary mx-auto mt-3 md:mt-0'
                            type='submit'
                            disabled={subscriptionIsLoading}
                        >
                            Sign Up
                        </button>
                    )}
                </div>

                {error && <Error message={error} />}

                <div className='flex items-center justify-center mt-2'>
                    {/* condition checkbox */}
                    <input
                        type='checkbox'
                        name='conditions'
                        id='conditions'
                        required
                    />
                    <label htmlFor='conditions' className='ml-1'>
                        Accept Terms and Conditions
                    </label>
                </div>
            </form>

            {/* Social Links */}
            <div className='mt-5'>
                <p>Connect with us:</p>
                <p className='w-fit mx-auto mt-1 flex gap-2 text-xl'>
                    <Link to='#'>
                        <FaFacebook className='text-blue-500 cursor-pointer' />
                    </Link>
                    <Link to='#'>
                        <FaInstagram className='text-orange-600 cursor-pointer' />
                    </Link>
                    <Link to='#'>
                        <FaPinterest className='text-red-700 cursor-pointer' />
                    </Link>
                </p>
            </div>

            <motion.div
                initial={{ left: '-12rem' }}
                whileInView={{ left: '-5rem' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className='shape-bg-one h-64 block md:hidden aspect-square bg-Primary bg-opacity-20 absolute top-[45%] -translate-y-1/2 rotate-45'
            />
            <motion.div
                initial={{ right: '-8rem' }}
                whileInView={{ right: '-5rem' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className='shape-bg-one h-28 block md:hidden aspect-square bg-Primary bg-opacity-20 absolute -bottom-0 -translate-x-1/2 -translate-y-1/2 rotate-[35deg]'
            />
        </div>
    );
};

export default Newsletter;
