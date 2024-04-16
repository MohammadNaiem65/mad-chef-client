import { FaHeart } from 'react-icons/fa6';
import { MdOutlineBookmarkAdd, MdBookmarkAdded } from 'react-icons/md';
import { useGetChefQuery } from '../../features/chef/chefApi';

export default function ChefDetails({ author, like, createdAt }) {
	const liked = false;
	const bookmarked = false;

	const { data } = useGetChefQuery({ chef_id: author, include: 'name,img' });
	const { name, img } = data?.data || {};

	return (
		<section className='mt-2 lg:mt-4 pb-2 border-b-2 border-slate-300 flex items-center gap-x-2 md:gap-x-3'>
			<img
				src={img}
				alt={`${name}'s image`}
				className='w-10 md:w-12 lg:w-14 aspect-square object-cover rounded-full'
			/>
			<div className='font-Vollokorn'>
				<p className='font-semibold lg:text-lg'>{name}</p>
				<div className='text-slate-500 -mt-1 flex items-center gap-x-2'>
					{new Date(createdAt).toLocaleDateString('en-GB', {
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
						<span className='text-base'>{like}</span>
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
