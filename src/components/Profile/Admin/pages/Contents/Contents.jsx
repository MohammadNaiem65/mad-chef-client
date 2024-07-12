import { useLocation, Outlet, Link } from 'react-router-dom';
import { BiDish, BiSolidDish, BiSupport } from 'react-icons/bi';
import { RiBloggerLine, RiBloggerFill } from 'react-icons/ri';

export default function Contents() {
	// Get the sub pathname of dashboard
	const { pathname } = useLocation();
	const paths = pathname.split('/');
	const subPath = paths?.length > 0 && paths[4];

	return (
		<section className='w-full'>
			{/* Navbar for dashboard page content */}
			<nav className='md:text-lg flex items-center divide-x-2 overflow-x-scroll xl:overflow-auto'>
				<Link
					to='/profile/admin/contents/recipes'
					className={`xl:w-52 px-5 py-2 flex items-center justify-center gap-x-3 hover:bg-Primary/10 ${
						subPath === 'recipes' && 'text-Primary'
					}`}
					title='Recipes'>
					{subPath === 'recipes' ? (
						<BiSolidDish className='text-xl md:text-2xl' />
					) : (
						<BiDish className='text-xl md:text-2xl' />
					)}
					Recipes
				</Link>
				<Link
					to='/profile/admin/contents/blogs'
					className={`xl:w-52 px-5 py-2 flex items-center justify-center gap-x-3 hover:bg-Primary/10 ${
						subPath === 'blogs' && 'text-Primary'
					}`}
					title='Blogs'>
					{subPath === 'blogs' ? (
						<RiBloggerFill className='text-xl md:text-2xl' />
					) : (
						<RiBloggerLine className='text-xl md:text-2xl' />
					)}
					Blogs
				</Link>
				<Link
					to='/profile/admin/contents/consults'
					className={`xl:w-52 px-5 py-2 flex justify-center items-center gap-x-3 hover:bg-Primary/10 ${
						subPath === 'consults' && 'text-Primary'
					}`}
					title='Consults'>
					<BiSupport className='mx-auto md:mx-0 text-2xl' />
					<span className='w-11'>Consults</span>
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
