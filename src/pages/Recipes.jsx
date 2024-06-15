import { useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChefRecipes, FilterModal, Sidebar } from '../components/Recipes';
import { Spinner } from '../shared';

export default function Recipes() {
	const [hideModal, setHideModal] = useState(true);

	const { chefId } = useParams();

	return (
		<>
			<Helmet>
				<title>Recipes - Mad Chef</title>
			</Helmet>
			<section className='lg:w-10/12 mx-auto flex justify-center lg:justify-end gap-x-5'>
				<Sidebar setHideModal={setHideModal} />
				<section className='lg:w-[53rem]'>
					<Suspense fallback={<Spinner />}>
						<Outlet />
					</Suspense>
					<ChefRecipes chefId={chefId} />
				</section>

				{!hideModal && <FilterModal setHideModal={setHideModal} />}
			</section>
		</>
	);
}
