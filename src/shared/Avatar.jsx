export default function Avatar() {
	return (
		<div className='size-full inline-flex items-center justify-center rounded-full bg-Primary/10 text-Primary/50 flex-shrink-0'>
			<svg
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				className='size-[62.5%]'
				viewBox='0 0 24 24'>
				<path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2'></path>
				<circle cx='12' cy='7' r='4'></circle>
			</svg>
		</div>
	);
}
