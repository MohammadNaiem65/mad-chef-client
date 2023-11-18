import { Link } from 'react-router-dom';

export default function ChefRecipes() {
	return (
		<section className='mt-5 p-5'>
			<Link to={'/recipes/recipe/3'}>details</Link>
		</section>
	);
}
