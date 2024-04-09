import { useParams } from 'react-router-dom';
import { FaBriefcase, FaStar } from 'react-icons/fa6';
import { MdFastfood } from 'react-icons/md';
import { useGetChefQuery } from '../../features/chef/chefApi';

export default function Banner() {
	const { chefId } = useParams();

	const { data } = useGetChefQuery({ chef_id: chefId });
	const { name, bio, rating, yearsOfExperience, recipes, img } =
		data?.data || {};

	return (
		<section className='mb-10 p-6 bg-Primary/20 text-gray-500 font-Popins lg:flex gap-x-5 flex justify-between rounded'>
			<img
				className='h-44 lg:h-52 aspect-square rounded-full object-cover'
				src={img}
				alt={`Chef ${name}'s picture`}
			/>
			<div className='w-full h-fit my-auto text-justify'>
				<p className='mt-2 lg:mb-3 text-2xl text-black text-center lg:text-start font-Vollokorn font-semibold'>
					{name}
				</p>
				<p>{bio}</p>
				<div className='mt-1 text-lg flex justify-between'>
					<p className='flex items-center'>
						<span className='mr-1 text-yellow-500'>
							<FaStar />
						</span>
						{rating ? rating : 'Null'}
					</p>
					<p className='flex items-center'>
						<span className='mr-1'>
							<FaBriefcase />
						</span>
						{yearsOfExperience
							? `${yearsOfExperience} years`
							: 'Experience unavailable'}
					</p>
					<p className='flex items-center'>
						<span className='mr-1'>
							<MdFastfood />
						</span>
						{recipes?.length} recipes
					</p>
				</div>
			</div>
		</section>
	);
}
