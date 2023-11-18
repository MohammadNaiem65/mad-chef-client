import { Helmet } from 'react-helmet-async';
import { Banner, ChefRecipes, Sidebar } from '../components/Recipes';

export default function Recipes() {
	return (
		<>
			<Helmet>
				<title>Recipes - Mad Chef</title>
			</Helmet>
			<section className='w-10/12 mx-auto flex justify-end gap-x-5'>
				<Sidebar />
				<section className='w-[53rem]'>
					<Banner />
					<ChefRecipes />
				</section>
			</section>
		</>
	);
}
