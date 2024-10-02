import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');

    const handleSubmitForm = () => {};

    return (
        <>
            <Helmet>
                <title>Forget Password - Mad Chef</title>
            </Helmet>
            <section className='w-11/12 md:w-4/5 lg:w-1/3 mx-auto my-14 px-1 md:px-10 py-12 md:py-8 text-slate-500 font-Popins bg-gradient-to-bl from-Primary/30 to-Primary/70 relative rounded'>
                <h2 className='text-[2.6rem] text-Primary text-center font-semibold font-Popins'>
                    Login
                </h2>
                <form
                    className='w-10/12 md:w-fit mx-auto mt-6 md:mt-5 md:px-5'
                    onSubmit={handleSubmitForm}
                >
                    <label
                        htmlFor='email'
                        className='md:text-xl block mb-1 tracking-wide capitalize'
                    >
                        Email
                    </label>
                    <div className='relative'>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            placeholder='Enter your email.'
                            className='w-full md:w-[25rem] xl:w-96 px-3 py-1 text-sm md:text-base border-2 border-transparent outline-Primary rounded'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex justify-between items-center'>
                        <p className='mt-2 text-sm px-1'>
                            Back to{' '}
                            <Link
                                to='/login'
                                className='text-slate-950 hover:text-Primary underline focus:outline-Primary'
                            >
                                Login
                            </Link>{' '}
                            page
                        </p>

                        <p className='mt-2 text-sm px-1'>
                            <Link
                                to='/forget-password'
                                className='text-slate-950 hover:text-Primary underline focus:outline-Primary'
                            >
                                Forget Password
                            </Link>
                        </p>
                    </div>

                    {/* {error && (
                        <p className='mt-3 py-1 bg-red-200/60 text-red-700 text-center rounded'>
                            {error}
                        </p>
                    )} */}

                    
                </form>
            </section>
        </>
    );
}
