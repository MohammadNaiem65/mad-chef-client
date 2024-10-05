import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { updateProfile } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

import { signInWithGoogle, signUpWithPassword } from '../helpers/authHelper';
import { useAuthenticateMutation } from '../features/auth/authApi';
import RoundSpinner from '../shared/RoundSpinner/RoundSpinner';
import {
    formatFirebaseError,
    removeNotifications,
    showNotification,
} from '../helpers';

// Password regex for validation
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [passwordType, setPasswordType] = useState('password');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // RTK Query hooks for authentication
    const [authenticate, { error: authenticationErr }] =
        useAuthenticateMutation();

    // Handler for input changes
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for the field being edited
        setErrors((prev) => ({ ...prev, [name]: '' }));
    }, []);

    // Toggle password visibility
    const togglePasswordVisibility = useCallback(() => {
        setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'));
    }, []);

    // Validate form data
    const validateForm = useCallback(() => {
        const newErrors = {};
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        if (!PWD_REGEX.test(formData.password)) {
            newErrors.password =
                'Password must contain a capital and lowercase letter, a number, a special character and be 8 to 24 characters long.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData.password, formData.confirmPassword]);

    // Handle form submission
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        showNotification('loading', 'Registering your account...');

        try {
            // Sign up user with Firebase
            const { user } = await signUpWithPassword(
                formData.email,
                formData.password
            );

            // Update user profile
            await updateProfile(user, { displayName: formData.name });

            // Get ID token
            const token = await user.getIdToken(true);

            await authenticate({ token }).unwrap();

            removeNotifications();
            navigate('/login');
            showNotification('success', 'Successfully registered');
        } catch (error) {
            setLoading(false);
            removeNotifications();

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
        setLoading(true);
        showNotification('loading', 'Registering your account...');

        try {
            const res = await signInWithGoogle();

            await authenticate({ token: res?.user?.accessToken }).unwrap();

            removeNotifications();
            navigate('/login');
            showNotification('success', 'Successfully registered');
        } catch (error) {
            setLoading(false);
            removeNotifications();

            showNotification(
                'error',
                error?.name === 'FirebaseError'
                    ? formatFirebaseError(error)
                    : error?.data?.message
            );
        }
    }, [authenticate, navigate]);

    // Show error notification
    useEffect(() => {
        if (authenticationErr?.data?.message) {
            showNotification('error', authenticationErr?.data?.message);
        }
    }, [authenticationErr?.data?.message]);

    return (
        <>
            <Helmet>
                <title>Register - Mad Chef</title>
            </Helmet>
            <section className='w-11/12 md:w-4/5 lg:w-1/3 mx-auto my-14 px-1 md:px-10 py-12 md:py-8 text-slate-500 font-Popins bg-gradient-to-bl from-Primary/30 to-Primary/70 relative rounded'>
                <h2 className='text-[2.6rem] text-Primary text-center font-semibold font-Popins'>
                    Register
                </h2>
                <form
                    className='w-10/12 md:w-fit mx-auto mt-6 md:mt-5 md:px-5'
                    onSubmit={handleSubmitForm}
                >
                    {/* Dynamically render form fields */}
                    {['name', 'email', 'password', 'confirmPassword'].map(
                        (field) => (
                            <div key={field} className='mb-4'>
                                <label
                                    htmlFor={field}
                                    className='md:text-xl block mb-1 tracking-wide capitalize'
                                >
                                    {field === 'confirmPassword'
                                        ? 'Confirm Password'
                                        : field}
                                </label>
                                <div className='relative'>
                                    <input
                                        type={
                                            field
                                                .toLocaleLowerCase()
                                                .includes('password')
                                                ? passwordType
                                                : field
                                        }
                                        id={field}
                                        name={field}
                                        placeholder={`Enter your ${
                                            field === 'confirmPassword'
                                                ? 'password again'
                                                : field
                                        }.`}
                                        className={`w-full md:w-[25rem] xl:w-96 px-3 py-1 text-sm md:text-base border-2 border-transparent outline-Primary rounded ${
                                            errors[field] && 'border-red-300'
                                        }`}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                    />
                                    {field
                                        .toLocaleLowerCase()
                                        .includes('password') && (
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
                                {errors[field] && (
                                    <p className='text-red-500 text-sm mt-1'>
                                        {errors[field]}
                                    </p>
                                )}
                            </div>
                        )
                    )}
                    <p className='mt-2 text-sm px-1'>
                        Already have account?{' '}
                        <Link
                            to='/login'
                            className='text-slate-950 hover:text-Primary underline focus:outline-Primary'
                        >
                            Login
                        </Link>{' '}
                        here.
                    </p>

                    {loading ? (
                        <RoundSpinner />
                    ) : (
                        <button
                            className='btn btn-primary block mx-auto mt-5 text-lg cursor-pointer disabled:bg-Primary focus:outline-Primary'
                            type='submit'
                            disabled={loading}
                        >
                            Register
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
