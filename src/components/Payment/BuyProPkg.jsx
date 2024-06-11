import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {
	useCreatePaymentIntentMutation,
	useSavePaymentReceiptMutation,
} from '../../features/payment/paymentApi';
import './BuyProPkg.css';
import { Spinner } from '../../shared';
import { useUpdateUserPkgMutation } from '../../features/user/userApi';

const features = [
	{ title: 'Unlimited Blogs', description: 'Access unlimited blogs.' },
	{
		title: 'Get 1 to 1 Support',
		description: 'Get in person help from chef.',
	},
	{
		title: 'Mad Community',
		description: 'Get full access to Mad Community.',
	},
];

const amount = parseInt(import.meta.env.VITE_PRO_PKG_PRICE);

export default function BuyProPkg() {
	const { _id, name, email, pkg } = useSelector((state) => state.user);

	const navigate = useNavigate();

	useEffect(() => {
		if (pkg === 'pro') {
			navigate('/');
		}
	}, [navigate, pkg]);

	const stripe = useStripe();
	const elements = useElements();

	const [clientSecret, setClientSecret] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const [
		createPaymentIntent,
		{ data, isSuccess: createPaymentIntentIsSuccess },
	] = useCreatePaymentIntentMutation();
	const [
		savePaymentReceipt,
		{
			isSuccess: savePaymentReceiptIsSuccess,
			isError: savePaymentReceiptIsError,
			error: savePaymentReceiptError,
		},
	] = useSavePaymentReceiptMutation();
	const [
		updateUserPkg,
		{
			isSuccess: updatingUserPkgIsSuccess,
			isError: updatingUserPkgIsError,
			error: updatingUserPkgError,
		},
	] = useUpdateUserPkgMutation();

	// Fetch a new payment intent after the first render
	useEffect(() => {
		createPaymentIntent({ amount });
	}, [createPaymentIntent]);

	// Save the client secret state
	useEffect(() => {
		if (createPaymentIntentIsSuccess) {
			setClientSecret(data?.data?.clientSecret);
		}
	}, [createPaymentIntentIsSuccess, data?.data?.clientSecret]);

	// Update user's pkg field in the db
	useEffect(() => {
		if (savePaymentReceiptIsSuccess) {
			updateUserPkg();
		}
	}, [updateUserPkg, savePaymentReceiptIsSuccess]);

	// Navigate the user to payment history page upon successfully updating the user's pkg field
	useEffect(() => {
		if (updatingUserPkgIsSuccess) {
			setLoading(false);
			navigate('/profile/user/payment-history');
		}
	}, [navigate, updatingUserPkgIsSuccess]);

	// Set the loading state error occurs
	useEffect(() => {
		if (updatingUserPkgIsError || savePaymentReceiptIsError) {
			setLoading(false);
			setError(
				updatingUserPkgError?.data?.msg ||
					savePaymentReceiptError?.data?.data?.message
			);
		}
	}, [
		savePaymentReceiptIsError,
		updatingUserPkgIsError,
		savePaymentReceiptError?.data?.data?.message,
		updatingUserPkgError?.data?.msg,
	]);

	// Confirm the submission of saving payment receipt
	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');
		setLoading(true);

		// Don't allow execution of the rest code if stripe and element's reference is invalid
		if (!stripe || !elements) {
			return;
		}

		// Get the card element reference
		const card = elements.getElement(CardElement);

		// Don't allow execution of the rest code if card element's reference is invalid
		if (card == null) {
			return;
		}

		if (error) {
			setLoading(false);
			setError(error?.message);
		} else {
			// Confirm payment using stripe
			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card,
					billing_details: {
						name,
						email,
					},
				},
			});

			const paymentIntent = result?.paymentIntent;

			// Create payment receipt
			const data = {
				userId: _id,
				username: name,
				pkg: 'student/pro-pkg',
				email,
				amount,
			};

			console.log(data);

			if (paymentIntent?.status === 'succeeded') {
				const { id: transactionId } = paymentIntent;

				// Add transaction id and status
				data.transactionId = transactionId;
				data.status = 'succeeded';

				// Save the money receipt document to the database
				savePaymentReceipt({ data });
			} else {
				// Add transaction id and status
				data.status = 'failed';

				// Save the money receipt document to the database
				savePaymentReceipt({ data });
				setError(result?.error?.message);
			}
		}
	};

	return (
		<>
			<section className='w-full md:w-[94%] lg:w-4/6 mx-auto p-4 md:p-6 lg:p-10 flex items-center bg-gradient-to-bl from-[#FADADF] to-[#CCC8FD] rounded'>
				{/* Left side card */}
				<div className='w-1/2 hidden md:block'>
					<h2 className='text-2xl text-center font-Popins font-semibold text-slate-700'>
						User
						<span className='ml-5 mt-6 lg:mt-10 px-3 py-1 font-semibold text-white text-sm bg-Primary/70 rounded'>
							Pro
						</span>
					</h2>
					<p className='mt-1 mb-10 text-lg text-center'>
						You are about to access
					</p>

					{features.map((feature, index) => (
						<div
							key={index}
							className='mx-5 mb-2 flex items-center gap-x-3'>
							<p>
								<span
									className={`w-10 h-10 text-xl text-white font-semibold border-2 border-Primary/90 bg-Primary/90 flex justify-center items-center rounded-full`}>
									{index + 1}
								</span>
							</p>
							<div>
								<p className='text-lg font-semibold'>
									{feature.title}
								</p>
								<p className='text-sm'>{feature.description}</p>
							</div>
						</div>
					))}
				</div>

				{/* Right side card */}
				<form
					onSubmit={handleSubmit}
					className='w-full md:w-1/2 p-5 bg-transparent md:bg-white font-Popins rounded md:shadow-lg'>
					<div>
						<h2 className='mb-5 font-Vollokorn font-semibold text-slate-700 text-2xl text-center'>
							Payment Details
						</h2>

						<h3 className='w-1/2 border-b-2 border-dashed border-Primary text-slate-700 text-xl font-Vollokorn'>
							User Details
						</h3>

						<div className='mt-1'>
							<label htmlFor='name' className='text-sm'>
								Name:
							</label>
							<input
								id='name'
								type='text'
								className='w-full my-1 px-2 py-1 outline-none block shadow duration-300 rounded-sm focus:shadow-md'
								placeholder='Enter your name'
								defaultValue={name}
							/>
						</div>

						<div className='mt-1'>
							<label htmlFor='email' className='text-sm'>
								Email:
							</label>
							<input
								id='email'
								type='email'
								className='w-full my-1 px-2 py-1  block shadow duration-300 outline-none rounded-sm focus:shadow-md'
								placeholder='Enter your email'
								defaultValue={email}
							/>
						</div>
					</div>

					<div className='mt-6'>
						<h3 className='w-1/2 mb-2 border-b-2 border-dashed border-Primary text-slate-700 text-xl font-Vollokorn'>
							Card Details
						</h3>
						<CardElement
							options={{
								style: {
									base: {
										fontSize: '16px',
										color: '#424770',
										'::placeholder': {
											color: '#aab7c4',
										},
									},
									invalid: {
										color: '#9e2146',
									},
								},
							}}
						/>

						{/* Show error if occurred */}
						{error && (
							<p className='text-red-600 text-center bg-red-200 px-2 py-1 mt-4'>
								{error}
							</p>
						)}
					</div>

					<button
						type='submit'
						disabled={!stripe || !clientSecret || loading}
						className='btn mx-auto mt-6 border-2 border-Primary block text-Primary hover:bg-Primary hover:text-white'>
						Pay
					</button>
				</form>
			</section>

			{loading && <Spinner />}
		</>
	);
}
