import { useEffect,Suspense } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from '../../../shared';
import { modelImg } from '../../../assets';

export default function User() {
	const { name, img } = useSelector((state) => state.user);

	// Get the sub pathname of dashboard
	const { pathname } = useLocation();

	// By default - navigate to the user to Bookmarks sub-page
	const navigate = useNavigate();
	// User.jsx
	useEffect(() => {
		const paths = pathname.split('/');
		const mainSection = paths.length > 0 && paths[3];

		if (!mainSection) {
			navigate('/profile/user/dashboard');
		}
	}, [pathname, navigate]);

	return (
		<section className='w-4/5 mx-auto'>
			{/* // Header */}
			<div className='pb-8 flex items-center gap-x-6'>
				<img
					src={img ? img : modelImg}
					alt=''
					className='size-28 aspect-square ml-4 object-cover rounded-full relative z-20'
				/>
				<div className='font-Popins'>
					<p>Hello</p>
					<h3 className='text-2xl'>{name}</h3>
				</div>
			</div>

			{/* Content */}
			<Suspense fallback={<Spinner />}>
				<Outlet />
			</Suspense>
		</section>
	);
}
