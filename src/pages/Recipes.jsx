import { Helmet } from 'react-helmet-async';
import { ChefDetails, ChefRecipes, Sidebar } from '../components/Recipes';

export default function Recipes() {
	return (
		<>
			<Helmet>
				<title>Recipes - Mad Chef</title>
			</Helmet>
			<section className='w-10/12 mx-auto flex gap-x-5'>
				<Sidebar />
				<section>
					<ChefDetails />
					<ChefRecipes />
				</section>
			</section>
		</>
	);
}
