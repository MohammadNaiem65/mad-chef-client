import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
	Banner,
	ChefRecipes,
	FilterModal,
	Sidebar,
} from '../components/Recipes';

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
					<Banner />
					<ChefRecipes />
				</section>

				{!hideModal && <FilterModal setHideModal={setHideModal} />}
			</section>
		</>
	);
}
