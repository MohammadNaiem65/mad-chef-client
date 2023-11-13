import { modelImg } from '../../../assets';
import { Rating } from '../../../shared';

export default function Review({ count }) {
	const feedback =
		'"I made a delicious beef stir fry for dinner and it was amazing! The beef was tender and the vegetables were perfectly cooked."';
	const rating = 5;
	const name = 'Naiem';

	return (
		<div className='review h-72 w-[88vw] relative'>
			<img src={modelImg} alt='' className='w-full h-full object-cover' />
			<div className='w-full h-full flex justify-center items-end text-white bg-gradient-to-t from-black to-transparent to-80% absolute inset-0'>
				<div className='text-center text-xs mb-5 px-3'>
					<h3 className='font-Popins'>{`"${feedback}"`}</h3>
					<p className='text-sm font-Vollokorn font-semibold mt-1'>
						- {name}
					</p>
					<p className='w-fit text-yellow-300 md:text-lg flex items-center gap-[2px] mx-auto mt-1'>
						<Rating rating={rating} />
					</p>
				</div>
			</div>
		</div>
	);
}
