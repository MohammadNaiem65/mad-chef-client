import { Helmet } from 'react-helmet-async';
import {
	Banner,
	FeatureRecipes,
	NewsLetter,
	Packages,
	Reviews,
	TopChefs,
} from '../components/Home';

export default function Home() {
	return (
		<>
			<Helmet>
				<title>Mad Chef</title>
			</Helmet>
			
			<Banner />
			<FeatureRecipes />
			<TopChefs />
			<Reviews />
			<Packages />
			<NewsLetter />
		</>
	);
}
