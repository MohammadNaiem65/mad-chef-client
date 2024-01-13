// external imports
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

// internal imports
import { signInWithGoogle, signUpWithPassword } from '../helpers/authHelper';
import {
	useAuthenticateMutation,
	useAuthenticateForTokenMutation,
} from '../features/auth/authApi';
import { updateProfile } from 'firebase/auth';
import RoundSpinner from '../shared/RoundSpinner/RoundSpinner';
import showNotification from '../helpers/showNotification';
import removeNotifications from '../helpers/removeNotifications';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
	// local states
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [passwordType, setPasswordType] = useState(true);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState('');

	// hooks
	const navigate = useNavigate();
	const [authenticate, { isLoading, isSuccess, isError, error }] =
		useAuthenticateMutation();
	const [
		authenticateForToken,
		{
			isLoading: providerAuthLoading,
			isSuccess: providerAuthSuccess,
			isError: providerAuthIsError,
			error: providerError,
		},
	] = useAuthenticateForTokenMutation();

	// if any fields value changes - remove the error
	useEffect(() => {
		setErr('');
	}, [formData.email, formData.password, formData.confirmPassword]);

	// handle loading state
	useEffect(() => {
		removeNotifications();
		if (!isLoading) {
			setLoading(false);
		} else if (!providerAuthLoading) {
			setLoading(false);
		}
	}, [isLoading, providerAuthLoading]);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
		} else if (providerAuthLoading) {
			showNotification('loading', 'Almost done...');
			setLoading(true);
		}
	}, [isLoading, providerAuthLoading]);

	// set error if any error received from the server
	useEffect(() => {
		// stop the loader
		setLoading(false);

		if (isError || providerAuthIsError) {
			setErr(error?.data ? error.data : providerError.data);
			showNotification('error', err);
		}
	}, [isError, error, providerAuthIsError, providerError, err]);

	// navigate the user to the proper page after authentication
	useEffect(() => {
		// stop the loader and notify
		setLoading(false);

		if (isSuccess) {
			navigate('/login');
			showNotification('success', 'Successfully registered!');
		} else if (providerAuthSuccess) {
			navigate('/');
			showNotification('success', 'Successfully logged in');
		}
	}, [navigate, isSuccess, providerAuthSuccess]);

	// handle email registration
	const handleSubmitForm = async (e) => {
		e.preventDefault();

		// set loading state and show loading notification
		showNotification('loading', 'Validating your credentials...');
		setLoading(true);

		// check if password and confirm password matched
		if (formData.password !== formData.confirmPassword) {
			removeNotifications();
			showNotification('error', 'Password does not match.');
			return setErr('Password does not match.');
		}
		// validate password
		else if (!PWD_REGEX.test(formData.password)) {
			removeNotifications();
			showNotification('error', 'Check the error message');
			return setErr(
				'Password must contain a capital and smaller latter, a number, a special character and it should be 8 to 24 characters long.'
			);
		}

		try {
			// sign up user
			const { user } = await signUpWithPassword(
				formData.email,
				formData.password
			);

			// save username to firebase and get idToken
			await updateProfile(user, { displayName: formData.name });
			const token = await user.getIdToken(true);

			// send request to server
			authenticate({ token });
		} catch (error) {
			setErr(error.code);
		}
	};

	// handle google registration
	const handleGoogleSignIn = () => {
		// start the loader
		setLoading(true);

		signInWithGoogle()
			.then((res) =>
				authenticateForToken({ token: res?.user?.accessToken })
			)
			.catch((error) => setErr(error.code));
	};

	return (
		<section className='w-11/12 md:w-4/5 lg:w-1/3 mx-auto my-14 px-1 md:px-10 py-12 md:py-8 text-slate-500 font-Popins bg-gradient-to-bl from-Primary/30 to-Primary/70 relative rounded'>
			{/* Set title */}
			<Helmet>
				<title>Register - Mad Chef</title>
			</Helmet>

			<h2 className='text-[2.6rem] text-Primary text-center font-semibold font-Popins'>
				Register
			</h2>

			<form
				className='w-10/12 md:w-fit mx-auto mt-6 md:mt-5 md:px-5'
				onSubmit={handleSubmitForm}>
				{/* Name */}
				<>
					<label
						htmlFor='name'
						className='md:text-xl block mb-1 tracking-wide'>
						Name
					</label>
					<input
						type='name'
						id='name'
						name='name'
						placeholder='Enter your name.'
						className='w-full px-3 py-1 text-sm md:text-base outline-Primary rounded'
						value={formData.name}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								name: e.target.value,
							}))
						}
						required
						disabled={loading}
					/>
				</>

				{/* Email */}
				<>
					<label
						htmlFor='email'
						className='md:text-xl block mt-4 mb-1 tracking-wide'>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						placeholder='Enter your email.'
						className='w-full px-3 py-1 text-sm md:text-base outline-Primary rounded'
						value={formData.email}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								email: e.target.value,
							}))
						}
						required
						disabled={loading}
					/>
				</>

				{/* Password */}
				<>
					<label
						htmlFor='password'
						className='md:text-xl block mb-1 mt-4 md:mt-5 tracking-wide'>
						Password
					</label>
					<div className='relative'>
						<input
							type={passwordType ? 'password' : 'text'}
							id='password'
							name='password'
							placeholder='Enter your password.'
							className='w-full px-3 py-1 text-sm md:text-base outline-Primary rounded'
							value={formData.password}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									password: e.target.value,
								}))
							}
							required
							disabled={loading}
						/>
						<p
							className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'
							onClick={() => setPasswordType(!passwordType)}>
							{passwordType ? <FaEyeSlash /> : <FaEye />}
						</p>
					</div>
				</>

				{/* Confirm password */}
				<>
					<label
						htmlFor='confirm-password'
						className='md:text-xl block mb-1 mt-4 md:mt-5 tracking-wide'>
						Confirm Password
					</label>
					<div className='md:w-96 relative'>
						<input
							type={passwordType ? 'password' : 'text'}
							id='confirm-password'
							name='confirmPassword'
							placeholder='Confirm your password.'
							className='w-full px-3 py-1 text-sm md:text-base outline-Primary rounded'
							value={formData.confirmPassword}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									confirmPassword: e.target.value,
								}))
							}
							required
							disabled={loading}
						/>
						<p
							className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'
							onClick={() => setPasswordType(!passwordType)}>
							{passwordType ? <FaEyeSlash /> : <FaEye />}
						</p>
					</div>
				</>

				<p className='mt-2 text-sm px-1'>
					Already have account?{' '}
					<Link
						to='/login'
						className='text-slate-950 hover:text-Primary underline'>
						Login
					</Link>{' '}
					here.
				</p>

				{/* Show error here */}
				{err && (
					<p className='mt-3 py-1 bg-red-200/60 text-red-700 text-center rounded'>
						{err}
					</p>
				)}

				{loading ? (
					<RoundSpinner />
				) : (
					<button
						className='btn btn-primary block mx-auto mt-5 text-lg cursor-pointer disabled:bg-Primary'
						type='submit'
						disabled={loading}>
						Register
					</button>
				)}

				{/* Footer Links */}
				<div className='w-full'>
					<p className='text-xl text-center mt-5 mb-2'>Or</p>
					<div className='text-4xl flex justify-center gap-x-5'>
						<FcGoogle
							className='cursor-pointer'
							onClick={!loading ? handleGoogleSignIn : undefined}
						/>
					</div>
				</div>
			</form>
		</section>
	);
}
