import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaAnglesRight } from 'react-icons/fa6';

import { useGetChefsQuery } from '../../../features/chef/chefApi';
import { Spinner } from '../../../shared';
import SearchBar from '../SearchBar';
import './Sidebar.css';

export default function Sidebar({ setHideModal }) {
	// local state
	const [showBar, setShowBar] = useState(false);
	const [pageNumber, setPageNumber] = useState({
		currPage: 1,
		totalPages: null,
	});
	const chefContainerRef = useRef(null);

	const {
		data: chefData,
		isLoading: getChefIsLoading,
		isError: getChefIsIsError,
		error: getChefIsError,
	} = useGetChefsQuery({
		sort: 'name',
		page: pageNumber.currPage,
		limit: 10,
		include: 'name,recipes',
	});

	const { data: chefs } = chefData || {};

	// decide what to render
	let content;

	if (getChefIsLoading) {
		content = <Spinner />;
	} else if (!getChefIsLoading && getChefIsIsError) {
		content = (
			<p className='px-3 py-2 bg-red-200 rounded'>
				{getChefIsError?.data}
			</p>
		);
	} else if (!getChefIsLoading && !getChefIsIsError && chefs?.length === 0) {
		content = <p>No data found.</p>;
	} else if (!getChefIsLoading && !getChefIsIsError && chefs?.length > 0) {
		content = chefs.map((chef) => (
			<NavLink
				key={chef?._id}
				to={`/recipes/${chef?._id}`}
				onClick={() => setShowBar((prev) => !prev)}
				className={({ isActive }) =>
					`p-3 mb-2 font-semibold font-Vollokorn rounded flex justify-between items-center cursor-pointer hover:bg-Primary/70 duration-300 group ${
						isActive
							? 'bg-Primary/90'
							: 'bg-Primary/50 lg:bg-Primary/20'
					}`
				}>
				<span className='capitalize duration-300 group-hover:text-white'>
					{chef?.name}
				</span>
				<span className='px-3 bg-Primary lg:bg-Primary/20 rounded-xl duration-300 group-hover:bg-white'>
					{chef?.recipes?.length > 0 && chef?.recipes?.length}
				</span>
			</NavLink>
		));
	}

	// conditionally update scrollbar styles
	useEffect(() => {
		if (
			chefContainerRef.current?.scrollHeight >
			chefContainerRef.current.clientHeight
		) {
			chefContainerRef.current?.classList.add('sidebar');
			chefContainerRef.current?.classList.remove('remove-sidebar');
		} else {
			chefContainerRef.current?.classList.add('remove-sidebar');
			chefContainerRef.current?.classList.remove('sidebar');
		}

		// Cleanup
		return () => {};
	}, [chefData]);

	useEffect(() => {
		const pNumber = chefData?.meta?.page?.split('/');

		if (pNumber?.length > 0) {
			setPageNumber({
				currPage: parseInt(pNumber[0]),
				totalPages: parseInt(pNumber[1]),
			});
		}
	}, [chefData]);

	return (
		<>
			<p
				className='h-fit bg-Primary/70 pl-3 pr-5 py-2 text-2xl text-slate-700 lg:hidden fixed left-0 top-32	 rounded-r-full duration-300 z-20'
				onClick={() => setShowBar((prev) => !prev)}>
				<FaAnglesRight
					className={showBar ? 'rotate-180' : 'rotate-0'}
				/>
			</p>

			<aside
				className={`h-[34rem] md:h-[35rem] lg:h-screen lg:max-h-[35rem] w-full md:w-2/3 lg:w-[25rem] px-5 py-5 bg-Primary/20 backdrop-blur-lg lg:rounded fixed lg:sticky top-1/2 lg:top-20 -translate-y-1/2 lg:translate-y-0 duration-300 z-10 ${
					showBar
						? 'left-0 md:left-1/2 lg:left-0 md:-translate-x-1/2 lg:translate-x-0'
						: '-left-[100%]'
				}`}>
				<SearchBar setHideModal={setHideModal} />

				<div className='sidebar max-h-[91%]' ref={chefContainerRef}>
					{content}

					{/* Display show more button fetch more data */}
					{pageNumber.currPage < pageNumber.totalPages && (
						<button
							className='w-fit mx-auto mt-3 text-slate-700 font-semibold block rounded'
							onClick={() =>
								setPageNumber((prev) =>
									prev.currPage < prev.totalPages
										? {
												...prev,
												currPage: prev.currPage + 1,
										}
										: prev
								)
							}>
							Show More
						</button>
					)}

					{/* Show error */}
					{getChefIsIsError && (
						<p className='w-full mt-3 py-2 bg-red-200 text-center text-red-700 font-semibold block rounded'>
							{getChefIsError.data}
						</p>
					)}
				</div>
			</aside>
		</>
	);
}
