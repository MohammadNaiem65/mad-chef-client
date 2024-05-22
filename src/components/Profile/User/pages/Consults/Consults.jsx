import { useEffect } from 'react';
import { useLocation, useNavigate, Link, Outlet } from 'react-router-dom';
import { FaWpforms } from 'react-icons/fa6';
import { BiSupport } from 'react-icons/bi';
import Sidebar from '../../Sidebar';

export default function Consults() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const paths = pathname.split('/');
	const subPath = paths?.length > 0 && paths[4];

	// By default - navigate to the user to Bookmarks sub-page
	useEffect(() => {
		if (subPath) {
			navigate(`/profile/user/consults/${subPath}`);
		} else {
			navigate('/profile/user/consults/my-consults');
		}
	}, [navigate, subPath]);

	return (
		<section className='border-t border-gray-300 flex'>
			<Sidebar />

			<section className='w-11/12 overflow-hidden'>
				<nav className='text-lg flex items-center divide-x-2'>
					<Link
						to='/profile/user/consults/my-consults'
						className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							subPath === 'my-consults' &&
							'text-Primary bg-Primary/15'
						}`}>
						<BiSupport className={`	text-2xl`} />
						My Consults
					</Link>
					<Link
						to='/profile/user/consults/form'
						className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							subPath === 'form' && 'text-Primary bg-Primary/15'
						}`}>
						{/* {subPath === 'likes' ? (
							<MdFavorite className='text-2xl' />
						) : (
							<MdFavoriteBorder className='text-2xl' />
						)} */}
						<FaWpforms className='text-xl' />
						Form
					</Link>
				</nav>

				<Outlet />
			</section>
		</section>
	);
}
