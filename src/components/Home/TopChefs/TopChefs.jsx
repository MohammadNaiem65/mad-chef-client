import { useGetChefsQuery } from '../../../features/chef/chefApi';
import { Error, NoContent, RoundSpinner } from '../../../shared';
import HorizontalCard from './HorizontalCard';
import VerticalCard from './VerticalCard';

export default function TopChefs() {
    const { data, isLoading, isSuccess, isError, error } = useGetChefsQuery({
        sort: 'rating',
        include: 'name,img,rating,yearsOfExperience,recipes',
        limit: 6,
    });
    const { data: chefs } = data || {};

	// Decide what to render
    let content;

    if (isLoading) {
        content = <RoundSpinner className='mt-20 text-Primary' />;
    } else if (!isLoading && isError) {
        content = <Error message={error?.error} />;
    } else if (!isLoading && isSuccess && chefs?.length === 0) {
        content = <NoContent message='No data found.' />;
    } else if (!isLoading && isSuccess && chefs?.length > 0) {
        content = (
            <section className='mt-8 px-5 md:px-0 flex flex-col lg:flex-row gap-y-5 lg:gap-x-5'>
                {/* Left side container */}
                <div className='lg:w-1/2 grid md:grid-cols-2 gap-y-5 md:gap-x-3 lg:gap-y-3'>
                    {chefs?.slice(0, 2)?.map((chef) => (
                        <VerticalCard key={chef._id} chef={chef} />
                    ))}

                    <HorizontalCard chef={chefs[2]} />
                </div>
                {/* Right side container */}
                <div className='lg:w-1/2 grid md:grid-cols-2 gap-y-5 md:gap-x-3 lg:gap-y-3'>
                    <HorizontalCard chef={chefs[3]} />

                    {chefs?.slice(4)?.map((chef) => (
                        <VerticalCard key={chef._id} chef={chef} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        isSuccess && (
            <section className='md:w-11/12 lg:w-10/12 mt-16 lg:mt-20 md:mx-auto relative'>
                {/* Section title */}
                <h2 className='section-title'>
                    America&apos;s
                    <span className='section-title-span after:w-[112%]'>
                        Best Chefs
                    </span>
                    <br />
                    are on Mad Chef
                </h2>

                {/* Section content */}
                {content}
            </section>
        )
    );
}
