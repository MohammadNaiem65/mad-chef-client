import { Helmet } from 'react-helmet-async';
import {
	MdOutlineFactCheck,
	MdFactCheck,
	MdErrorOutline,
	MdError,
} from 'react-icons/md';
import { PiCardholderLight, PiCardholderFill } from 'react-icons/pi';
import Sidebar from '../../Sidebar';
import Payment from './Payment';
import { useState } from 'react';

export default function PaymentHistory() {
	const [filter, setFilter] = useState('all');

	console.log(filter);

	return (
		<section className='border-t border-gray-300 flex'>
			<Helmet>
				<title>Payment History || Profile - Mad Chef</title>
			</Helmet>

			{/* Sidebar */}
			<Sidebar />

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
				<section>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
						(payment, index) => (
							<Payment key={index} payment={payment} />
						)
					)}
				</section>
			</div>
		</section>
	);
}
