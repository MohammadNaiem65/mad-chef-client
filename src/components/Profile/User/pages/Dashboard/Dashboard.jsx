import { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
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
	const { pathname } = useLocation();
	const paths = pathname.split('/');
	const subPath = paths?.length > 0 && paths[4];

	// By default - navigate to the user to Bookmarks sub-page
	const navigate = useNavigate();
	useEffect(() => {
		if (subPath === undefined) {
			navigate('/profile/user/dashboard/bookmarks');
		}
	}, [navigate, subPath]);

	return (
		<section className='border-t border-gray-300 flex'>
			{/* Sidebar */}
			<Sidebar />

			<section className='w-full'>
				{/* Navbar for dashboard page content */}
				<nav className='text-lg flex items-center divide-x-2'>
					<Link
						to='/profile/user/dashboard/bookmarks'
						className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							subPath === 'bookmarks' && 'text-Primary'
						}`}>
						{subPath === 'bookmarks' ? (
							<FaBookmark />
						) : (
							<FaRegBookmark />
						)}
						Bookmarks
					</Link>
					<Link
						to='/profile/user/dashboard/likes'
						className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							subPath === 'likes' && 'text-Primary'
						}`}>
						{subPath === 'likes' ? (
							<MdFavorite className='text-2xl' />
						) : (
							<MdFavoriteBorder className='text-2xl' />
						)}
						Likes
					</Link>
					<Link
						to='/profile/user/dashboard/recipe-ratings'
						className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							subPath === 'recipe-ratings' && 'text-Primary'
						}`}>
						{subPath === 'recipe-ratings' ? (
							<FaStar className='text-2xl' />
						) : (
							<FaRegStar className='text-2xl' />
						)}
						Recipe Ratings
					</Link>
					<Link
						to='/profile/user/dashboard/chef-reviews'
						className={`w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
							subPath === 'chef-reviews' && 'text-Primary'
						}`}>
						{subPath === 'chef-reviews' ? (
							<MdRateReview className='text-2xl' />
						) : (
							<MdOutlineRateReview className='text-2xl' />
						)}
						Chef Reviews
					</Link>
				</nav>

				{/* Main content */}
				<Outlet />
			</section>
		</section>
	);
}
