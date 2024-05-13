import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { selectUser } from '../features/auth/authSelectors';
import User from '../components/Profile/User/User';
import Chef from '../components/Profile/Chef/Chef';
import Admin from '../components/Profile/Admin/Admin';

export default function Profile() {
	const { userId, role } = useSelector(selectUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (role === 'student') {
			navigate('/profile/user/dashboard');
		} else if (role === 'chef') {
			navigate('/profile/chef/dashboard');
		} else if (role === 'admin') {
			navigate('/profile/admin/dashboard');
		}
	}, [role, navigate]);

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
