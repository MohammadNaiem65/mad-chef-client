import { useGetRecipeRatingsQuery } from '../../../features/recipe/recipeApi';
import { Error, NoContent, RoundSpinner } from '../../../shared';
import Review from './Review';
import './Reviews.css';

export default function Reviews() {
    const { data, isLoading, isSuccess, isError, error } =
        useGetRecipeRatingsQuery({
            limit: 6,
            include: 'studentName,studentImg,rating,message',
        });
    const reviews = data?.data || [];

    // Decide what to render
    let content;

    if (isLoading) {
        content = <RoundSpinner className='mt-20 text-Primary' />;
    } else if (!isLoading && isError) {
        content = <Error message={error?.error} />;
    } else if (!isLoading && isSuccess && reviews?.length === 0) {
        content = <NoContent message='No data found.' />;
    } else if (!isLoading && isSuccess && reviews?.length > 0) {
        content = (
            <div className='outer-container mt-8 overflow-hidden'>
                <div className='inner-container w-fit flex gap-5 md:gap-3'>
                    {[...reviews, ...reviews, ...reviews, ...reviews].map(
                        (review, index) => (
                            <Review key={index} review={review} />
                        )
                    )}
                </div>
            </div>
        );
    }

    return (
        <section className='mt-20 lg:mx-auto'>
            <h2 className='section-title'>
                What customers
                <span className='section-title-span after:w-[120%]'>Think</span>
                <br />
                of Us
            </h2>

            {content}
        </section>
    );
}
