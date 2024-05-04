import { Helmet } from 'react-helmet-async';
import Sidebar from '../Sidebar';

export default function Messages() {
	return (
		<section className='border-t border-gray-300 flex'>
			<Helmet>
				<title>My Profile || Profile - Mad Chef</title>
			</Helmet>

			{/* Sidebar */}
			<Sidebar />

			<div className='w-full'>
				<p className='text-center text-xl mt-36 '>Coming Soon...</p>
			</div>
		</section>
	);
}
