import { NavLink } from 'react-router-dom';

export default function ActiveLink({ children, to }) {
	return (
		<p className='relative after:content-[""] after:h-1 after:w-[130%] after:bg-Primary after:rounded-full after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:duration-300'>
			<NavLink
				to={to}
				className={({ isActive }) => (isActive ? 'text-Primary' : '')}>
				{children}
			</NavLink>
		</p>
	);
}
