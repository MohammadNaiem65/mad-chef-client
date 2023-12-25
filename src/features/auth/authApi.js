import apiSlice from '../api/apiSlice';

const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		authenticateWithProvider: builder.mutation({
			// queryFn: async (arg, api, extraOptions, baseQuery) => {
			// 	// get the idToken from the store
			// 	const { idToken } = api.getState((state) => state.auth);

			// 	// set the URL and HTTP method
			// 	const endpointDefinition = {
			// 		url: '/auth',
			// 		method: 'POST',
			// 	};

			// 	// send the request and return the result
			// 	const result = await baseQuery(endpointDefinition, api, {
			// 		...extraOptions,
			// 		headers: { Authorization: `Bearer ${arg.token}` },
			// 	});

			// 	return result;
			// },

			query: (data) => ({
				url: '/auth',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export default authApi;
export const { useAuthenticateWithProviderMutation } = authApi;
