import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from '../../../shared';
import { modelImg } from '../../../assets';

export default function User() {
	const { name, img } = useSelector((state) => state.user);

	return (
		<section className='w-4/5 mx-auto'>
			{/* Header */}
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

			{/* Content */}
			<Suspense fallback={<Spinner />}>
				<Outlet />
			</Suspense>
		</section>
	);
}
