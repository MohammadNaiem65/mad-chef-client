import { useRef, useState } from 'react';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa6';
import { newsletterBgImg } from '../../assets';

const Newsletter = () => {
	const emailField = useRef(null);
	const [gotFocused, setGotFocused] = useState(false);

	return (
		<div
			className='h-[28rem] w-full mt-20 font-Popins flex flex-col justify-center items-center text-center text-slate-500'
			style={{
				backgroundImage: `url("${newsletterBgImg}")`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
			}}>
			<h1 className='section-title uppercase'>
				{/*title */}
				Hey you, Sign Up and <br />
				<span className='section-title-span after:w-[112%] mr-2'>
					CONNECT
				</span>
				to{' '}
				<span className='text-[1.7rem] text-Primary font-semibold font-Popins normal-case'>
					Mad Chef
				</span>
			</h1>
			<form>
				<div className='text-lg mt-6 md:flex gap-5'>
					<div className='w-72 relative'>
						<label
							htmlFor='email'
							onClick={() => setGotFocused(true)}
							className={`w-fit text-start bg-transparent absolute duration-500 ${
								gotFocused
									? 'text-sm px-0 py-0 -top-5 left-2'
									: ' h-full px-2 py-[.5rem] top-0 left-0'
							}`}>
							Enter your email
						</label>
						<input
							type='email'
							name='email'
							id='email'
							className='w-full h-11 text-gray-500 px-3 py-1 border-2 border-Primary/50 outline-Primary rounded'
							ref={emailField}
							onFocus={() => setGotFocused(true)}
							onBlur={() => {
								if (emailField.current.value === '') {
									setGotFocused(false);
								}
							}}
							required
						/>
					</div>
					<button
						className='btn btn-primary mx-auto mt-3 md:mt-0'
						type='submit'>
						Sign Up
					</button>
				</div>
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
			</form>{' '}
			
			{/* Social Links */}
			<div className='mt-5'>
				<p>Connect with us:</p>
				<p className='w-fit mx-auto mt-1 flex gap-2 text-xl'>
					<FaFacebook className='text-blue-500 cursor-pointer' />
					<FaInstagram className='text-orange-600 cursor-pointer' />
					<FaPinterest className='text-red-700 cursor-pointer' />
				</p>
			</div>
		</div>
	);
};

export default Newsletter;
