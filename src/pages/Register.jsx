import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaEye, FaEyeSlash, FaFacebook, FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

export default function Register() {
	const [passwordType, setPasswordType] = useState(true);

	return (
		<section className='md:w-1/3 mx-auto my-14 md:px-10 py-8 bg-gradient-to-bl from-Primary/30 to-Primary/70 font-Popins rounded'>
			{/* Set title */}
			<Helmet>
				<title>Register - Mad Chef</title>
			</Helmet>

			<h2 className='text-[2.6rem] text-Primary text-center font-semibold font-Popins relative z-10 '>
				Register
			</h2>

			<form className='w-fit mx-auto px-5'>
				{/* Email */}
				<>
					<label
						htmlFor='email'
						className='text-xl block mb-1 mt-5 tracking-wide'>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						placeholder='Enter your email.'
						className='w-96 px-3 py-1 outline-Primary rounded'
						required
					/>
				</>

				{/* Password */}
				<>
					<label
						htmlFor='password'
						className='text-xl block mb-1 mt-5 tracking-wide'>
						Password
					</label>
					<div className='relative'>
						<input
							type={passwordType ? 'password' : 'text'}
							id='password'
							name='password'
							placeholder='Enter your password.'
							className='w-96 px-3 py-1 outline-Primary rounded'
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
						className='text-xl block mb-1 mt-5 tracking-wide'>
						Confirm Password
					</label>
					<div className='relative'>
						<input
							type={passwordType ? 'password' : 'text'}
							id='confirm-password'
							name='confirmPassword'
							placeholder='Confirm your password.'
							className='w-96 px-3 py-1 outline-Primary rounded'
							required
						/>
						<p
							className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'
							onClick={() => setPasswordType(!passwordType)}>
							{passwordType ? <FaEyeSlash /> : <FaEye />}
						</p>
					</div>
				</>

				<p className='mt-2 text-sm'>
					Already have an account?{' '}
					<Link
						to='/login'
						className='text-slate-950 hover:text-Primary underline'>
						Login
					</Link>{' '}
					here.
				</p>

				<button
					className='btn btn-primary block mx-auto mt-5 cursor-pointer'
					type='submit'>
					Register
				</button>

				{/* Footer Links */}
				<div className='w-full'>
					<p className='text-xl text-center mt-5 mb-2'>Or</p>
					<div className='text-4xl flex justify-center gap-x-5'>
						<FcGoogle className='cursor-pointer' />
						<FaFacebook className='cursor-pointer text-blue-600' />
						<FaGithub className='cursor-pointer' />
					</div>
				</div>
			</form>
		</section>
	);
}
