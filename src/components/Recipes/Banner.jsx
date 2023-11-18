import { FaBriefcase, FaStar } from 'react-icons/fa6';
import { MdFastfood } from 'react-icons/md';
import { modelImg } from '../../assets';

export default function Banner() {
	const name = 'Mohammad Naiem';
	const rating = 5;
	const yearsOfExperience = 3;
	const availableRecipes = [2, 3, 5, 3, 5];
	const bio =
		'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta ut placeat ea nulla cumque impedit consequatur sit ullam dolorum. Voluptatibus ad aliquam maxime nostrum non aspernatur dolorum similique dolorem consequatur.';

	return (
		<section className='p-6 bg-Primary/20 text-gray-500 font-Popins lg:flex gap-x-5 rounded'>
			<img
				className='h-44 lg:h-52 aspect-square mx-auto rounded-full object-cover'
				src={modelImg}
				alt={`Chef ${name}'s picture`}
			/>
			<div className='h-fit my-auto text-justify'>
				<p className='mt-2 lg:mb-3 text-2xl lg:text-xl text-black text-center font-Vollokorn font-semibold'>
					{name}
				</p>
				<p>{bio}</p>
				<div className='mt-1 text-lg flex justify-between'>
					<p className='flex items-center'>
						<span className='mr-1 text-yellow-500'>
							<FaStar />
						</span>
						{rating}
					</p>
					<p className='flex items-center'>
						<span className='mr-1'>
							<FaBriefcase />
						</span>
						{yearsOfExperience} years
					</p>
					<p className='flex items-center'>
						<span className='mr-1'>
							<MdFastfood />
						</span>
						{availableRecipes.length} recipes
					</p>
				</div>
			</div>
		</section>
	);
}
