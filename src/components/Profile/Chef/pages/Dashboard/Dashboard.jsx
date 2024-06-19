import { useLocation, Outlet, Link } from 'react-router-dom';
import { FaCommentDots, FaRegCommentDots } from 'react-icons/fa6';
import { TbBowlSpoon, TbBowlSpoonFilled } from 'react-icons/tb';
import { MdReviews, MdOutlineReviews } from 'react-icons/md';

export default function Dashboard() {
	// Get the sub pathname of dashboard
	const { pathname } = useLocation();
	const paths = pathname.split('/');
	const subPath = paths?.length > 0 && paths[4];

	return (
		<section className='w-full'>
			{/* Navbar for dashboard page content */}
			<nav className='md:text-lg flex items-center divide-x-2 overflow-x-scroll xl:overflow-auto'>
				<Link
					to='/profile/chef/dashboard/recipes'
					className={`md:w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
						subPath === 'recipes' && 'text-Primary'
					}`}
					title='Recipes'>
					{subPath === 'recipes' ? (
						<TbBowlSpoonFilled className='text-xl md:text-2xl' />
					) : (
						<TbBowlSpoon className='text-xl md:text-2xl' />
					)}
					<span className='w-24 md:w-32 xl:w-auto'>Recipes</span>
				</Link>
				<Link
					to='/profile/chef/dashboard/comments'
					className={`md:w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
						subPath === 'comments' && 'text-Primary'
					}`}
					title='Comments'>
					{subPath === 'comments' ? (
						<FaCommentDots className='text-xl md:text-2xl' />
					) : (
						<FaRegCommentDots className='text-xl md:text-2xl' />
					)}
					<span className='w-24 md:w-32 xl:w-auto'>Comments</span>
				</Link>
				<Link
					to='/profile/chef/dashboard/reviews'
					className={`md:w-52 px-5 py-2 flex items-center gap-x-3 hover:bg-Primary/10 ${
						subPath === 'reviews' && 'text-Primary'
					}`}
					title='Reviews'>
					{subPath === 'reviews' ? (
						<MdReviews className='text-xl md:text-2xl' />
					) : (
						<MdOutlineReviews className='text-xl md:text-2xl' />
					)}
					<span className='w-24 md:w-32 xl:w-auto'>Reviews</span>
				</Link>
			</nav>

			{!subPath && (
				<p className='mt-36 text-center text-slate-600 text-xl font-semibold'>
					Click on an option to see any content!
				</p>
			)}

			{/* Main content */}
			<Outlet />
		</section>
	);
}
