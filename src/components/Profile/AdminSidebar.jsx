import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { AiOutlineDashboard, AiFillDashboard } from 'react-icons/ai';
import { BsCreditCard2Front, BsCreditCard2FrontFill } from 'react-icons/bs';
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { IoBookOutline, IoBook } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';

import { showNotification } from '../../helpers';
import { useUnAuthenticateMutation } from '../../features/auth/authApi';

export default function AdminSidebar() {
	// Get the sub pathname of profile page
	const { pathname } = useLocation();
	const paths = pathname.split('/');
	const mainPath = paths?.length > 0 && paths[3];

	const { _id: userId } = useSelector((state) => state.user);
	const [unAuthenticate, { isLoading }] = useUnAuthenticateMutation();

	// handle logout
	const handleLogout = () => {
		showNotification('promise', 'Logged out successfully!', {
			promise: unAuthenticate({ userId }),
			successMessage: 'Logged out successfully!',
			errorMessage: 'Something went wrong! Please try again.',
		});
	};

	return (
		<aside className='w-[12%] md:w-1/4 py-3 border-r border-gray-300 font-Popins text-lg'>
			<div className='min-h-[17.25rem]'>
				<Link
					to='/profile/admin/dashboard'
					className={`h-11 md:py-2 flex items-center gap-x-2 xl:rounded-tl xl:rounded-bl hover:bg-Primary/20 ${
						mainPath === 'dashboard'
							? 'bg-blue-300 md:px-5'
							: 'md:px-3'
					}`}
					title='Dashboard'>
					{mainPath === 'dashboard' ? (
						<AiFillDashboard className='mx-auto md:mx-0 text-3xl md:text-2xl' />
					) : (
						<AiOutlineDashboard className='mx-auto md:mx-0 text-3xl md:text-2xl' />
					)}
					<span className='hidden md:inline'>Dashboard</span>
				</Link>
				<Link
					to='/profile/admin/contents'
					className={`h-11 md:py-2 flex items-center gap-x-2 xl:rounded-tl xl:rounded-bl hover:bg-Primary/20 ${
						mainPath === 'contents'
							? 'bg-blue-300 md:px-5'
							: 'md:px-3'
					}`}
					title='Messages'>
					{mainPath === 'contents' ? (
						<IoBook className='mx-auto md:mx-0 text-3xl md:text-2xl' />
					) : (
						<IoBookOutline className='mx-auto md:mx-0 text-3xl md:text-2xl' />
					)}
					<span className='hidden md:inline'>Contents</span>
				</Link>
				<Link
					to='/profile/admin/payments'
					className={`h-11 md:py-2 flex items-center gap-x-2 xl:rounded-tl xl:rounded-bl hover:bg-Primary/20 ${
						mainPath === 'payments'
							? 'bg-blue-300 md:px-5'
							: 'md:px-3'
					}`}
					title='Consults'>
					{mainPath === 'payments' ? (
						<BsCreditCard2FrontFill className='mx-auto md:mx-0 text-2xl' />
					) : (
						<BsCreditCard2Front className='mx-auto md:mx-0 text-2xl' />
					)}
					<span className='hidden md:inline'>Payments</span>
				</Link>
			</div>
			<Link
				to='/profile/admin/my-profile'
				className={`h-11 md:py-2 border-t border-gray-300 flex items-center gap-x-2 xl:rounded-tl xl:rounded-bl hover:bg-Primary/20 ${
					mainPath === 'my-profile'
						? 'bg-blue-300 md:px-5'
						: 'md:px-3 '
				}`}
				title='My Profile'>
				{mainPath === 'my-profile' ? (
					<FaUserCircle className='mx-auto md:mx-0 text-2xl' />
				) : (
					<FaRegUserCircle className='mx-auto md:mx-0 text-2xl' />
				)}
				<span className='hidden md:inline'>My Profile</span>
			</Link>
			<button
				disabled={isLoading}
				onClick={handleLogout}
				className='w-full h-11 px-3 py-2 flex items-center gap-x-2 rounded-tl rounded-bl hover:bg-Primary/20'
				title='Logout'>
				<LuLogOut className='text-2xl' />
				<span className='hidden md:inline'>Logout</span>
			</button>
		</aside>
	);
}
