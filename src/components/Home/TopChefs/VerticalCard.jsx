import { ArrowLink, Rating } from '../../../shared';

export default function VerticalCard({ chef }) {
	const { _id, name, img, rating, yearsOfExperience, recipes } = chef || {};

	return (
		<div className='h-[22rem] font-semibold flex flex-col justify-between relative rounded overflow-hidden'>
			<img
				src={img}
				alt={`image of chef ${name}`}
				className='h-60 w-full object-cover object-center'
			/>
			<div className='h-28 px-5 md:px-2 py-2 bg-white text-slate-500 relative'>
				<div className='w-[7.25rem] h-12 bg-white grid place-items-center absolute left-0 -top-12 rounded-tr'>
					<p className='px-1 py-[0.375rem] bg-Primary text-yellow-300 flex items-center gap-x-[2px] rounded'>
						{<Rating rating={rating} />}
					</p>
				</div>

				<h3 className='text-lg text-black mt-2'>{name}</h3>
				<p>Experience: {yearsOfExperience} Years</p>
				<div className='flex justify-between items-center relative z-20'>
					<p>Recipes: {recipes?.length}</p>

					<ArrowLink to={`/recipes/${_id}`} />
				</div>

				{/* Right-Bottom blob */}
				<div className='shape-bg-one h-36 aspect-square bg-Primary bg-opacity-20 absolute -right-6 -bottom-16 z-10' />
			</div>
		</div>
	);
}
