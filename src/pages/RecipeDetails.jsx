import { useParams } from 'react-router-dom';
import { ChefDetails } from '../components/RecipeDetails';
import { useGetRecipeQuery } from '../features/recipe/recipeApi';
import Spinner from '../shared/Spinner/Spinner';

export default function RecipeDetails() {
	const { recipeId } = useParams();

	const { data, isLoading, isSuccess, isError, error } =
		useGetRecipeQuery(recipeId);
	const {
		title,
		img,
		imgTitle,
		ingredients,
		method,
		like,
		author,
		createdAt,
	} = data?.data || {};

	return isLoading ? (
		<Spinner />
	) : isError ? (
		<p>{error.data}</p>
	) : (
		isSuccess && (
			<section className='w-11/12 lg:w-1/2 mx-auto'>
				<h2 className='text-3xl lg:text-[2.8rem] text-slate-800 font-Popins font-bold'>
					{title}
				</h2>

				{/* user details */}
				<ChefDetails
					like={like}
					author={author}
					createdAt={createdAt}
				/>

				<figure>
					<img
						src={img}
						alt='Dish image'
						className='w-full max-h-[15.875rem] md:max-h-[26rem] mt-5 object-cover'
					/>
					{imgTitle && (
						<figcaption className='text-slate-500 text-center mt-1'>
							{imgTitle}
						</figcaption>
					)}
				</figure>

				<div className='mt-8 text-slate-500'>
					<h3 className='text-xl text-slate-700 font-semibold'>
						Ingredients:
					</h3>
					<ul className='mt-2 ml-5 list-disc list-inside'>
						{ingredients.map((ingredient, index) => (
							<li key={index} className='capitalize'>
								{ingredient}
							</li>
						))}
					</ul>
					<h3 className='mt-7 text-xl text-slate-700 font-semibold'>
						Method:
					</h3>
					<p className='text-justify'>{method}</p>
				</div>
			</section>
		)
	);
}
