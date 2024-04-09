export default function Pagination({
	margin = 5,
	activePage = 1,
	totalPages = 1,
}) {
	const pages = Array.from(
		{ length: totalPages > 0 ? totalPages : 1 },
		(_, index) => (
			<p
				key={index}
				className={`size-7 mx-1 p-1 flex items-center justify-center rounded-full cursor-pointer ${
					activePage === index + 1
						? 'bg-Primary font-semibold text-white'
						: 'bg-Primary/30 text-slate-700'
				}`}>
				{index + 1}
			</p>
		)
	);

	return (
		<section className={`w-full my-${margin}`}>
			<div className='w-fit mx-auto flex items-center'>{pages}</div>
		</section>
	);
}
