import { modelImg } from '../../../assets';
import { Rating } from '../../../shared';

export default function Review({ review }) {
	const { rating, message, username, userImg } = review || {};

	return (
		<div className='h-72 md:h-80 w-[88vw] md:w-96 relative rounded overflow-hidden'>
			<img
				src={userImg ? userImg : modelImg}
				alt=''
				className='w-full h-full object-cover'
			/>
			<div className='w-full h-full flex justify-center items-end text-white bg-gradient-to-t from-black to-transparent to-80% absolute inset-0'>
				<div className='text-center text-xs mb-5 px-3'>
					<h3 className='font-Popins'>{`"${message}"`}</h3>
					<p className='text-sm font-Vollkorn font-semibold mt-1'>
						- {username}
					</p>
					<p className='w-fit text-yellow-300 md:text-lg flex items-center gap-[2px] mx-auto mt-1'>
						<Rating rating={rating} />
					</p>
				</div>
			</div>
		</div>
	);
}
