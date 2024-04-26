import { useGetRecipeQuery } from '../../../../../features/recipe/recipeApi';
import { Recipe } from '../../../../../shared';

export default function Bookmark({ recipeId }) {
	const { data } = useGetRecipeQuery(recipeId);
	const recipe = data?.data || {};

	return <Recipe recipe={recipe} />;
}
