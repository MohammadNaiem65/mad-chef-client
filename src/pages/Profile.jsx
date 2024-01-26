import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { selectUser } from '../features/auth/authSelectors';
import User from '../components/Profile/User/User';
import Chef from '../components/Profile/Chef/Chef';
import Admin from '../components/Profile/Admin/Admin';

export default function Profile() {
	const { userId, role } = useSelector(selectUser);

	return (
		<section>
			<Helmet>
				<title>Profile - Mad Chef</title>
			</Helmet>

			{role === 'student' ? (
				<User userId={userId} />
			) : role === 'chef' ? (
				<Chef />
			) : (
				<Admin />
			)}
		</section>
	);
}
