import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SmActiveLink({ route, setShowNav }) {
	const linkVariant = {
		initial: { y: '5rem', transition: { duration: 0.5 } },
		animate: { y: 0, transition: { duration: 0.3 } },
	};
	return (
		<div className='overflow-hidden'>
			<motion.p
				variants={linkVariant}
				className='capitalize flex justify-center items-center duration-300'
				onClick={() => setShowNav(false)}>
				<NavLink
					to={`/${route}`}
					className={({ isActive }) =>
						isActive ? 'text-Primary' : ''
					}>
					{route}
				</NavLink>
			</motion.p>
		</div>
	);
}
