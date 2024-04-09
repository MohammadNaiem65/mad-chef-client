import apiSlice from '../api/apiSlice';

const recipeApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRecipes: builder.query({
			query: ({
				chef_id,
				page,
				limit,
				sort,
				order,
				include,
				exclude,
			}) => {
				// Define the base URL
				const baseUrl = '/recipes';

				// Create an object with all parameters
				const params = {
					chef_id,
					page,
					limit,
					sort,
					order,
					include,
					exclude,
				};

				// Use reduce to construct the query string
				const queryString = Object.entries(params)
					.reduce((acc, [key, value]) => {
						// Only include parameters that have a value
						if (value !== undefined) {
							acc.push(`${key}=${encodeURIComponent(value)}`);
						}
						return acc;
					}, [])
					.join('&');

				// Construct the final URL
				const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

				return { url };
			},
		}),
	}),
});

export default recipeApi;
export const { useGetRecipesQuery } = recipeApi;
