import { Link } from 'react-router-dom';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { modelImg } from '../../../assets';
import VerticalCard from './VerticalCard';

export default function HorizontalCard({ e }) {
	const name = 'Naiem';
	const rating = 5;
	const yearsOfExperience = 3;
	const recipes = 5;
	const _id = 2;

	return (
		<>
			{/* Show in large devices */}
			<div className='h-full p-5 md:p-0 bg-white rounded hidden md:flex flex-col md:flex-row md:justify-evenly items-center relative overflow-hidden'>
				{/* image */}
				<div className='image-container w-48 h-48 mb-5 md:mb-0 shape-bg-three overflow-hidden shadow-lg shadow-Primary z-30'>
					<img
						src={modelImg}
						alt={`picture of chef ${name}`}
						className='h-full w-full chef-image object-cover object-center'
					/>
				</div>

				{/* content */}
				<div className='w-1/2 text-slate-500'>
					<div className='mb-3'>
						<p className='text-lg font-semibold text-black'>
							{name}
						</p>
						<p className='text-yellow-300 flex items-center gap-[2px]'>
							{rating &&
								Array.from({ length: 5 }, (_, i) => {
									return rating >= i + 1 ? (
										<FaStar key={i} />
									) : rating >= i + 0.5 ? (
										<FaStarHalfAlt key={i} />
									) : (
										<FaRegStar key={i} />
									);
								})}
						</p>
					</div>
					<div className='font-semibold'>
						<p>Experience: {yearsOfExperience} Years</p>
						<div className='flex justify-between items-center '>
							<p>Recipes: {recipes?.length}</p>
							<Link
								to={`https://assignment-10-phr.netlify.app/dashboard/chefs/chef/${_id}`}
								className='arrows flex justify-center items-center w-12 h-6 relative z-50'>
								<span className='w-3 h-3 border-t-[3px] border-r-[3px] border-Primary rounded-tr-[2px] block transform rotate-45 hover'></span>
								<span className='w-3 h-3 border-t-[3px] border-r-[3px] border-Primary rounded-tr-[2px] block transform rotate-45'></span>
								<span className='w-3 h-3 border-t-[3px] border-r-[3px] border-Primary rounded-tr-[2px] block transform rotate-45'></span>
							</Link>
						</div>
					</div>
				</div>

				{/* Right-Bottom blob */}
				<div className='h-36 aspect-square shape-bg-one bg-Primary bg-opacity-20 absolute -right-12 -bottom-6' />
			</div>

			{/* Show in small devices */}
			<div className='md:hidden'>
				<VerticalCard e={e} />
			</div>
		</>
	);
}
