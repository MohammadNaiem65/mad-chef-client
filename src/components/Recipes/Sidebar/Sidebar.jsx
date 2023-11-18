import { NavLink } from 'react-router-dom';
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
	return (
		<aside className='max-h-[35rem] w-[25rem] px-3 py-5 bg-Primary/20 rounded sticky top-20'>
			<div className='sidebar h-full px-2 overflow-y-scroll'>
				{chefs.map((chef, index) => (
					<NavLink
						key={index}
						to={`/recipes/${chef.recipes}`}
						className={({ isActive }) =>
							`p-3 mb-2 font-semibold font-Vollokorn rounded flex justify-between items-center cursor-pointer hover:bg-Primary/70 ${
								isActive ? 'bg-Primary/90' : 'bg-Primary/40'
							}`
						}>
						<span>{chef.name}</span>
						<span className='px-3 bg-Primary/60 rounded-xl'>
							{chef.recipes}
						</span>
					</NavLink>
				))}
			</div>
		</aside>
	);
}