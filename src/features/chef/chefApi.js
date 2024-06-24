import apiSlice from '../api/apiSlice';

const chefApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChefs: builder.query({
			query: ({ page, limit, sort, order, include, exclude }) => {
				// Define the base URL
				const baseUrl = '/chefs';

				// Create an object with all parameters
				const params = { page, limit, sort, order, include, exclude };

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

			serializeQueryArgs: ({ limit, sort, order, include, exclude }) => {
				// To merge previous cache, ignore page number
				return {
					page: 'all', // Use 'all' to ignore page number
					limit,
					sort,
					order,
					include,
					exclude,
				};
			},

			// Merge the incoming data with the existing data
			merge: (existingResponse, incomingResponse) => {
				incomingResponse.data = [
					...existingResponse.data,
					...incomingResponse.data,
				];

				return incomingResponse;
			},

			// force to refetch if query argument (page) changes
			forceRefetch: ({ currentArg, previousArg }) => {
				return (
					currentArg?.page !== undefined &&
					previousArg?.page !== currentArg?.page
				);
			},
		}),
		getChef: builder.query({
			query: ({ chef_id, include, exclude }) => {
				const baseUrl = `/chefs/chef/${chef_id}`;
				const params = { include, exclude };

				// Use reduce to construct the query string
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
				const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

				return { url };
			},
		}),
		getChefReviews: builder.query({
			query: ({ chef_id, page, limit, sort, order }) => {
				// Define the base URL
				const baseUrl = `/chefs/chef/${chef_id}/reviews`;

				// Create an object with all parameters
				const params = { page, limit, sort, order };

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
		addChefReview: builder.mutation({
			query: ({ chef_id, data }) => ({
				url: `/chefs/chef/${chef_id}/reviews`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export default chefApi;
export const {
	useGetChefsQuery,
	useGetChefQuery,
	useGetChefReviewsQuery,
	useAddChefReviewMutation,
} = chefApi;
