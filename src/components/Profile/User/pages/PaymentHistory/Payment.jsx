import { BsExclamationLg } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa6';
import { IoCheckmarkDone } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import { useDeletePaymentReceiptMutation } from '../../../../../features/payment/paymentApi';

export default function Payment(props) {
	const { userId, filter, payment, selectedDocs, setSelectedDocs } = props;
	const { _id, username, email, pkg, amount, status, createdAt } =
		payment || {};

	const [deleteReceipt] = useDeletePaymentReceiptMutation();

	const packageName =
		pkg?.split('/') && pkg?.split('/')[1]?.replace(/-/g, ' ');
	const date = `${new Date(createdAt).toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	})} - ${new Date(createdAt).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	})}`;
	const selected = selectedDocs.includes(_id);

	const handleDeletion = () => {
		deleteReceipt({ userId, filter, receiptId: _id });
	};

	return (
		<div className='p-2 text-sm text-gray-500 grid grid-cols-12 group/parent'>
			<div className='col-span-2 flex items-center gap-x-2'>
				<input
					type='checkbox'
					name='transaction'
					id='transaction'
					className='size-4 accent-Primary'
					checked={selected}
					onChange={() =>
						selected
							? setSelectedDocs((prev) =>
									prev.filter((id) => id !== _id)
							)
							: setSelectedDocs((prev) => [...prev, _id])
					}
				/>

				{/* Title */}
				<p className='text-base text-gray-700'>
					${(amount / 100).toFixed(2)}
				</p>

				{/* Status */}
				<p
					title={`Order Status: ${status}`}
					className={`w-fit py-[.07rem] px-2 text-xs capitalize flex items-center gap-x-1 rounded-sm ${
						status === 'pending'
							? 'bg-slate-300 text-slate-700'
							: status === 'succeeded'
							? 'py-[.09rem] bg-green-200 text-green-600'
							: status === 'failed' && 'bg-red-200 text-red-600'
					}`}>
					{status}
					{status === 'pending' ? (
						<FaRegClock className='text-xs my-1' />
					) : status === 'succeeded' ? (
						<IoCheckmarkDone className='text-lg' />
					) : (
						status === 'failed' && (
							<BsExclamationLg className='text-lg -mx-1 ' />
						)
					)}
				</p>
			</div>

			<span title={username} className='truncate ml-3 col-span-2'>
				{username}
			</span>
			<span title={email} className='truncate col-span-3'>
				{email}
			</span>
			<span
				title={packageName}
				className='capitalize truncate col-span-2'>
				{packageName}
			</span>
			<span
				title={date}
				className='col-span-3 truncate group-hover/parent:col-span-2'>
				{date}
			</span>

			{/* Action buttons */}
			<div className='col-span-1 hidden justify-center items-center group-hover/parent:flex'>
				<button
					title='Delete Receipt'
					className='text-2xl'
					onClick={handleDeletion}>
					<MdDeleteForever className='hover:text-red-500' />
				</button>
			</div>
		</div>
	);
}
