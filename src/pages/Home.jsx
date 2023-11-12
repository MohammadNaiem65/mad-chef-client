import { Banner, FeatureRecipes, TopChefs } from '../components/Home';

export default function Home() {
	return (
		<div className='page-content'>
			<Banner />
			<FeatureRecipes />
			<TopChefs />
		</div>
	);
}
