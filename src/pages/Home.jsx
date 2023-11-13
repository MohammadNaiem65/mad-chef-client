import {
	Banner,
	FeatureRecipes,
	NewsLetter,
	Reviews,
	TopChefs,
} from '../components/Home';

export default function Home() {
	return (
		<div className='page-content'>
			<Banner />
			<FeatureRecipes />
			<TopChefs />
			<Reviews />
			<NewsLetter />
		</div>
	);
}
