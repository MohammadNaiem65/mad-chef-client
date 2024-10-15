import { FaHeart, FaStar } from 'react-icons/fa6';
import { useGetRecipesQuery } from '../../features/recipe/recipeApi';
import { ArrowLink, Error, NoContent, RoundSpinner } from '../../shared';

export default function TopRatedRecipes({ chefId }) {
    const { data, isLoading, isSuccess, isError, error } = useGetRecipesQuery({
        data_filter: { chefId },
        sort: 'rating',
        order: 'desc',
        limit: 2,
        include: 'img,title,region,like,rating',
    });
    const { data: recipes } = data || {};

    let content;
    if (isLoading) {
        content = <RoundSpinner className='mt-20' />;
    } else if (!isLoading && isError) {
        content = <Error message={error?.data?.message} className={'mt-16'} />;
    } else if (!isLoading && isSuccess && recipes?.length === 0) {
        content = <NoContent />;
    } else if (!isLoading && isSuccess && recipes?.length > 0) {
        content = recipes?.map((recipe) => {
            const { _id, img, title, region, like, rating } = recipe;
            return (
                <div
                    key={_id}
                    className='bg-white mb-3 rounded overflow-hidden'
                >
                    <img
                        src={img}
                        alt='recipe image'
                        className='w-full h-28 object-cover'
                    />
                    <div className='p-2'>
                        <h3 className='text-base font-Vollkorn line-clamp-2 leading-4'>
                            {title}
                        </h3>
                        <p className='text-sm'>
                            Region:{' '}
                            <span className='capitalize text-slate-400'>
                                {region}
                            </span>
                        </p>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-x-5'>
                                <p className='capitalize text-slate-400 flex items-center gap-x-1'>
                                    <FaHeart />{' '}
                                    <span className='text-sm'>
                                        {like || 0}{' '}
                                        <span className='hidden lg:inline'>
                                            Likes
                                        </span>
                                    </span>
                                </p>
                                <p className='capitalize text-slate-400 flex items-center gap-x-1'>
                                    <FaStar />
                                    <span className='text-sm'>
                                        {rating || 0}{' '}
                                        <span className='hidden lg:inline'>
                                            Star
                                        </span>
                                    </span>
                                </p>
                            </div>
                            <ArrowLink />
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <section className='text-black'>
            <h2 className='mb-2 text-xl text-black text-start font-Vollkorn font-semibold'>
                Top Recipes
            </h2>

            {content}
        </section>
    );
}
