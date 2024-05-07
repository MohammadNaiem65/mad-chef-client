import { useSelector } from 'react-redux';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { PiChefHatFill } from 'react-icons/pi';
import { perseDate } from '../../../../../helpers';
import { verifyEmailAddress } from '../../../../../helpers/authHelper';

export default function Profile() {
	const { name, email, emailVerified, role, pkg, updatedAt } = useSelector(
		(state) => state.user
	);

	// Perse the date
	const formattedDate = perseDate(updatedAt, 'short');

	// Handle verify email address
	const handleVerifyEmail = () => {
		verifyEmailAddress();
	};

	return (
		<section className='w-full p-5'>
			<div className='w-full text-lg text-gray-700 font-semibold grid grid-cols-3 gap-y-4'>
				<label htmlFor='name'>Name: </label>
				<p id='name' className='text-gray-500 col-span-2'>
					{name}
				</p>
				<label htmlFor='email'>Email:</label>
				<p id='email' className='text-gray-500 col-span-2'>
					{email}
				</p>
				<label htmlFor='email-status'>Email Verified:</label>
				<>
					{emailVerified ? (
						<p
							id='email-status'
							className='text-gray-500 flex items-start gap-x-2 col-span-2'>
							Verified{' '}
							<RiVerifiedBadgeFill className='mt-1 text-green-500 text-xl' />
						</p>
					) : (
						<p
							id='email-status'
							className='text-gray-500 col-span-2'>
							Not Verified
						</p>
					)}
				</>
				<label htmlFor='role'>Role:</label>
				<p id='role' className='text-gray-500 col-span-2 capitalize'>
					{role}
				</p>
				<label id='package'>Package:</label>
				<>
					{pkg === 'pro' ? (
						<p
							id='package'
							className='text-gray-500 flex items-start gap-x-2 col-span-2'>
							Pro
							<MdOutlineWorkspacePremium className='mt-1 text-yellow-500 text-xl' />
						</p>
					) : (
						<p id='package' className='text-gray-500 col-span-2'>
							Starter
						</p>
					)}
				</>
				<label htmlFor='update-date'>Last Updated:</label>
				<p id='update-date' className='text-gray-500 col-span-2'>
					{formattedDate}
				</p>
			</div>

			{/* Action buttons to verify email and become pro user */}
			<div className='w-2/3 mt-10 flex items-center justify-end gap-x-4'>
				{emailVerified || (
					<button
						className='btn border-2 border-green-500 text-green-500 flex items-center gap-x-2 hover:bg-green-500 hover:text-white'
						onClick={handleVerifyEmail}>
						Verify Email{' '}
						<RiVerifiedBadgeFill className='text-2xl' />
					</button>
				)}
				<div className='relative'>
					<button
						disabled={emailVerified === false}
						id='pro-btn'
						className='btn peer border-2 border-yellow-500 text-yellow-500 flex items-center gap-x-2 hover:bg-yellow-500 hover:text-white disabled:bg-yellow-700 disabled:border-yellow-700 disabled:hover:text-yellow-500'>
						Become Pro
						<MdOutlineWorkspacePremium className='text-2xl' />
					</button>
					<label
						htmlFor='pro-btn'
						className={`p-1 text-lg text-white opacity-0 bg-yellow-500 absolute -top-10 -left-2 -right-2 rounded duration-300 peer-hover:opacity-100 ${
							emailVerified && 'hidden'
						}`}>
						First verify Email address
					</label>
				</div>

				{/* Action button to be chef */}
				{emailVerified && (
					<button className='btn btn-primary flex items-center gap-x-2'>
						Wanna be Chef <PiChefHatFill className='text-2xl' />
					</button>
				)}
			</div>
		</section>
	);
}
