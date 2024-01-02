import apiSlice from '../api/apiSlice';
import { removeCredentials, setCredentials } from './authSlice';

const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		authenticate: builder.mutation({
			query: (data) => ({
				url: '/auth',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${data.token}`,
				},
				body: { reqType: 'registration' },
			}),
		}),
		authenticateForToken: builder.mutation({
			query: (data) => ({
				url: '/auth',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${data.token}`,
				},
			}),
			async onQueryStarted(args, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled;

					// store the data in the local storage
					localStorage.setItem('auth', JSON.stringify(data.data));

					// store the data in the redux store
					dispatch(setCredentials(data.data));
				} catch (error) {
					// handle error in the UI
				}
			},
		}),
		unAuthenticate: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'DELETE',
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;

					dispatch(removeCredentials());

					// remove credentials from local storage
					localStorage.removeItem('auth');
				} catch (error) {
					// handle error in the UI
				}
			},
		}),
	}),
});

export default authApi;
export const {
	useAuthenticateMutation,
	useAuthenticateForTokenMutation,
	useUnAuthenticateMutation,
} = authApi;
