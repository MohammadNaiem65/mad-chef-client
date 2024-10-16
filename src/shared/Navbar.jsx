// External imports
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from 'framer-motion';
import { FaBars, FaXmark } from 'react-icons/fa6';

// Internal imports
import { lgLogo, smLogo } from '../assets';
import LgActiveLink from './LgActiveLink';
import SmActiveLink from './SmActiveLink';
import { useUnAuthenticateMutation } from '../features/auth/authApi';
import { removeNotifications, showNotification } from '../helpers';
import { useWindowSize } from '../hooks';

// Constants
const ROUTES = ['home', 'recipes', 'profile', 'register'];
const SCROLL_THRESHOLD = 75;

// Animation variants
const navOptionsVariants = {
    initial: { scaleY: 0 },
    animate: {
        scaleY: 1,
        transition: { duration: 0.4, ease: 'anticipate' },
    },
    exit: {
        scaleY: 0,
        transition: { duration: 0.4, delay: 0.3, ease: 'backOut' },
    },
};

const containerVariants = {
    initial: { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
    animate: {
        transition: { delayChildren: 0.15, staggerChildren: 0.15 },
    },
};

export default function Navbar() {
    // Local states
    const [showNavbar, setShowNavbar] = useState(true);
    const [showHamburger, setShowHamburger] = useState(false);

    // Hooks
    const { scrollY } = useScroll();
    const { width } = useWindowSize();
    const { _id: userId } = useSelector((state) => state.user);
    const [unAuthenticate, { isLoading, isSuccess, isError }] =
        useUnAuthenticateMutation();

    // Handle navbar visibility on scroll
    useMotionValueEvent(scrollY, 'change', (value) => {
        const prevValue = scrollY.getPrevious();
        setShowNavbar(value <= prevValue || value <= SCROLL_THRESHOLD);
    });

    // Handle logout success
    useEffect(() => {
        if (isSuccess) {
            removeNotifications();
            showNotification('success', 'Logged out successfully!');
        }
    }, [isSuccess]);

    // Handle logout error
    useEffect(() => {
        if (isError) {
            removeNotifications();
            showNotification(
                'error',
                'Something went wrong! Please try again.'
            );
        }
    }, [isError]);

    // Handle logout
    const handleLogout = useCallback(() => {
        showNotification('loading', 'Logging out...');
        unAuthenticate({ userId });
    }, [unAuthenticate, userId]);

    // Toggle hamburger menu
    const toggleHamburger = useCallback(() => {
        setShowHamburger((prev) => !prev);
    }, []);

    // Render logo
    const renderLogo = () => (
        <Link to='/' className='relative z-[99]'>
            <picture className='md:-my-3'>
                <source media='(min-width:427px)' srcSet={lgLogo} />
                <source media='(max-width:426px)' srcSet={smLogo} />
                <img src={lgLogo} alt='logo' />
            </picture>
        </Link>
    );

    // Render large screen navigation
    const renderLargeNavigation = () => (
        <div className='text-lg hidden lg:flex items-center gap-x-6'>
            {ROUTES.slice(0, -1).map((route, index) => (
                <LgActiveLink key={index} route={route} />
            ))}
            {userId ? (
                <button
                    className='btn btn-primary'
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    Logout
                </button>
            ) : (
                <Link to='/register' className='btn btn-primary'>
                    Register
                </Link>
            )}
        </div>
    );

    // Render small screen navigation
    const renderSmallNavigation = () => (
        <AnimatePresence>
            {showHamburger && (
                <motion.div
                    variants={navOptionsVariants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    className='h-screen w-full text-4xl bg-Secondary absolute inset-0 flex flex-col justify-center items-center origin-top gap-y-5'
                >
                    <motion.div
                        variants={containerVariants}
                        initial='initial'
                        animate='animate'
                        exit='initial'
                    >
                        {ROUTES.map((route, index) => (
                            <SmActiveLink
                                key={index}
                                userId={userId}
                                route={route}
                                setShowHamburger={setShowHamburger}
                                handleLogout={handleLogout}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <motion.section
            variants={{
                visible: { top: 0 },
                hidden: { top: '-100%' },
            }}
            initial={false}
            animate={showNavbar ? 'visible' : 'hidden'}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className='min-h-[4.625rem] md:h-[5.5rem] lg:min-h-[7rem] px-9 md:px-8 lg:px-16 border-b-2 border-slate-300 backdrop-blur-md font-semibold font-Vollkorn text-lg flex justify-between items-center gap-x-6 fixed left-0 right-0 z-[1000]'
        >
            {renderLogo()}
            {width > 768 ? renderLargeNavigation() : renderSmallNavigation()}
            {width <= 768 && (
                <div className='lg:hidden relative'>
                    {showHamburger ? (
                        <FaXmark
                            onClick={toggleHamburger}
                            className='text-2xl'
                        />
                    ) : (
                        <FaBars
                            onClick={toggleHamburger}
                            className='text-2xl'
                        />
                    )}
                </div>
            )}
        </motion.section>
    );
}
