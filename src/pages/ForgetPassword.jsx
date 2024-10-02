import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from '../helpers/authHelper';
import { formatFirebaseError, showNotification } from '../helpers';
import { RoundSpinner } from '../shared';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleInputValueChange = (e) => {
        setError('');
        setEmail(e.target.value);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await sendPasswordResetEmail(email);

            setLoading(false);
            showNotification('success', 'Password reset email sent.');

            setTimeout(() => {
                navigate('/login');
            }, 2500);
        } catch (resError) {
            setLoading(false);

            const errorMsg = formatFirebaseError(resError);
            showNotification('error', errorMsg);
            setError(errorMsg);
        }
    };

    return (
        <>
            <Helmet>
                <title>Forget Password - Mad Chef</title>
            </Helmet>
            <section className='w-11/12 md:w-4/5 lg:w-1/3 mx-auto mt-48 md:my-14 px-1 md:px-10 py-12 md:py-8 text-slate-500 font-Popins bg-gradient-to-bl from-Primary/30 to-Primary/70 relative rounded'>
                <h2 className='text-2xl lg:text-[2.6rem] text-Primary text-center font-semibold font-Popins'>
                    Recover Account
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

                    <input
                        id='email'
                        type='email'
                        name='email'
                        placeholder='Enter your email.'
                        className='w-full md:w-[25rem] xl:w-96 px-3 py-1 text-sm md:text-base border-2 border-transparent outline-Primary rounded'
                        value={email}
                        onChange={handleInputValueChange}
                        required
                    />

                    <p className='mt-2 px-1 text-sm text-end'>
                        Back to{' '}
                        <Link
                            to='/login'
                            className='text-slate-950 hover:text-Primary underline focus:outline-Primary'
                        >
                            Login
                        </Link>{' '}
                        page
                    </p>

                    {error && (
                        <p className='mt-3 py-1 bg-red-200/60 text-red-700 text-center rounded'>
                            {error}
                        </p>
                    )}

                    {loading ? (
                        <RoundSpinner />
                    ) : (
                        <button
                            className='btn btn-primary block mx-auto mt-6 text-lg cursor-pointer disabled:bg-Primary focus:outline-Primary'
                            type='submit'
                            disabled={loading}
                        >
                            Login
                        </button>
                    )}
                </form>
            </section>
        </>
    );
}
