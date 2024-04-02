import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { removeCredentials, setCredentials } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000',
	prepareHeaders: async (headers, { getState }) => {
		const token = getState()?.auth?.accessToken;

		// set authorization header
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	},
	credentials: 'include',
});

const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: async (args, api, extraOptions) => {
		let result = await baseQuery(args, api, extraOptions);

		if (
			result?.error?.status === 403 &&
			result?.error?.data?.data === 'jwt expired'
		) {
			// refetch for new access token
			const refreshResult = await baseQuery(
				'/auth/refresh-token',
				api,
				extraOptions
			);

			if (refreshResult?.data) {
				const user = api.getState().auth.user;

				const data = {
					user,
					accessToken: refreshResult.data?.data?.accessToken,
				};

				// update the access token
				localStorage.setItem('auth', JSON.stringify(data));
				api.dispatch(setCredentials(data));

				// fetch the previous request
				result = await baseQuery(args, api, extraOptions);
			} else {
				localStorage.removeItem('auth');
				api.dispatch(removeCredentials());
			}
		}

		// console.log(result);

		return result;
	},
	// eslint-disable-next-line no-unused-vars
	endpoints: (builder) => ({}),
});

export default apiSlice;
