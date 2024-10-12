import { useParams } from 'react-router-dom';
import {
    ChefSection,
    RatingSection,
    RecipeSection,
} from '../components/RecipeDetails';
import { useGetRecipeQuery } from '../features/recipe/recipeApi';
import { Error, Spinner } from '../shared';

export default function RecipeDetails() {
    const { recipeId } = useParams();

    const { data, isLoading, isSuccess, isError, error } = useGetRecipeQuery({
        recipeId,
    });
    const {
        _id,
        title,
        img,
        imgTitle,
        ingredients,
        method,
        like,
        rating,
        status,
        author,
        createdAt,
    } = data?.data || {};

    let content;

    if (isLoading) {
        content = <Spinner />;
    } else if (!isLoading && isError) {
        content = <Error message={error.message} />;
    } else if (!isLoading && isSuccess) {
        content = (
            <section className='w-11/12 lg:w-1/2 mx-auto'>
                <h2 className='text-3xl lg:text-[2.8rem] text-slate-800 font-Popins font-bold'>
                    {title}
                </h2>

                {/* Chef details */}
                <ChefSection
                    like={like}
                    rating={rating}
                    author={author}
                    status={status}
                    recipeId={_id}
                    createdAt={createdAt}
                />

                {/* Recipe details */}
                <RecipeSection
                    img={img}
                    imgTitle={imgTitle}
                    ingredients={ingredients}
                    method={method}
                />

                {/* Comment Section */}
                <RatingSection recipeId={recipeId} />
            </section>
        );
    }

    return content;
}
