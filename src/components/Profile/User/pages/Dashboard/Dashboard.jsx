import { useEffect } from 'react';
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import { FaRegBookmark, FaBookmark, FaRegStar, FaStar } from 'react-icons/fa6';
import {
	MdFavoriteBorder,
	MdFavorite,
	MdOutlineRateReview,
	MdRateReview,
} from 'react-icons/md';
import Sidebar from '../../Sidebar';

export default function Dashboard() {
	// Get the sub pathname of dashboard
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;
	const paths = pathname.split('/');
	const mainPath = pathname.split('/')?.length && pathname.split('/')[3];
	const subPath = paths?.length > 0 && paths[4];

	useEffect(() => {
		// By default navigate the user to Bookmarks Sub Page or else send to the required page
		if (mainPath === 'dashboard' && subPath) {
			navigate(`/profile/user/${mainPath}/${subPath}`);
		} else if (mainPath === 'dashboard' && !subPath) {
			navigate('/profile/user/dashboard/bookmarks');
		}
	}, [navigate, mainPath, subPath]);

	return (
		<section className='w-full border-t border-gray-300 flex'>
			{/* Sidebar */}
			<Sidebar />

			<section className='w-[88%] md:w-3/4'>
				{/* Navbar for dashboard page content */}
				<nav className='md:text-lg flex items-center divide-x-2 overflow-x-scroll xl:overflow-auto'>
					<Link
						to='/profile/user/dashboard/bookmarks'
						className={`xl:w-52 px-5 py-2 flex items-center justify-center gap-x-3 hover:bg-Primary/10 ${
							subPath === 'bookmarks' && 'text-Primary'
						}`}
						title='Bookmarks'>
						{subPath === 'bookmarks' ? (
							<FaBookmark />
						) : (
							<FaRegBookmark />
						)}
						Bookmarks
					</Link>
					<Link
						to='/profile/user/dashboard/likes'
						className={`xl:w-52 px-5 py-2 flex justify-center items-center gap-x-3 hover:bg-Primary/10 ${
							subPath === 'likes' && 'text-Primary'
						}`}
						title='Likes'>
						{subPath === 'likes' ? (
							<MdFavorite className='text-xl md:text-2xl' />
						) : (
							<MdFavoriteBorder className='text-xl md:text-2xl' />
						)}
						<span className='w-11'>Likes</span>
					</Link>
					<Link
						to='/profile/user/dashboard/recipe-ratings'
						className={`md:w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							subPath === 'recipe-ratings' && 'text-Primary'
						}`}
						title='Recipe Ratings'>
						{subPath === 'recipe-ratings' ? (
							<FaStar className='text-xl md:text-2xl' />
						) : (
							<FaRegStar className='text-xl md:text-2xl' />
						)}
						<span className='w-28 md:w-32 xl:w-auto'>Recipe Ratings</span>
					</Link>
					<Link
						to='/profile/user/dashboard/chef-reviews'
						className={`md:w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							subPath === 'chef-reviews' && 'text-Primary'
						}`}
						title='Chef Reviews'>
						{subPath === 'chef-reviews' ? (
							<MdRateReview className='text-xl md:text-2xl' />
						) : (
							<MdOutlineRateReview className='text-xl md:text-2xl' />
						)}
						<span className='w-24 md:w-32 xl:w-auto'>Chef Reviews</span>
					</Link>
				</nav>

				{/* Main content */}
				<Outlet />
			</section>
		</section>
	);
}
