import { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChefRecipes, FilterModal, Sidebar } from '../components/Recipes';
import { Spinner } from '../shared';

export default function Recipes() {
	const [hideModal, setHideModal] = useState(true);

	return (
		<>
			<Helmet>
				<title>Recipes - Mad Chef</title>
			</Helmet>
			<section className='lg:w-10/12 mx-auto flex justify-end gap-x-5'>
				<Sidebar setHideModal={setHideModal} />
				<section className='lg:w-[53rem]'>
					<Suspense fallback={<Spinner/>}>
						<Outlet />
					</Suspense>
					<ChefRecipes />
				</section>

				{!hideModal && <FilterModal setHideModal={setHideModal} />}
			</section>
		</>
	);
}
