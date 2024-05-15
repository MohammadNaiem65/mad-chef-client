import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
	MdOutlineFactCheck,
	MdFactCheck,
	MdErrorOutline,
	MdError,
} from 'react-icons/md';
import { PiCardholderLight, PiCardholderFill } from 'react-icons/pi';

import { useGetPaymentReceiptsQuery } from '../../../../../features/payment/paymentApi';
import { Spinner } from '../../../../../shared';
import Sidebar from '../../Sidebar';
import Payment from './Payment';

export default function PaymentHistory() {
	const [filter, setFilter] = useState('all');
	const [selectedDocs, setSelectedDocs] = useState([]);

	const { _id } = useSelector((state) => state.user);
	const { data, isLoading, isSuccess, isError, error } =
		useGetPaymentReceiptsQuery({
			userId: _id,
			filter,
		});
	const receipts = data?.data || {};

	// Decide what to render
	let content;

	if (isLoading) {
		content = <Spinner />;
	} else if (isError) {
		content = (
			<div className='w-full'>
				{/* Navbar for dashboard page content */}
				<nav className='text-lg flex items-center divide-x-2'>
					<button
						className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							filter === 'all' && 'text-Primary'
						}`}
						onClick={() => setFilter('all')}>
						{filter === 'all' ? (
							<PiCardholderFill className='text-2xl' />
						) : (
							<PiCardholderLight className='text-2xl' />
						)}
						All
					</button>
					<button
						className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							filter === 'succeed' && 'text-Primary'
						}`}
						onClick={() => setFilter('succeed')}>
						{filter === 'succeed' ? (
							<MdFactCheck className='text-xl' />
						) : (
							<MdOutlineFactCheck className='text-xl' />
						)}
						Succeed
					</button>
					<button
						className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							filter === 'failure' && 'text-Primary'
						}`}
						onClick={() => setFilter('failure')}>
						{filter === 'failure' ? (
							<MdError className='text-2xl' />
						) : (
							<MdErrorOutline className='text-2xl' />
						)}
						Failed
					</button>
				</nav>

				{/* Payments */}
				<div className='w-full mt-32 flex justify-center'>
					<p className='w-fit h-fit p-2 bg-red-300 text-red-700 rounded-sm'>
						{error?.message}
					</p>
				</div>
			</div>
		);
	} else if (isSuccess && receipts?.length === 0) {
		content = (
			<div className='w-full mt-32 flex justify-center'>
				<p>No data found</p>
			</div>
		);
	} else if (isSuccess && receipts.length > 0) {
		content = (
			<section className='ml-5 divide-y-2'>
				<div className='p-2 text-sm text-gray-500 grid grid-cols-12 group/parent'>
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
		<section className='border-t border-gray-300 flex'>
			<Helmet>
				<title>Payment History || Profile - Mad Chef</title>
			</Helmet>

			{/* Sidebar */}
			<Sidebar />

			{/* {content} */}
			<section className='w-full'>
				{/* Navbar for dashboard page content */}
				<nav className='mb-10 text-lg flex items-center divide-x-2'>
					<button
						className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							filter === 'all' && 'text-Primary'
						}`}
						onClick={() => setFilter('all')}>
						{filter === 'all' ? (
							<PiCardholderFill className='text-2xl' />
						) : (
							<PiCardholderLight className='text-2xl' />
						)}
						All
					</button>
					<button
						className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							filter === 'succeeded' && 'text-Primary'
						}`}
						onClick={() => setFilter('succeeded')}>
						{filter === 'succeeded' ? (
							<MdFactCheck className='text-xl' />
						) : (
							<MdOutlineFactCheck className='text-xl' />
						)}
						Succeeded
					</button>
					<button
						className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							filter === 'failed' && 'text-Primary'
						}`}
						onClick={() => setFilter('failed')}>
						{filter === 'failed' ? (
							<MdError className='text-2xl' />
						) : (
							<MdErrorOutline className='text-2xl' />
						)}
						Failed
					</button>
				</nav>

				<h3 className='w-1/2 ml-4 mb-4 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
					My Transactions:
				</h3>

				{content}
			</section>
		</section>
	);
}
