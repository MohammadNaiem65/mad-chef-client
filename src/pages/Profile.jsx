import { useEffect, Suspense } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { modelImg } from '../assets';
import { Spinner } from '../shared';
import Sidebar from '../components/Profile/Sidebar';
import AdminSidebar from '../components/Profile/AdminSidebar';

export default function Profile() {
	const { name, img, role } = useSelector((state) => state.user);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const paths = pathname.split('/');
		const mainPage = paths?.length && paths[3];
		const subPage = paths?.length && paths[4];

		if (role === 'student' || role === 'chef') {
			const pathRole = role === 'student' ? 'user' : 'chef';	

			if (subPage) {
				navigate(`/profile/${pathRole}/${mainPage}/${subPage}`);
			} else if (mainPage && !subPage) {
				navigate(`/profile/${pathRole}/${mainPage}`);
			} else {
				navigate(`/profile/${pathRole}/dashboard`);
			}
		} else if (role === 'admin') {
			navigate('/profile/admin/dashboard');
		}
	}, [navigate, role, pathname]);

	return (
		<>
			<Helmet>
				<title>Dashboard | Profile - Mad Chef</title>
			</Helmet>

			<section className='w-full xl:w-4/5 mx-auto'>
				{/* Header */}
				<div className='w-full pb-8 flex items-center gap-x-6'>
					<img
						src={img ? img : modelImg}
						alt='User Image'
						className='size-20 md:size-28 aspect-square ml-4 object-cover rounded-full relative z-20'
					/>
					<div className='font-Popins'>
						<p className='text-lg'>Hello</p>
						<h3 className='text-xl md:text-2xl'>{name}</h3>
					</div>
				</div>

				<section className='w-full border-t border-gray-300 flex'>
					{role === 'admin' ? <AdminSidebar /> : <Sidebar />}

					<section className='w-[88%] md:w-3/4'>
						{/* Main content */}
						<Suspense fallback={<Spinner />}>
							<Outlet />
						</Suspense>
					</section>
				</section>
			</section>
		</>
	);
}
