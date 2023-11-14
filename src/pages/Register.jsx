import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaEye, FaEyeSlash, FaFacebook, FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

export default function Register() {
	const [passwordType, setPasswordType] = useState(true);

	return (
		<section className='w-11/12 md:w-1/3 mx-auto my-14 px-1 md:px-10 py-12 md:py-8 text-slate-500 font-Popins bg-gradient-to-bl from-Primary/30 to-Primary/70 rounded'>
			{/* Set title */}
			<Helmet>
				<title>Register - Mad Chef</title>
			</Helmet>

			<h2 className='text-[2.6rem] text-Primary text-center font-semibold font-Popins'>
				Register
			</h2>

			<form className='w-10/12 md:w-fit mx-auto mt-6 md:mt-5 md:px-5'>
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
						className='w-full px-3 py-1 text-sm outline-Primary rounded'
						required
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
							className='w-full px-3 py-1 text-sm outline-Primary rounded'
							required
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
							className='w-full px-3 py-1 text-sm outline-Primary rounded'
							required
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

				<button
					className='btn btn-primary block mx-auto mt-5 text-lg cursor-pointer'
					type='submit'>
					Register
				</button>

				{/* Footer Links */}
				<div className='w-full'>
					<p className='text-xl text-center mt-5 mb-2'>Or</p>
					<div className='text-4xl flex justify-center gap-x-5'>
						<FcGoogle className='cursor-pointer' />
						<FaFacebook className='cursor-pointer text-blue-600' />
						<FaGithub className='cursor-pointer text-slate-900' />
					</div>
				</div>
			</form>
		</section>
	);
}
