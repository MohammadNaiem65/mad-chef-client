import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSelectors';

export default function SmActiveLink({
	route,
	setShowHamburger,
	handleLogout,
}) {
	const user = useSelector(selectUser);

	const linkVariant = {
		initial: { y: '5rem', transition: { duration: 0.5 } },
		animate: { y: 0, transition: { duration: 0.3 } },
	};

	return (
		<div className='overflow-hidden'>
			<motion.p
				variants={linkVariant}
				className='capitalize flex justify-center items-center duration-300'
				onClick={() => setShowHamburger((prev) => !prev)}>
				{!(user?.userId && route === 'register') ? (
					<NavLink
						to={`/${route}`}
						className={({ isActive }) =>
							isActive ? 'text-Primary' : ''
						}>
						{route}
					</NavLink>
				) : (
					<button onClick={handleLogout}>Logout</button>
				)}
			</motion.p>
		</div>
	);
}
