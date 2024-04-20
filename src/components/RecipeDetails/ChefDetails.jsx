import { useState } from 'react';
import { FaHeart } from 'react-icons/fa6';
import { MdOutlineBookmarkAdd, MdBookmarkAdded } from 'react-icons/md';
import {
	HiOutlineClipboardDocument,
	HiClipboardDocumentCheck,
} from 'react-icons/hi2';
import { useGetChefQuery } from '../../features/chef/chefApi';

export default function ChefDetails({ author, like, createdAt }) {
	const liked = false;
	const bookmarked = false;
	const [copiedId, setCopiedId] = useState(false);

	const { data } = useGetChefQuery({ chef_id: author, include: 'name,img' });
	const { _id, name, img } = data?.data || {};

	const copyChefId = async () => {
		try {
			await navigator.clipboard.writeText(_id);
			setCopiedId(true);

			// Revert the state to false after 2 seconds
			setTimeout(() => {
				setCopiedId(false);
			}, 2000);
		} catch (error) {
			// do nothing
		}
	};

	return (
		<section className='mt-2 lg:mt-4 pb-2 border-b-2 border-slate-300 flex items-center gap-x-2 md:gap-x-3'>
			<img
				src={img}
				alt={`${name}'s image`}
				className='w-10 md:w-12 lg:w-14 aspect-square object-cover rounded-full'
			/>
			<div className='font-Vollokorn'>
				<p className='font-semibold flex items-center lg:text-lg'>
					{name}
					{copiedId ? (
						<HiClipboardDocumentCheck className='ml-2 text-xl text-Primary cursor-pointer' />
					) : (
						<HiOutlineClipboardDocument
							className='ml-2 text-xl cursor-pointer'
							onClick={copyChefId}
						/>
					)}
				</p>
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
