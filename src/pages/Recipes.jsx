import { Helmet } from 'react-helmet-async';
import { Sidebar } from '../components/Recipes';
import { Outlet } from 'react-router-dom';

export default function Recipes() {
	return (
		<>
			<Helmet>
				<title>Recipes - Mad Chef</title>
			</Helmet>
			<section className='w-10/12 mx-auto flex gap-x-5'>
				<Sidebar />
				<Outlet />
			</section>
		</>
	);
}
