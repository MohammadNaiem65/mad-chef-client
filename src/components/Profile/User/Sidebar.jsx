import { useLocation, Link } from 'react-router-dom';
import { AiOutlineDashboard, AiFillDashboard } from 'react-icons/ai';
import {
	BiSupport,
	BiMessageRoundedDetail,
	BiSolidMessageRoundedDetail,
} from 'react-icons/bi';
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import { useUnAuthenticateMutation } from '../../../features/auth/authApi';
import { useEffect } from 'react';
import removeNotifications from '../../../helpers/removeNotifications';
import showNotification from '../../../helpers/showNotification';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/auth/authSelectors';

export default function Sidebar() {
	// Get the sub pathname of profile page
	const { pathname } = useLocation();
	const paths = pathname.split('/');
	const mainPath = paths?.length > 0 && paths[3];

	const user = useSelector(selectUser);
	const [unAuthenticate, { isLoading, isSuccess, isError }] =
		useUnAuthenticateMutation();

	// handle success state
	useEffect(() => {
		if (isSuccess) {
			removeNotifications();
			showNotification('success', 'Logged out successfully!');
		}
	}, [isSuccess]);

	// handle error state
	useEffect(() => {
		if (isError) {
			removeNotifications();
			showNotification(
				'error',
				'Something went wrong! Please try again.'
			);
		}
	}, [isError]);

	// handle logout
	const handleLogout = () => {
		showNotification('loading', 'Logging out...');
		unAuthenticate({ userId: user?.userId });
	};

	return (
		<aside className='w-1/4 py-3 border-r border-gray-300 font-Popins text-lg'>
			<div className='min-h-[17.25rem]'>
				<Link
					to='/profile/user/dashboard/'
					className={`py-2 flex items-center gap-x-2 rounded-tl rounded-bl hover:bg-Primary/20 ${
						mainPath === 'dashboard' ? 'bg-blue-300 px-5' : 'px-3 '
					}`}>
					{mainPath === 'dashboard' ? (
						<AiFillDashboard className='text-2xl' />
					) : (
						<AiOutlineDashboard className='text-2xl' />
					)}
					Dashboard
				</Link>
				<Link
					to='/profile/user/messages'
					className={`py-2 flex items-center gap-x-2 rounded-tl rounded-bl hover:bg-Primary/20 ${
						mainPath === 'messages'
							? 'bg-blue-300 font- px-5'
							: 'px-3 '
					}`}>
					{mainPath === 'messages' ? (
						<BiSolidMessageRoundedDetail className='text-2xl' />
					) : (
						<BiMessageRoundedDetail className='text-2xl' />
					)}
					Messages
				</Link>
				<Link
					to='/profile/user/consults'
					className={`py-2 flex items-center gap-x-2 rounded-tl rounded-bl hover:bg-Primary/20 ${
						mainPath === 'consults'
							? 'bg-blue-300 font- px-5'
							: 'px-3 '
					}`}>
					<BiSupport className='text-2xl' /> Consults
				</Link>
			</div>
			<Link
				to='/profile/user/my-profile'
				className={`py-2 border-t border-gray-300 flex items-center gap-x-2 rounded-tl rounded-bl hover:bg-Primary/20 ${
					mainPath === 'my-profile'
						? 'bg-blue-300 font- px-5'
						: 'px-3 '
				}`}>
				{mainPath === 'my-profile' ? (
					<FaUserCircle className='text-2xl' />
				) : (
					<FaRegUserCircle className='text-2xl' />
				)}
				My Profile
			</Link>
			<button
				disabled={isLoading}
				onClick={handleLogout}
				className='w-full px-3 py-2 flex items-center gap-x-2 rounded-tl rounded-bl hover:bg-Primary/20'>
				<LuLogOut className='text-2xl' />
				Logout
			</button>
		</aside>
	);
}
