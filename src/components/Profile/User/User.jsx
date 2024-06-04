import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from '../../../shared';
import { modelImg } from '../../../assets';

export default function User() {
	const { name, img } = useSelector((state) => state.user);

	return (
		<section className='w-full xl:w-4/5 mx-auto'>
			{/* Header */}
			<div className='w-full pb-8 flex items-center gap-x-6'>
				<img
					src={img ? img : modelImg}
					alt='User Image'
					className='size-20 md:size-28 aspect-square ml-4 object-cover rounded-full relative z-20'
				/>
				<div className='font-Popins'>
					<p className='text-lg'>Hello</p>
					<h3 className='text-xl md:text-2xl'>{name}</h3>
				</div>
			</div>

			{/* Content */}
			<Suspense fallback={<Spinner />}>
				<Outlet />
			</Suspense>
		</section>
	);
}
