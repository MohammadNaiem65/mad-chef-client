import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import {
	TbSortAscendingLetters,
	TbSortDescendingLetters,
} from 'react-icons/tb';
import { filterWithOptions } from '../../features/recipe/recipeFilterSlice';

export default function FilterModal({ setHideModal }) {
	// Search filter options
	const filterByDate = ['today', 'this month', 'this year'];
	const filterByRegion = [
		'asia',
		'europe',
		'america',
		'latin america',
		'africa',
		'middle east',
	];
	const sortByOptions = ['upload date', 'like', 'rating'];

	const [selectedOptions, setSelectedOptions] = useState({
		uploadDate: null,
		region: null,
		sortBy: null,
		sortOrder: null,
	});

	const dispatch = useDispatch();
	const { uploadDate, region, sortBy, sortOrder } = useSelector(
		(state) => state.recipeFilter
	);

	const handleFilter = () => {
		dispatch(filterWithOptions(selectedOptions));
		setHideModal(true);
	};

	return (
		<section
			className='h-screen w-screen bg-black/40 backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 z-50'
			onClick={() => setHideModal(true)}>
			<div
				className='w-full md:w-11/12 lg:w-[50rem] md:h-[28rem] px-6 py-8 bg-Primary text-slate-700 rounded'
				onClick={(e) => e.stopPropagation()}>
				<div className='mb-5 md:mb-7 flex items-center justify-between'>
					<h3 className='text-xl font-semibold font-Vollokorn'>
						Search Filters
					</h3>
					<RxCross1
						onClick={() => setHideModal(true)}
						className='text-2xl cursor-pointer'
					/>
				</div>
				<div className='grid grid-cols-12'>
					{/* Filter by date options */}
					<div className='w-36 col-span-6 md:col-span-4'>
						<h4 className='font-semibold mb-3 pb-3 border-b-2'>
							UPLOAD DATE
						</h4>
						{filterByDate.map((op, ind) => (
							<p
								key={ind}
								onClick={() =>
									setSelectedOptions((prev) => ({
										...prev,
										uploadDate: op,
									}))
								}
								className={`w-fit font-Popins cursor-pointer capitalize duration-300 hover:text-white ${
									(uploadDate ||
										selectedOptions.uploadDate) === op &&
									'text-white'
								}`}>
								{op}
							</p>
						))}
					</div>

					{/* Region options */}
					<div className='w-36 col-span-6 md:col-span-4'>
						<h4 className='font-semibold mb-3 pb-3 border-b-2'>
							REGION
						</h4>
						{filterByRegion.map((op, ind) => (
							<p
								key={ind}
								onClick={() =>
									setSelectedOptions((prev) => ({
										...prev,
										region: op,
									}))
								}
								className={`w-fit font-Popins capitalize cursor-pointer duration-300 hover:text-white ${
									(region || selectedOptions.region) === op &&
									'text-white'
								}`}>
								{op}
							</p>
						))}
					</div>

					{/* Sort options */}
					<div className='w-full md:w-36 mt-5 md:mt-0 col-span-12 md:col-span-4 grid grid-cols-2'>
						<div className='w-36 col-span-1 md:col-span-2'>
							<h4 className='font-semibold mb-3 pb-3 border-b-2'>
								SORT BY
							</h4>
							{sortByOptions.map((op, ind) => (
								<p
									key={ind}
									onClick={() =>
										setSelectedOptions((prev) => ({
											...prev,
											sortBy: op,
										}))
									}
									className={`w-fit font-Popins capitalize cursor-pointer duration-300 hover:text-white ${
										(sortBy || selectedOptions.sortBy) ===
											op && 'text-white'
									}`}>
									{op}
								</p>
							))}
						</div>

						<div className='w-36 md:mt-10 col-span-1 md:col-span-2'>
							<h4 className='font-semibold mb-3 pb-3 border-b-2'>
								SORT ORDER
							</h4>
							<p
								className={`w-fit font-Popins flex items-center cursor-pointer duration-300 hover:text-white ${
									(sortOrder || selectedOptions.sortOrder) ===
										'asc' && 'text-white'
								}`}
								onClick={() =>
									setSelectedOptions((prev) => ({
										...prev,
										sortOrder: 'asc',
									}))
								}>
								<TbSortAscendingLetters className='text-2xl mr-1' />
								Ascending
							</p>
							<p
								className={`w-fit font-Popins flex items-center cursor-pointer duration-300 hover:text-white ${
									(sortOrder || selectedOptions.sortOrder) ===
										'desc' && 'text-white'
								}`}
								onClick={() =>
									setSelectedOptions((prev) => ({
										...prev,
										sortOrder: 'desc',
									}))
								}>
								<TbSortDescendingLetters className='text-2xl mr-1' />
								Descending
							</p>
						</div>
					</div>
				</div>
				<button
					onClick={handleFilter}
					className='mx-auto mt-6 px-7 py-2 border-2 block border-transparent text-lg text-center bg-white text-Primary font-semibold rounded-full cursor-pointer duration-300 hover:bg-Primary hover:text-white hover:border-white'>
					Apply
				</button>
			</div>
		</section>
	);
}
