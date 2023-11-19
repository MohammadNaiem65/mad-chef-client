import { UserDetails } from '../components/RecipeDetails';

export default function RecipeDetails() {
	return (
		<section className='w-11/12 lg:w-1/2 mx-auto'>
			<h2 className='text-3xl lg:text-[2.8rem] text-slate-800 font-Popins font-bold'>
				Before Thanksgiving Turns Ugly
			</h2>

			{/* user details */}
			<UserDetails />
		</section>
	);
}
