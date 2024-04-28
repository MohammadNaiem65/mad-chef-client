import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { removeCredentials, setCredentials } from '../auth/authSlice';
import { Mutex } from 'async-mutex';

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000',
	prepareHeaders: async (headers, { getState }) => {
		const token = getState()?.auth?.accessToken;

		// Set authorization header
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
			// Wait until the mutex is available without locking it
			await mutex.waitForUnlock();

			// Check if the mutex is locked
			if (!mutex.isLocked()) {
				const release = await mutex.acquire();
				try {
					// Refetch for new access token
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

						// Update the access token
						localStorage.setItem('auth', JSON.stringify(data));
						api.dispatch(setCredentials(data));

						// Fetch the previous request
						result = await baseQuery(args, api, extraOptions);
					} else {
						localStorage.removeItem('auth');
						api.dispatch(removeCredentials());
					}
				} finally {
					// Release must be called once the mutex should be released again.
					release();
				}
			} else {
				// Wait until the mutex is available without locking it
				await mutex.waitForUnlock();
				result = await baseQuery(args, api, extraOptions);
			}
		}

		return result;
	},
	// eslint-disable-next-line no-unused-vars
	endpoints: (builder) => ({}),
});

export default apiSlice;
