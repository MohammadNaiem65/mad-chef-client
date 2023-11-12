import { Link } from 'react-router-dom';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { modelImg } from '../../../assets';

export default function HorizontalCard() {
	const name = 'Naiem';
	const rating = 5;
	const yearsOfExperience = 3;
	const recipes = 5;
	const availableRecipes = 5;
	const _id = 2;

	return (
		<>
			{/* Show in large devices */}
			<div className='h-full p-5 md:p-0 bg-white rounded hidden md:flex flex-col md:flex-row md:justify-evenly items-center relative overflow-hidden'>
				{/* Left side container */}
				<div className='image-container w-48 h-48 mb-5 md:mb-0 shape-bg-three overflow-hidden shadow-lg shadow-Primary z-30'>
					<img
						src={modelImg}
						alt={`picture of chef ${name}`}
						className='h-full w-full chef-image object-cover object-center'
					/>
				</div>

				{/* Right side container */}
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
				<div className='h-36 aspect-square shape-bg-one bg-Primary bg-opacity-20 absolute -right-12 -bottom-6'></div>
			</div>

			{/* Show in small devices */}
			<div className='h-full font-semibold flex md:hidden flex-col justify-between rounded overflow-hidden'>
				{/* Card upper half */}
				<div className='h-60 w-full div-secret relative secret-after'>
					<img
						src={modelImg}
						alt={`image of chef ${name}`}
						className='h-full w-full object-cover object-center rounded-br'
					/>
				</div>
				<div className='h-28 w-full px-5 md:px-2 py-2 bg-white text-slate-500 relative leading-[1.3rem] rounded-tr'>
					<div className='w-[7.25rem] h-12 bg-white grid place-items-center border-transparent border-t-[10px] border-r-[10px] absolute left-0 -top-12 rounded-tr secret-before before:top-0 before:left-0 before:shadow-span-shadow-left secret-after after:top-0 after:right-0 after:shadow-span-shadow-right'>
						<p className='px-1 py-[0.375rem] bg-Primary text-yellow-300 flex items-center gap-[2px] rounded p-secret'>
							{Array.from({ length: 5 }, (_, i) => {
								if (rating >= i + 1) {
									return <FaStar key={i} />;
								} else if (rating >= i + 0.5) {
									return <FaStarHalfAlt key={i} />;
								} else {
									return <FaRegStar key={i} />;
								}
							})}
						</p>
					</div>

					<h3 className='text-lg text-black mt-2'>{name}</h3>
					<p>Experience: {yearsOfExperience} Years</p>
					<div className='flex justify-between items-center '>
						<p>Recipes: {availableRecipes.length}</p>
						<Link
							to={`https://assignment-10-phr.netlify.app/dashboard/chefs/chef/${_id}`}
							className='arrows flex justify-center items-center w-12 h-6'>
							<span className='w-3 h-3 border-t-[3px] border-r-[3px] border-Primary rounded-tr-[2px] block transform rotate-45 hover'></span>
							<span className='w-3 h-3 border-t-[3px] border-r-[3px] border-Primary rounded-tr-[2px] block transform rotate-45'></span>
							<span className='w-3 h-3 border-t-[3px] border-r-[3px] border-Primary rounded-tr-[2px] block transform rotate-45'></span>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
