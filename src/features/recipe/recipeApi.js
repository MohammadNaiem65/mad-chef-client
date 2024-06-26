import apiSlice from '../api/apiSlice';

const recipeApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRecipes: builder.query({
			query: ({
				data_filter,
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
					page,
					limit,
					sort,
					order,
					include,
					exclude,
				};

				// Use reduce to construct the query string without filter parameter
				const queryString = Object.entries(params)
					.reduce((acc, [key, value]) => {
						// Only include parameters that have a value
						if (value) {
							acc.push(`${key}=${encodeURIComponent(value)}`);
						}
						return acc;
					}, [])
					.join('&');

				let url;

				// Add filter options if has values
				const dataFilterKeys = Object.keys(data_filter);
				if (dataFilterKeys.length > 0) {
					const filterKeysWithValues = {};
					dataFilterKeys.forEach((elKey) => {
						if (data_filter[elKey]) {
							filterKeysWithValues[elKey] = data_filter[elKey];
						}
					});

					const stringifiedDataFilter =
						JSON.stringify(filterKeysWithValues);

					const encodedDataFiler = encodeURIComponent(
						stringifiedDataFilter
					);

					if (queryString) {
						url = `${baseUrl}?${queryString}&data_filter=${encodedDataFiler}`;
					} else {
						url = `${baseUrl}?data_filter=${encodedDataFiler}`;
					}
				} else {
					url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
				}

				return { url };
			},
		}),
		getBookmarkedRecipes: builder.query({
			query: ({ userId }) => `/users/user/${userId}/bookmarks`,
		}),
		getLikedRecipes: builder.query({
			query: ({ userId }) => `/users/user/${userId}/likes`,
		}),
		getRecipe: builder.query({
			query: (recipeId) => `/recipes/recipe/${recipeId}`,
		}),
		getRecipeRatings: builder.query({
			query: ({
				data_filter = {},
				page,
				limit,
				sort,
				order,
				include,
				exclude,
			}) => {
				// Define the base URL
				const baseUrl = '/recipes/ratings';

				// Create an object with all parameters
				const params = {
					page,
					limit,
					sort,
					order,
					include,
					exclude,
				};

				// Use reduce to construct the query string without filter parameter
				const queryString = Object.entries(params)
					.reduce((acc, [key, value]) => {
						// Only include parameters that have a value
						if (value) {
							acc.push(`${key}=${encodeURIComponent(value)}`);
						}
						return acc;
					}, [])
					.join('&');

				// Construct the URL without filter parameters
				const urlWithoutFilterOptions = queryString
					? `${baseUrl}?${queryString}`
					: baseUrl;

				let url;

				// Add filter options which has values
				const dataFilterKeys = Object.keys(data_filter);
				if (dataFilterKeys.length > 0) {
					const filterKeysWithValues = {};
					dataFilterKeys.forEach((elKey) => {
						if (data_filter[elKey]) {
							filterKeysWithValues[elKey] = data_filter[elKey];
						}
					});

					if (Object.keys(filterKeysWithValues).length > 0) {
						const stringifiedDataFilter =
							JSON.stringify(filterKeysWithValues);

						const encodedDataFiler = encodeURIComponent(
							stringifiedDataFilter
						);

						if (baseUrl !== urlWithoutFilterOptions) {
							url =
								urlWithoutFilterOptions +
								`&data_filter=${encodedDataFiler}`;
						} else {
							url =
								urlWithoutFilterOptions +
								`?data_filter=${encodedDataFiler}`;
						}
					} else {
						url = urlWithoutFilterOptions;
					}
				} else {
					url = urlWithoutFilterOptions;
				}

				return { url };
			},
		}),
	}),
});

export default recipeApi;
export const {
	useGetRecipesQuery,
	useGetRecipeQuery,
	useGetBookmarkedRecipesQuery,
	useGetLikedRecipesQuery,
	useGetRecipeRatingsQuery,
} = recipeApi;
