import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSelectors';

import User from '../components/Dashboard/User/User';
import Chef from '../components/Dashboard/Chef/Chef';
import Admin from '../components/Dashboard/Admin/Admin';

export default function Dashboard() {
	const { userId, role } = useSelector(selectUser);

	return (
		<section>
			<Helmet>
				<title>Dashboard - Mad Chef</title>
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
