import { Link } from 'react-router-dom';
import { ArrowLink, Rating } from '../../../shared';
import VerticalCard from './VerticalCard';
import { modelImg } from '../../../assets';

export default function HorizontalCard({ e }) {
	const name = 'Naiem';
	const rating = 5;
	const yearsOfExperience = 3;
	const recipes = 5;
	const _id = 2;

	return (
		<>
			{/* Show in large devices */}
			<div className='h-52 p-5 md:p-0 bg-white hidden md:col-span-2 md:flex md:flex-row justify-evenly items-center relative rounded overflow-hidden'>
				{/* chef image */}
				<img
					src={modelImg}
					alt={`picture of chef ${name}`}
					className='shape-bg-three w-48 h-48 object-cover object-center shadow-lg '
				/>

				{/* content */}
				<div className='w-1/2 text-slate-500'>
					<p className='text-lg font-semibold text-black'>{e}</p>
					<p className='text-yellow-300 flex items-center gap-[2px]'>
						{rating && <Rating rating={rating} />}
					</p>
					<div className='font-semibold relative z-20'>
						<p>Experience: {yearsOfExperience} Years</p>
						<div className='flex justify-between items-center'>
							<p>Recipes: {recipes?.length}</p>
							<Link
								to={`https://assignment-10-phr.netlify.app/dashboard/chefs/chef/${_id}`}
								className='cursor-pointer'>
								<ArrowLink />
							</Link>
						</div>
					</div>
				</div>

				{/* Right-Bottom blob */}
				<div className='h-40 aspect-square bg-Primary bg-opacity-20 absolute -right-5 -bottom-8 z-10 rounded-tl-[32%_30%] rounded-tr-[68%_24%] rounded-bl-[30%_70%]' />
			</div>

			{/* Show in small devices */}
			<div className='md:hidden'>
				<VerticalCard e={e} />
			</div>
		</>
	);
}
