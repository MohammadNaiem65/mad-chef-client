import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { PiChefHatFill } from 'react-icons/pi';
import { perseDate, showNotification } from '../../../../../helpers';
import { verifyEmailAddress } from '../../../../../helpers/authHelper';
import {
	useApplyForPromotionMutation,
	useCheckApplicationForPromotionQuery,
} from '../../../../../features/role/roleApi';
import { ConfirmationModal, Error, Spinner } from '../../../../../shared';

export default function Profile() {
	const { name, email, emailVerified, role, pkg, createdAt, updatedAt } =
		useSelector((state) => state.user);
	// Perse the date
	const formattedDate = perseDate(updatedAt || createdAt, 'short');

	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const {
		data: hasApplied,
		isLoading: hasAppliedIsLoading,
		isSuccess: hasAppliedIsSucc,
		isError: hasAppliedIsErr,
		error: hasAppliedErr,
	} = useCheckApplicationForPromotionQuery(
		{ role: 'chef' },
		{ skip: !emailVerified }
	);
	const [
		applyForPromotion,
		{
			isLoading: applyForPromotionIsLoading,
			isSuccess: applyForPromotionIsSucc,
			isError: applyForPromotionIsErr,
			error: applyForPromotionErr,
		},
	] = useApplyForPromotionMutation();

	// Handle verify email address
	const handleVerifyEmail = () => {
		verifyEmailAddress();
	};

	// Handle apply to be chef
	const handleApplyToBeChef = () => {
		if (applyForPromotionIsLoading) {
			return;
		}

		showNotification('promise', 'Applying for promotion...', {
			promise: applyForPromotion({ role: 'chef' }),
			successMessage: 'Promotion application successful',
			errorMessage: 'An error occurred while applying for promotion',
		});
	};

	// Handle loading states
	useEffect(() => {
		if (hasAppliedIsLoading || applyForPromotionIsLoading) {
			setIsLoading(true);
		}
	}, [hasAppliedIsLoading, applyForPromotionIsLoading]);

	// Handle success states
	useEffect(() => {
		if (hasAppliedIsSucc) {
			setIsLoading(false);
			setError('');
		} else if (applyForPromotionIsSucc) {
			setIsLoading(false);
			setError('');
		}
	}, [hasAppliedIsSucc, applyForPromotionIsSucc]);

	// Handle error states
	useEffect(() => {
		if (hasAppliedIsErr) {
			setIsLoading(false);
			setError(hasAppliedErr?.data?.msg);
		} else if (applyForPromotionIsErr) {
			setIsLoading(false);
			setError(applyForPromotionErr?.data?.msg);
		}
	}, [
		hasAppliedIsErr,
		hasAppliedErr,
		applyForPromotionIsErr,
		applyForPromotionErr?.data?.msg,
	]);

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

				{pkg !== 'pro' && (
					<Link
						to='/payment/user/upgrade-to-pro'
						className='w-fit relative rounded-full overflow-hidden'>
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
					</Link>
				)}

				{/* Action button to be chef */}
				{emailVerified && (
					<div className='relative'>
						<button
							onClick={() => setShowModal(true)}
							className='btn btn-primary flex items-center gap-x-2 disabled:bg-blue-700 peer'
							disabled={
								isLoading ||
								hasApplied?.data?.status ||
								applyForPromotionIsSucc
							}>
							Wanna be Chef <PiChefHatFill className='text-2xl' />
						</button>
						<label
							htmlFor='pro-btn'
							className={`p-1 text-lg text-white text-center opacity-0 bg-yellow-500 absolute -top-[4.3rem] -left-2 -right-2 rounded duration-300 peer-hover:opacity-100 ${
								hasApplied?.data?.status ||
								applyForPromotionIsSucc ||
								'hidden'
							}`}>
							You have already applied to be Chef
						</label>
					</div>
				)}
			</div>

			{error && <Error message={error} />}

			{isLoading && <Spinner />}

			{showModal && (
				<ConfirmationModal
					title='Want to apply to be Chef?'
					details='All your data as a Student will be DELETED'
					setIsVisible={setShowModal}
					onConfirm={handleApplyToBeChef}
				/>
			)}
		</section>
	);
}
