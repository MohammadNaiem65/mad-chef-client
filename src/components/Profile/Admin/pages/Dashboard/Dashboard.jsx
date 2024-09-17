import { useLocation, Outlet, Link } from 'react-router-dom';
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { PiChefHatLight, PiChefHatFill } from 'react-icons/pi';
import { SiGoogleforms, SiReacthookform } from 'react-icons/si';

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
					to='/profile/admin/dashboard/users'
					className={`xl:w-52 px-5 py-2 flex items-center justify-center gap-x-3 hover:bg-Primary/10 ${
						subPath === 'users' && 'text-Primary'
					}`}
					title='Users'>
					{subPath === 'users' ? (
						<FaUserCircle className='text-xl md:text-2xl' />
					) : (
						<FaRegUserCircle className='text-xl md:text-2xl' />
					)}
					Users
				</Link>
				<Link
					to='/profile/admin/dashboard/chefs'
					className={`xl:w-52 px-5 py-2 flex justify-center items-center gap-x-3 hover:bg-Primary/10 ${
						subPath === 'chefs' && 'text-Primary'
					}`}
					title='Chefs'>
					{subPath === 'chefs' ? (
						<PiChefHatFill className='text-xl md:text-2xl' />
					) : (
						<PiChefHatLight className='text-xl md:text-2xl' />
					)}
					<span className='w-11'>Chefs</span>
				</Link>
				<Link
					to='/profile/admin/dashboard/promotion-applications'
					className={`md:w-72 px-5 py-2 flex justify-center items-center gap-x-3 hover:bg-Primary/10${
						subPath === 'promotion-applications' && 'text-Primary'
					}`}
					title='Promotion Applications'>
					{subPath === 'promotion-applications' ? (
						<SiGoogleforms className='text-xl md:text-2xl' />
					) : (
						<SiReacthookform className='text-xl md:text-2xl' />
					)}
					<span className='w-48 md:w-full'>Promotion Applications</span>
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
