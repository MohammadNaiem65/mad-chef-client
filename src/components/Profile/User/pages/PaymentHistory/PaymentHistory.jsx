import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
	MdOutlineFactCheck,
	MdFactCheck,
	MdErrorOutline,
	MdError,
	MdDeleteForever,
} from 'react-icons/md';
import { PiCardholderLight, PiCardholderFill } from 'react-icons/pi';

import {
	useDeletePaymentReceiptsMutation,
	useGetPaymentReceiptsQuery,
} from '../../../../../features/payment/paymentApi';
import { NoContent } from '../../../../../shared';
import Payment from './Payment';
import { useEffect } from 'react';
import showNotification from '../../../../../helpers/showNotification';

export default function PaymentHistory() {
	const [filter, setFilter] = useState({ curr: 'all', prev: null });
	const [selectedDocs, setSelectedDocs] = useState([]);

	const { _id } = useSelector((state) => state.user);
	const [
		deletePaymentReceipts,
		{
			isSuccess: deletePaymentIsSucc,
			isError: deletePaymentIsErr,
			error: deletePaymentErr,
		},
	] = useDeletePaymentReceiptsMutation();
	const { data, isSuccess, isError, error } = useGetPaymentReceiptsQuery({
		userId: _id,
		filter: filter.curr,
	});
	const receipts = data?.data || {};

	const handlePaymentReceiptDeletion = () => {
		deletePaymentReceipts({
			userId: _id,
			filter: filter.curr,
			receiptIds: selectedDocs,
		});
		setSelectedDocs([]);
	};

	const handleSetFilter = (status) => {
		if (status !== filter.curr) {
			setFilter((prev) => ({ curr: status, prev: prev.curr }));
		}
	};

	useEffect(() => {
		if (deletePaymentIsSucc) {
			showNotification('success', `Payment Receipts Deleted`);
		} else if (deletePaymentIsErr) {
			showNotification(
				'error',
				deletePaymentErr?.message || 'An error occurred'
			);
		}
	}, [deletePaymentIsSucc, deletePaymentIsErr, deletePaymentErr?.message]);

	// Decide what to render
	let content;

	if (isError) {
		content = (
			<div className='w-full mt-32 flex justify-center'>
				<p className='w-fit h-fit p-2 bg-red-300 text-red-700 rounded-sm'>
					{error?.message}
				</p>
			</div>
		);
	} else if (isSuccess && receipts?.length === 0) {
		content = (
			<div className='mt-32'>
				<NoContent />
			</div>
		);
	} else if (isSuccess && receipts.length > 0) {
		content = (
			<section className='w-[90%] ml-5 divide-y-2 overflow-x-scroll md:overflow-x-auto'>
				<div className='w-[58.875rem] lg:w-full p-2 text-sm text-gray-500 grid grid-cols-12 group/parent'>
					<span className='text-base text-gray-700 col-span-2'>
						Amount
					</span>
					<span className='text-base text-gray-700 truncate ml-3 col-span-2'>
						Username
					</span>
					<span className='text-base text-gray-700 truncate col-span-3'>
						Email
					</span>
					<span className='text-base text-gray-700 capitalize truncate col-span-2'>
						Package Name
					</span>
					<span className='text-base text-gray-700 col-span-3 truncate group-hover/parent:col-span-2'>
						Date
					</span>
				</div>

				{/* Receipts */}
				{receipts.map((payment, index) => (
					<Payment
						key={index}
						userId={_id}
						filter={filter}
						payment={payment}
						selectedDocs={selectedDocs}
						setSelectedDocs={setSelectedDocs}
					/>
				))}
			</section>
		);
	}

	return (
		<>
			<Helmet>
				<title>Payment History | Profile - Mad Chef</title>
			</Helmet>
			
			<section className='w-full'>
				{/* Navbar for payment history page content */}
				<nav className='w-[90%] mb-10 text-lg flex items-center divide-x-2 overflow-x-scroll md:overflow-x-auto'>
					<button
						className={`px-[3.25rem] py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							filter.curr === 'all' && 'text-Primary'
						}`}
						onClick={() => handleSetFilter('all')}>
						{filter.curr === 'all' ? (
							<PiCardholderFill className='text-2xl' />
						) : (
							<PiCardholderLight className='text-2xl' />
						)}
						All
					</button>
					<button
						className={`px-6 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							filter.curr === 'succeeded' && 'text-Primary'
						}`}
						onClick={() => handleSetFilter('succeeded')}>
						{filter.curr === 'succeeded' ? (
							<MdFactCheck className='text-xl' />
						) : (
							<MdOutlineFactCheck className='text-xl' />
						)}
						Succeeded
					</button>
					<button
						className={`px-8 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							filter.curr === 'failed' && 'text-Primary'
						}`}
						onClick={() => handleSetFilter('failed')}>
						{filter.curr === 'failed' ? (
							<MdError className='text-2xl' />
						) : (
							<MdErrorOutline className='text-2xl' />
						)}
						Failed
					</button>
				</nav>

				<div className='px-2 py-2 flex justify-between items-center'>
					<h3 className='w-2/3 md:w-1/2 md:ml-4 md:mb-4 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
						My Transactions:
					</h3>

					{selectedDocs.length > 0 && (
						<button
							className='text-2xl'
							onClick={handlePaymentReceiptDeletion}>
							<span className='px-3 py-1 border-2 border-gray-500 text-lg text-gray-600 hidden md:block rounded-lg'>
								Delete
							</span>
							<MdDeleteForever className='md:hidden' />
						</button>
					)}
				</div>

				{content}
			</section>
		</>
	);
}
