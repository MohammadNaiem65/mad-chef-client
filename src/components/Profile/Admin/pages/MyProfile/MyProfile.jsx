import { useSelector } from 'react-redux';
import { perseDate } from '../../../../../helpers';

export default function MyProfile() {
	const { name, email, role, createdAt, updatedAt } = useSelector(
		(state) => state.user
	);
	const formattedDate = perseDate(updatedAt || createdAt, 'short');

	return (
		<section className='w-full p-5 text-lg text-gray-700 font-semibold grid grid-cols-3 md:gap-y-4'>
			<label htmlFor='name' className='col-span-1'>
				Name:{' '}
			</label>
			<p
				id='name'
				className='-mt-1 md:m-0 text-gray-500 text-base col-span-3 md:col-span-2'>
				{name}
			</p>
			<label htmlFor='email' className='mt-3 md:m-0 col-span-1'>
				Email:
			</label>
			<p
				id='email'
				className='-mt-1 md:m-0 text-gray-500 text-base col-span-3 md:col-span-2'>
				{email}
			</p>
			<label
				htmlFor='role'
				className='mt-3 md:m-0 col-span-2 md:col-span-1'>
				Role:
			</label>
			<p
				id='role'
				className='mt-3 md:m-0 text-gray-500 text-base col-span-1 md:col-span-2 capitalize'>
				{role}
			</p>
			<label
				htmlFor='update-date'
				className='mt-3 md:m-0 col-span-2 md:col-span-1'>
				Last Updated:
			</label>
			<p
				id='update-date'
				className='mt-3 md:m-0 text-gray-500 text-base col-span-1 md:col-span-2'>
				{formattedDate}
			</p>
		</section>
	);
}
