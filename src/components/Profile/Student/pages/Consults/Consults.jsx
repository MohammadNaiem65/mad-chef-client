import { useEffect } from 'react';
import { useLocation, useNavigate, Link, Outlet } from 'react-router-dom';
import { FaWpforms } from 'react-icons/fa6';
import { BiSupport } from 'react-icons/bi';
import { Helmet } from 'react-helmet-async';

export default function Consults() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const paths = pathname.split('/');
    const subPath = paths?.length > 0 && paths[4];

    // By default - navigate the user to my-consults sub-page by default
    useEffect(() => {
        if (subPath) {
            navigate(`/profile/student/consults/${subPath}`);
        } else {
            navigate('/profile/student/consults/my-consults');
        }
    }, [navigate, subPath]);

    return (
        <>
            <Helmet>
                <title>Consults | Profile - Mad Chef</title>
            </Helmet>

            <section className='w-full overflow-hidden'>
                <nav className='text-lg flex items-center divide-x-2'>
                    <Link
                        to='/profile/student/consults/my-consults'
                        className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
                            subPath === 'my-consults' && 'text-Primary'
                        }`}
                    >
                        <BiSupport className={`	text-2xl`} />
                        My Consults
                    </Link>
                    <Link
                        to='/profile/student/consults/form'
                        className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
                            subPath === 'form' && 'text-Primary'
                        }`}
                    >
                        <FaWpforms className='text-xl' />
                        Form
                    </Link>
                </nav>

                <Outlet />
            </section>
        </>
    );
}
