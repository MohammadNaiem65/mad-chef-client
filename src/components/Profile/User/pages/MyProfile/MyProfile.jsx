import { Helmet } from 'react-helmet-async';
import Sidebar from '../../Sidebar';
import Profile from './Profile';

export default function MyProfile() {
	return (
		<section className='border-t border-gray-300 flex'>
			<Helmet>
				<title>My Profile | Profile - Mad Chef</title>
			</Helmet>

			{/* Sidebar */}
			<Sidebar />

			<Profile />
		</section>
	);
}
