import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { removeCredentials, setCredentials } from '../auth/authSlice';

// Flag to track if a refresh token request is in progress
let isRefreshing = false;

// Define the base query function
const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000',
	prepareHeaders: async (headers, { getState }) => {
		const token = getState()?.auth?.accessToken;

		// If there's an access token, add it to the request headers
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	},
	credentials: 'include',
});

// Define the API slice
const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: async (args, api, extraOptions) => {
		let result = await baseQuery(args, api, extraOptions);

		// Check if the response indicates an expired token
		if (
			result?.error?.status === 403 &&
			result?.error?.data?.data === 'jwt expired'
		) {
			// Check if a refresh is already in progress
			if (!isRefreshing) {
				isRefreshing = true;

				// Attempt to refresh the token
				const refreshResult = await baseQuery(
					'/auth/refresh-token',
					api,
					extraOptions
				);

				if (refreshResult?.data) {
					// If successful, update the access token in local storage and Redux state
					const user = api.getState().auth.user;
					const data = {
						user,
						accessToken: refreshResult.data?.data?.accessToken,
					};
					localStorage.setItem('auth', JSON.stringify(data));
					api.dispatch(setCredentials(data));

					// Retry the original request with the new token
					result = await baseQuery(args, api, extraOptions);
				} else {
					// If refresh fails, remove credentials and handle accordingly
					localStorage.removeItem('auth');
					api.dispatch(removeCredentials());
				}

				isRefreshing = false;
			}
		}

		return result;
	},
	// eslint-disable-next-line no-unused-vars
	endpoints: (builder) => ({}),
});

export default apiSlice;
