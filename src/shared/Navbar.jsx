// external imports
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from 'framer-motion';
import { FaBars, FaXmark } from 'react-icons/fa6';

// internal imports
import { lgLogo, smLogo } from '../assets';
import LgActiveLink from './LgActiveLink';
import SmActiveLink from './SmActiveLink';
import { selectUser } from '../features/auth/authSelectors';
import { useUnAuthenticateMutation } from '../features/auth/authApi';
import showNotification from '../helpers/showNotification';
import removeNotifications from '../helpers/removeNotifications';

export default function Navbar() {
    // Local states
    const routes = ['home', 'recipes', 'profile', 'blog', 'register'];
    const [showNavbar, setShowNavbar] = useState(true);
    const [showHamburger, setShowHamburger] = useState(false);

    // Hooks
    const { scrollY } = useScroll();
    const user = useSelector(selectUser);
    const [unAuthenticate, { isLoading, isSuccess, isError }] =
        useUnAuthenticateMutation();

    // Show or hide navigation bar on scroll
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
                delay: 0.3,
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

    // handle success state
    useEffect(() => {
        if (isSuccess) {
            removeNotifications();
            showNotification('success', 'Logged out successfully!');
        }
    }, [isSuccess]);

    // handle error state
    useEffect(() => {
        if (isError) {
            removeNotifications();
            showNotification(
                'error',
                'Something went wrong! Please try again.'
            );
        }
    }, [isError]);

    // handle logout
    const handleLogout = () => {
        showNotification('loading', 'Logging out...');
        unAuthenticate({ userId: user?.userId });
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
            className='min-h-[4.625rem] md:h-[5.5rem] lg:min-h-[7rem] px-9 md:px-8 lg:px-16 border-b-2 border-slate-300 backdrop-blur-md font-semibold font-Vollkorn text-lg flex justify-between items-center gap-x-6 fixed left-0 right-0 z-[1000]'
        >
            <Link to='/' className='relative z-[99]'>
                <picture className='md:-my-3'>
                    <source media='(min-width:427px)' srcSet={lgLogo} />
                    <source media='(max-width:426px)' srcSet={smLogo} />
                    <img src={lgLogo} alt='logo' />
                </picture>
            </Link>

            {/* Show only in large device */}
            <div className='text-lg hidden lg:flex items-center gap-x-6'>
                {routes.slice(0, -1).map((route, index) => (
                    <LgActiveLink key={index} route={route} />
                ))}

                {/* Conditionally set Register and logout button */}
                {user?.userId ? (
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

            {/* Show only in small device */}
            <AnimatePresence>
                {showHamburger && (
                    <motion.div
                        variants={navOptionsVariants}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        className='h-screen w-full text-4xl bg-Secondary absolute inset-0 flex flex-col justify-center items-center origin-top gap-y-5 '
                    >
                        <motion.div
                            variants={containerVariants}
                            initial='initial'
                            animate='animate'
                            exit='initial'
                        >
                            {routes.map((route, index) => (
                                <SmActiveLink
                                    key={index}
                                    route={route}
                                    setShowHamburger={setShowHamburger}
                                    handleLogout={handleLogout}
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
