import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetUserDataQuery } from '../../../features/user/userApi';
import { Spinner } from '../../../shared';
import { modelImg } from '../../../assets';

export default function User({ userId }) {
	const { data, isLoading, isSuccess, isError } = useGetUserDataQuery({
		userId,
	});
	const { name, img } = data?.data || {};

	return (
		<section className='w-4/5 mx-auto'>
			{isLoading ? (
				<Spinner />
			) : isError ? (
				<p className='w-fit mx-auto mb-3 p-3 font-semibold text-xl bg-red-300 text-red-800 rounded'>
					Something went wrong! Kindly try again!!!
				</p>
			) : (
				isSuccess && (
					// Header
					<div className='pb-8 flex items-center gap-x-6'>
						<img
							src={img ? img : modelImg}
							alt=''
							className='size-28 aspect-square ml-4 object-cover rounded-full relative z-20'
						/>
						<div className='font-Popins'>
							<p>Hello</p>
							<h3 className='text-2xl'>{name}</h3>
						</div>
					</div>
				)
			)}

			{/* Content */}
			<Suspense fallback={<Spinner />}>
				<Outlet />
			</Suspense>
		</section>
	);
}
