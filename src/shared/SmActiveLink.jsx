import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SmActiveLink({
    route,
    text,
    userId,
    currLocation,
    setShowHamburger,
    handleLogout,
}) {
    const linkVariant = {
        initial: { y: '5rem', transition: { duration: 0.4 } },
        animate: { y: 0, transition: { duration: 0.4 } },
    };

    console.log(route, currLocation);

    return (
        <div className='overflow-hidden'>
            <motion.p
                variants={linkVariant}
                className='capitalize flex justify-center items-center duration-300'
                onClick={() => setShowHamburger((prev) => !prev)}
            >
                {!(userId && route === 'register') ? (
                    <NavLink
                        to={`/${route}`}
                        className={
                            (route !== 'profile' &&
                                currLocation.includes(route)) ||
                            (route === 'profile' &&
                                !currLocation.includes('messages'))
                                ? 'text-Primary'
                                : ''
                        }
                    >
                        {text}
                    </NavLink>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </motion.p>
        </div>
    );
}
