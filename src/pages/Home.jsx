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
		<div>
			<Banner />
			<FeatureRecipes />
			<TopChefs />
			<Reviews />
			<Packages />
			<NewsLetter />
		</div>
	);
}
