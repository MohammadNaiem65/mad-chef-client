import { useGetRecipeRatingsQuery } from '../../../features/recipe/recipeApi';
import Review from './Review';
import './Reviews.css';

export default function Reviews() {
	const { data } = useGetRecipeRatingsQuery({
		limit: 6,
		include: 'username,userImg,rating,message',
	});
	const reviews = data?.data || [];

	return (
		<section className='mt-20 lg:mx-auto'>
			<h2 className='section-title'>
				What customers
				<span className='section-title-span after:w-[120%]'>Think</span>
				<br />
				of Us
			</h2>

			<div className='outer-container mt-8 overflow-hidden'>
				<div className='inner-container w-fit flex gap-5 md:gap-3'>
					{[...reviews, ...reviews, ...reviews, ...reviews].map(
						(review) => (
							<Review key={review?._id} review={review} />
						)
					)}
				</div>
			</div>
		</section>
	);
}
