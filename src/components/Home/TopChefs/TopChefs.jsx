import { useWindowSize } from '../../../hooks';
import { useGetChefsQuery } from '../../../features/chef/chefApi';
import { Error, NoContent, RoundSpinner } from '../../../shared';
import HorizontalCard from './HorizontalCard';
import VerticalCard from './VerticalCard';

export default function TopChefs() {
    const { width } = useWindowSize();

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
            <section className='mt-8 px-10 md:px-0 grid grid-cols-1 md:grid-cols-4 md:grid-rows-[13rem_8rem_13rem] gap-4'>
                {chefs.map((chef, index) =>
                    (index === 2 || index === 3) && width >= 1024 ? (
                        <HorizontalCard key={index} chef={chef} index={index} />
                    ) : (
                        <VerticalCard key={index} chef={chef} index={index} />
                    )
                )}
            </section>
        );
    }

    return (
        <section className='md:w-11/12 lg:w-10/12 mt-16 lg:mt-20 md:mx-auto relative'>
            <h2 className='section-title'>
                America&apos;s
                <span className='section-title-span after:w-[112%]'>
                    Best Chefs
                </span>
                <br />
                are on Mad Chef
            </h2>

            {content}
        </section>
    );
}
