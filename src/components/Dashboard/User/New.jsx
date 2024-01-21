let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];

export default function New() {
	return (
		<section className='h-52 w-screen bg-red-800 flex gap-x-5 overflow-x-scroll'>
			{arr.map((el) => (
				<div className='h-20 w-64 bg-blue-300' key={el} />
			))}
		</section>
	);
}
