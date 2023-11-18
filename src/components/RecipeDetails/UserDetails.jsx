import { FaHeart } from 'react-icons/fa6';
import { modelImg } from '../../assets';

export default function UserDetails() {
	const liked = false;
	return (
		<section className='mt-2 pb-2 flex items-center gap-x-4 border-b-2 border-slate-300'>
			<img
				src={modelImg}
				alt=''
				className='w-14 aspect-square object-cover rounded-full'
			/>
			<div className='font-Vollokorn'>
				<p className='font-semibold'>Mohammad Naiem</p>
				<div className='text-slate-500 flex items-center gap-x-2'>
					{new Date('1/13/2014').toLocaleDateString('en-GB', {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}
					<p className='h-1 w-1 bg-black rounded-full' />
					<p className='text-xl flex items-center gap-x-1'>
						{liked ? (
							<FaHeart className='text-red-600' />
						) : (
							<FaHeart />
						)}{' '}
						<span className='text-base'>300</span>
					</p>
				</div>
			</div>
		</section>
	);
}
