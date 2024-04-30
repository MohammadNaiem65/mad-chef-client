export default function Avatar() {
	return (
		<div className='w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0'>
			<svg
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				className='w-10 h-10'
				viewBox='0 0 24 24'>
				<path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2'></path>
				<circle cx='12' cy='7' r='4'></circle>
			</svg>
		</div>
	);
}
