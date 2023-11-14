import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from 'framer-motion';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { lgLogo, smLogo } from '../assets';
import LgActiveLink from './LgActiveLink';
import SmActiveLink from './SmActiveLink';

const routes = ['home', 'recipes', 'dashboard', 'consult', 'blog', 'register'];

export default function Navbar() {
	// local states
	const [showNavbar, setShowNavbar] = useState(true);
	const [showHamburger, setShowHamburger] = useState(false);

	// hooks
	const { scrollY } = useScroll();

	// show or hide navigation on scroll
	useMotionValueEvent(scrollY, 'change', (value) => {
		const prevValue = scrollY.getPrevious();

		if (value > prevValue && value > 75) {
			setShowNavbar(false);
		} else {
			setShowNavbar(true);
		}
	});

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
				duration: 0.6,
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
		<motion.section
			variants={{
				visible: {
					top: 0,
				},
				hidden: {
					top: '-100%',
				},
			}}
			initial={false}
			animate={showNavbar ? 'visible' : 'hidden'}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			className='min-h-[4.625rem] md:h-[5.5rem] lg:min-h-[7rem] px-9 md:px-8 lg:px-16 border-b-2 border-slate-300 backdrop-blur-md font-semibold font-Vollokorn text-lg flex justify-between items-center gap-x-6 fixed left-0 right-0 z-[1000]'>
			<Link to='/' className='relative z-[99]'>
				<picture className='md:-my-3'>
					<source media='(min-width:427px)' srcSet={lgLogo} />
					<source media='(max-width:426px)' srcSet={smLogo} />
					<img src={lgLogo} alt='logo' />
				</picture>
			</Link>

			{/* show only in large device */}
			<div className='text-lg hidden lg:flex items-center gap-x-6'>
				{routes.slice(0, -1).map((route, index) => (
					<LgActiveLink key={index} route={route} />
				))}
				<Link to='/register' className='btn btn-primary'>
					Register
				</Link>
			</div>

			{/* show only in small device */}
			<AnimatePresence>
				{showHamburger && (
					<motion.div
						variants={navOptionsVariants}
						initial='initial'
						animate='animate'
						exit='exit'
						className='h-screen w-full text-4xl bg-Secondary absolute inset-0 flex flex-col justify-center items-center origin-top gap-y-5 '>
						<motion.div
							variants={containerVariants}
							initial='initial'
							animate='animate'
							exit='initial'>
							{routes.map((route, index) => (
								<SmActiveLink
									key={index}
									route={route}
									setShowHamburger={setShowHamburger}
								/>
							))}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* For small device */}
			<div className='lg:hidden relative'>
				{!showHamburger ? (
					<FaBars
						onClick={() => setShowHamburger((prev) => !prev)}
						className='text-2xl'
					/>
				) : (
					<FaXmark
						onClick={() => setShowHamburger((prev) => !prev)}
						className='text-2xl'
					/>
				)}
			</div>
		</motion.section>
	);
}
