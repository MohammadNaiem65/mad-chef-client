import apiSlice from '../api/apiSlice';

const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserData: builder.query({
			query: ({ userId, include, exclude }) => {
				// Define the base URL
				const baseUrl = `/users/user/${userId}`;

				// Create an object with all parameters
				const params = { include, exclude };

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

				let finalUrl = baseUrl;

				if (queryString) {
					finalUrl += `?${queryString}`;
				}

				return { url: finalUrl };
			},
		}),
		getChefReviewsByUser: builder.query({
			query: ({ userId }) => `/users/user/${userId}/review/chef`,
		}),
		editRecipeRatingByUser: builder.mutation({
			query: ({ userId, docId, data }) => ({
				url: `/users/user/${userId}/rating/recipe?docId=${docId}`,
				method: 'PATCH',
				body: data,
			}),
		}),
		editChefReviewsByUser: builder.mutation({
			query: ({ userId, docId, data }) => ({
				url: `/users/user/${userId}/review/chef?docId=${docId}`,
				method: 'PATCH',
				body: data,
			}),
		}),
	}),
});

export default userApi;
export const {
	useGetUserDataQuery,
	useGetChefReviewsByUserQuery,
	useEditRecipeRatingByUserMutation,
	useEditChefReviewsByUserMutation,
} = userApi;
