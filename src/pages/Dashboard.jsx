import { Helmet } from 'react-helmet-async';
import { Consults, FavoriteRecipe, UserDetails } from '../components/Dashboard';

export default function Dashboard() {
	return (
		<section>
			<Helmet>
				<title>Dashboard - Mad Chef</title>
			</Helmet>

			<UserDetails />
			<Consults />
			<FavoriteRecipe />
		</section>
	);
}
