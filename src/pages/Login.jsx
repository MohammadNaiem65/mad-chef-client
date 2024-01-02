// External imports
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

// internal imports
import { useAuthenticateForTokenMutation } from '../features/auth/authApi';
import { signInWithGoogle, signInWithPassword } from '../helpers/authHelper';
import RoundSpinner from '../shared/RoundSpinner/RoundSpinner';
import showNotification from '../helpers/showNotification';
import removeNotifications from '../helpers/removeNotifications';

export default function Login() {
	// local states
	const [passwordType, setPasswordType] = useState(true);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState('');
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	// hooks
	const navigate = useNavigate();
	const location = useLocation();
	const [authenticateForToken, { isLoading, isSuccess, isError, error }] =
		useAuthenticateForTokenMutation();

	// Get location
	const from = location.state?.from?.pathname || '/';

	// handle loading state of authentication process
	useEffect(() => {
		if (isLoading) {
			showNotification('loading', 'Almost there...');
			setLoading(true);
		}
	}, [isLoading]);

	// handle successful authentication
	useEffect(() => {
		if (isSuccess) {
			removeNotifications();
			showNotification('success', 'Successfully logged in!');
			setLoading(false);
			navigate(from);
		}
	}, [navigate, from, isSuccess]);

	// handle error of authentication process
	useEffect(() => {
		if (isError) {
			removeNotifications();
			showNotification('error', error.data);
			setLoading(false);
			setErr(error.data);
		}
	}, [isError, error]);

	// handle login with email
	const handleSubmitForm = (e) => {
		e.preventDefault();

		// start loading state
		setLoading(true);
		showNotification('loading', 'Validating your credentials...');

		// sign in with firebase
		signInWithPassword(formData.email, formData.password)
			.then((res) =>
				authenticateForToken({ token: res?.user?.accessToken })
			)
			.catch((error) => setErr(error.code));
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
		<section className='w-11/12 md:w-4/5 lg:w-1/3 mx-auto my-14 px-1 md:px-10 py-12 md:py-8 text-slate-500 font-Popins bg-gradient-to-bl from-Primary/30 to-Primary/70 rounded'>
			<Helmet>
				<title>Login - Mad Chef</title>
			</Helmet>

			<h2 className='text-[2.6rem] text-Primary text-center font-semibold font-Popins'>
				Login
			</h2>

			<form
				className='w-10/12 md:w-11/12 mx-auto mt-6 md:mt-5'
				onSubmit={handleSubmitForm}>
				{/* Email */}
				<>
					<label
						htmlFor='email'
						className='md:text-xl block mb-1 tracking-wide'>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						placeholder='Enter your email.'
						className='w-full px-3 py-1 text-sm md:text-base outline-Primary rounded'
						required
						disabled={loading}
						value={formData.email}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								email: e.target.value,
							}))
						}
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
							required
							disabled={loading}
							value={formData.password}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									password: e.target.value,
								}))
							}
						/>
						<p
							className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'
							onClick={() => setPasswordType(!passwordType)}>
							{passwordType ? <FaEyeSlash /> : <FaEye />}
						</p>
					</div>
				</>

				<p className='mt-2 text-sm px-1'>
					New Here?{' '}
					<Link
						to='/register'
						className='text-slate-950 hover:text-Primary underline'>
						Register
					</Link>{' '}
					now.
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
						className='btn btn-primary block mx-auto mt-5 text-lg cursor-pointer'
						disabled={loading}
						type='submit'>
						Login
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
