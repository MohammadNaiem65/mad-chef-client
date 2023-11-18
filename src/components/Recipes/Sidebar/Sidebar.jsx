import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaAnglesRight } from 'react-icons/fa6';
import './Sidebar.css';

const chefs = [
	{ name: 'hero', recipes: 3 },
	{ name: 'alam', recipes: 4 },
	{ name: 'bonita', recipes: 8 },
	{ name: 'sijuka', recipes: 1 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
	{ name: 'doreamon', recipes: 2 },
];

export default function Sidebar() {
	// local state
	const [showBar, setShowBar] = useState(false);

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
				className={`h-screen lg:max-h-[35rem] w-full md:w-2/3 lg:w-[25rem] px-3 py-5 bg-Primary/20 backdrop-blur-lg lg:rounded fixed lg:sticky top-0 lg:top-20 duration-300 z-10 ${
					showBar ? 'left-0 md:left-1/2 md:-translate-x-1/2' : '-left-[100%]'
				}`}>
				<div className='sidebar h-full px-2 overflow-y-scroll'>
					{chefs.map((chef, index) => (
						<NavLink
							key={index}
							to={`/recipes/${chef.recipes}`}
							onClick={() => setShowBar((prev) => !prev)}
							className={({ isActive }) =>
								`p-3 mb-2 font-semibold font-Vollokorn rounded flex justify-between items-center cursor-pointer hover:bg-Primary/70 ${
									isActive
										? 'bg-Primary/90'
										: 'bg-Primary/50 lg:bg-Primary/40'
								}`
							}>
							<span>{chef.name}</span>
							<span className='px-3 bg-Primary lg:bg-Primary/60 rounded-xl'>
								{chef.recipes}
							</span>
						</NavLink>
					))}
				</div>
			</aside>
		</>
	);
}
