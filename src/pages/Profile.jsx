import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { selectUser } from '../features/auth/authSelectors';
import User from '../components/Profile/User/User';
import Chef from '../components/Profile/Chef/Chef';
import Admin from '../components/Profile/Admin/Admin';

export default function Profile() {
	const { userId, role } = useSelector(selectUser);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (role === 'student') {
			const mainPage =
				pathname.split('/')?.length && pathname.split('/')[3];
			const subPage =
				pathname.split('/')?.length && pathname.split('/')[4];

			// By default navigate the user to Bookmarks Sub Page of Dashboard or else send to the required page
			if (subPage) {
				navigate(`/profile/user/${mainPage}/${subPage}`);
			} else if (mainPage && !subPage) {
				navigate(`/profile/user/${mainPage}`);
			} else {
				navigate('/profile/user/dashboard/bookmarks');
			}
		} else if (role === 'chef') {
			navigate('/profile/chef/dashboard');
		} else if (role === 'admin') {
			navigate('/profile/admin/dashboard');
		}
	}, [navigate, role, pathname]);

	return (
		<>
			<Helmet>
				<title>Profile - Mad Chef</title>
			</Helmet>

			{role === 'student' ? (
				<User />
			) : role === 'chef' ? (
				<Chef chefId={userId} />
			) : (
				role === 'admin' && <Admin adminId={userId} />
			)}
		</>
	);
}
