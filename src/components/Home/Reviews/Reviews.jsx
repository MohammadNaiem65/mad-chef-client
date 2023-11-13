import Review from './Review';
import './Reviews.css';

const reviews = [1, 2, 3, 4, 5];

export default function Reviews() {
	return (
		<section className='mt-20'>
			<h2 className='section-title'>
				What customers
				<span className='section-title-span after:w-[120%]'>Think</span>
				<br />
				of Us
			</h2>

			<div className='outer-container mt-8 overflow-hidden'>
				<div className='inner-container w-fit flex gap-5'>
					{[...reviews, ...reviews].map((review) => (
						<Review key={review} count={review} />
					))}
				</div>
			</div>
		</section>
	);
}
