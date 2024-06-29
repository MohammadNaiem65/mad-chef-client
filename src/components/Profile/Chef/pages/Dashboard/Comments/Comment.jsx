import { Avatar, Rating } from '../../../../../../shared';

export default function Comment() {
	const img = false;
	const name = 'Jhon Doe';

	return (
		<div className='w-full lg:w-[27rem] mx-auto lg:mx-0 group'>
			<div className='flex border-2 rounded-lg border-gray-200 border-opacity-50 px-5 py-4 md:p-8 sm:flex-row flex-col hover:shadow-xl duration-300'>
				{/* Conditional rendering of userImg or Avatar */}
				{img ? (
					<img
						src={img}
						alt={name}
						className='w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full flex-shrink-0'
					/>
				) : (
					<div className='size-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 overflow-hidden'>
						<Avatar />
					</div>
				)}

				<div className='flex-grow'>
					<h2 className='text-gray-900 text-lg font-medium mb-1'>
						{name}
					</h2>
					<div className='text-yellow-500 flex gap-x-1'>
						{<Rating rating={5} />}
					</div>
					<p className='w-60 mt-3 leading-relaxed text-justify text-gray-400 line-clamp-3 group-hover:line-clamp-none'>
						{'message'}
					</p>
				</div>
			</div>
		</div>
	);
}
