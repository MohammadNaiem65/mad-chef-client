import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { lgLogo, smLogo } from '../assets';
import LgActiveLink from './LgActiveLink';
import SmActiveLink from './SmActiveLink';

const routes = ['home', 'recipes', 'dashboard', 'consult', 'blog', 'register'];

export default function Navbar() {
	// local states
	const [showNav, setShowNav] = useState(false);

	const navOptionsVariants = {
		initial: {
			scaleY: 0,
		},
		animate: {
			scaleY: 1,
			transition: {
				duration: 0.7,
				ease: 'anticipate',
			},
		},
		exit: {
			scaleY: 0,
			transition: {
				duration: 0.7,
				delay: 1,
				ease: 'backOut',
			},
		},
	};

	const containerVariants = {
		initial: {
			transition: {
				staggerChildren: 0.1,
				staggerDirection: -1,
			},
		},
		animate: {
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.15,
			},
		},
	};

	return (
		<div className='min-h-[4.625rem] md:min-h-[7rem] px-9 md:px-16 border-b-2 border-slate-300 font-semibold font-Vollokorn text-lg flex justify-between items-center gap-x-6 relative'>
			<Link to='/' className='relative z-[99]'>
				<picture>
					<source media='(min-width:427px)' srcSet={lgLogo} />
					<source media='(max-width:426px)' srcSet={smLogo} />
					<img src={lgLogo} alt='logo' />
				</picture>
			</Link>

			{/* show only in large device */}
			<div className='text-lg hidden md:flex items-center gap-x-6'>
				{routes.slice(0, -1).map((route, index) => (
					<LgActiveLink key={index} route={route} />
				))}
				<Link to='/register' className='btn btn-primary'>
					Register
				</Link>
			</div>

			{/* show only in small device */}
			<AnimatePresence>
				{showNav && (
					<motion.div
						variants={navOptionsVariants}
						initial='initial'
						animate='animate'
						exit='exit'
						className='h-screen w-full text-4xl bg-Secondary absolute inset-0 flex flex-col justify-center items-center origin-top gap-y-5'>
						<motion.div
							variants={containerVariants}
							initial='initial'
							animate='animate'
							exit='initial'>
							{routes.map((route, index) => (
								<SmActiveLink
									key={index}
									route={route}
									setShowNav={setShowNav}
								/>
							))}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* For small device */}
			<div className='md:hidden relative'>
				{!showNav ? (
					<FaBars
						onClick={() => setShowNav((prev) => !prev)}
						className='text-2xl'
					/>
				) : (
					<FaXmark
						onClick={() => setShowNav((prev) => !prev)}
						className='text-2xl'
					/>
				)}
			</div>
		</div>
	);
}
