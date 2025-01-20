import { NavLink } from 'react-router-dom';

export default function LgActiveLink({ route, currLocation }) {
    return (
        <p className='relative capitalize after:content-[""] after:h-1 after:w-[130%] after:bg-Primary after:rounded-full after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:duration-300'>
            <NavLink
                to={`/${route}`}
                className={({ isActive }) =>
                    (isActive && route !== 'profile') ||
                    (isActive &&
                        route === 'profile' &&
                        !currLocation.includes('messages'))
                        ? 'text-Primary'
                        : ''
                }
            >
                {route}
            </NavLink>
        </p>
    );
}
