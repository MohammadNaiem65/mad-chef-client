import { useLocation, Outlet } from 'react-router-dom';

export default function Admin() {
	// Get the sub pathname of dashboard
	const { pathname } = useLocation();
	const paths = pathname.split('/');
	const mainPath = paths?.length > 0 && paths[3];

	return (
		<section>
			{!mainPath && (
				<p className='mt-36 text-center text-slate-600 text-xl font-semibold'>
					Click on an option to see any content!
				</p>
			)}

			<Outlet />
		</section>
	);
}
