import { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

import { signInWithGoogle, signInWithPassword } from '../helpers/authHelper';
import { useAuthenticateForTokenMutation } from '../features/auth/authApi';
import RoundSpinner from '../shared/RoundSpinner/RoundSpinner';
import {
    formatFirebaseError,
    removeNotifications,
    showNotification,
} from '../helpers';
import { useWindowSize } from '../hooks';

export default function Login() {
    // State for form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [passwordType, setPasswordType] = useState('password');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { width } = useWindowSize();
    const deviceType = width < 375 && 'extra-sm';

    // Get the path to redirect after successful login
    const from = location.state?.from?.pathname || '/';

    // RTK Query hook for authentication
    const [authenticateForToken] = useAuthenticateForTokenMutation();

    // Handler for input changes
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(''); // Clear error when input changes
    }, []);

    // Toggle password visibility
    const togglePasswordVisibility = useCallback(() => {
        setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'));
    }, []);

    // Handle form submission
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        showNotification('promise', 'Logging in...');

        try {
            const res = await signInWithPassword(
                formData.email,
                formData.password
            );

            await authenticateForToken({
                token: res?.user?.accessToken,
            }).unwrap();

            setLoading(false);
            removeNotifications();
            navigate(from);
            showNotification('success', 'Successfully logged in!');
        } catch (error) {
            setLoading(false);
            removeNotifications();

            setError(
                error?.name === 'FirebaseError'
                    ? formatFirebaseError(error)
                    : error?.data?.message
            );
            showNotification(
                'error',
                error?.name === 'FirebaseError'
                    ? formatFirebaseError(error)
                    : error?.data?.message
            );
        }
    };

    // Handle Google Sign In
    const handleGoogleSignIn = useCallback(async () => {
        setError('');
        setLoading(true);
        showNotification('promise', 'Logging in...');

        try {
            const res = await signInWithGoogle();

            await authenticateForToken({
                token: res?.user?.accessToken,
            }).unwrap();

            removeNotifications();
            navigate(from);
            showNotification('success', 'Successfully logged in!');
        } catch (error) {
            setLoading(false);
            removeNotifications();

            setError(
                error?.name === 'FirebaseError'
                    ? formatFirebaseError(error)
                    : error?.data?.message
            );
            showNotification(
                'error',
                error?.name === 'FirebaseError'
                    ? formatFirebaseError(error)
                    : error?.data?.message
            );
        }
    }, [authenticateForToken, navigate, from]);

    return (
        <>
            <Helmet>
                <title>Login - Mad Chef</title>
            </Helmet>
            <section
                className={`w-11/12 md:w-4/5 lg:w-1/3 mx-auto my-14 px-1 md:px-10 py-8 md:py-8 text-slate-500 font-Popins bg-gradient-to-bl from-Primary/30 to-Primary/70 relative rounded ${
                    deviceType === 'extra-sm' && 'w-full'
                }`}
            >
                <h2 className='text-[2.6rem] text-Primary text-center font-semibold font-Popins'>
                    Login
                </h2>
                <form
                    className={`w-10/12 md:w-fit mx-auto mt-6 md:mt-5 md:px-5 ${
                        deviceType === 'extra-sm' && 'w-11/12'
                    }`}
                    onSubmit={handleSubmitForm}
                >
                    {/* Dynamically render form fields */}
                    {['email', 'password'].map((field) => (
                        <div key={field} className='mb-4'>
                            <label
                                htmlFor={field}
                                className='md:text-xl block mb-1 tracking-wide capitalize'
                            >
                                {field}
                            </label>
                            <div className='relative'>
                                <input
                                    type={
                                        field === 'password'
                                            ? passwordType
                                            : field
                                    }
                                    id={field}
                                    name={field}
                                    placeholder={`Enter your ${field}.`}
                                    className='w-full md:w-[25rem] xl:w-96 px-3 py-1 text-sm md:text-base border-2 border-transparent outline-Primary rounded'
                                    value={formData[field]}
                                    onChange={handleInputChange}
                                    required
                                    disabled={loading}
                                />
                                {field === 'password' && (
                                    <button
                                        type='button'
                                        className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer focus:outline-Primary'
                                        onClick={togglePasswordVisibility}
                                        aria-label={`${
                                            passwordType === 'password'
                                                ? 'Show'
                                                : 'Hide'
                                        } password`}
                                    >
                                        {passwordType === 'password' ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className='pt-2 text-sm flex justify-between items-center'>
                        <Link
                            to='/register'
                            className='text-slate-950 hover:text-Primary underline focus:outline-Primary'
                        >
                            Create Account
                        </Link>

                        <Link
                            to='/forget-password'
                            className='text-slate-950 hover:text-Primary underline focus:outline-Primary shrink-0'
                        >
                            Forget Password
                        </Link>
                    </div>

                    {error && (
                        <p className='mt-3 py-1 bg-red-200/60 text-red-700 text-center rounded'>
                            {error}
                        </p>
                    )}

                    {loading ? (
                        <RoundSpinner />
                    ) : (
                        <button
                            className='btn btn-primary block mx-auto mt-5 text-lg cursor-pointer disabled:bg-Primary focus:outline-Primary'
                            type='submit'
                            disabled={loading}
                        >
                            Login
                        </button>
                    )}

                    <div className='w-full'>
                        <p className='text-xl text-center mt-5 mb-2'>Or</p>
                        <div className='text-4xl flex justify-center gap-x-5'>
                            <FcGoogle
                                className='cursor-pointer focus:outline-Primary focus:shadow-Primary'
                                onClick={
                                    !loading ? handleGoogleSignIn : undefined
                                }
                                role='button'
                                aria-label='Sign in with Google'
                                tabIndex={0}
                            />
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}
