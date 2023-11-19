import { FaHeart } from 'react-icons/fa6';
import { MdOutlineBookmarkAdd, MdBookmarkAdded } from 'react-icons/md';
import { modelImg } from '../../assets';

export default function UserDetails() {
	const liked = true;
	const bookmarked = true;

	return (
		<section className='mt-2 pb-2 flex items-center gap-x-2 md:gap-x-3 border-b-2 border-slate-300'>
			<img
				src={modelImg}
				alt=''
				className='w-10 md:w-12 lg:w-14 aspect-square object-cover rounded-full'
			/>
			<div className='font-Vollokorn'>
				<p className='font-semibold lg:text-lg'>Mohammad Naiem</p>
				<div className='text-slate-500 -mt-1 flex items-center gap-x-2'>
					{new Date('1/13/2014').toLocaleDateString('en-GB', {
						day: 'numeric',
						month: 'short',
						year: 'numeric',
					})}

					<span className='h-1 w-1 bg-black rounded-full' />

					<p className='text-xl flex items-center gap-x-1'>
						{liked ? (
							<span className='cursor-pointer text-red-400'>
								<FaHeart className='cursor-pointer' />
							</span>
						) : (
							<span className='cursor-pointer'>
								<FaHeart />
							</span>
						)}{' '}
						<span className='text-base'>300</span>
					</p>

					<span className='h-1 w-1 bg-black rounded-full' />

					<p className='text-xl flex items-center gap-x-1'>
						{bookmarked ? (
							<span className='cursor-pointer'>
								<MdBookmarkAdded className='cursor-pointer' />
							</span>
						) : (
							<span className='cursor-pointer'>
								<MdOutlineBookmarkAdd />
							</span>
						)}
					</p>
				</div>
			</div>
		</section>
	);
}
