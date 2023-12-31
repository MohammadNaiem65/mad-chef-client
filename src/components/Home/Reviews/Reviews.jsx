import Review from './Review';
import './Reviews.css';

const reviews = [1, 2, 3, 4, 5];

export default function Reviews() {
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
					{[...reviews, ...reviews].map((review, index) => (
						<Review key={index} count={review} />
					))}
				</div>
			</div>
		</section>
	);
}
