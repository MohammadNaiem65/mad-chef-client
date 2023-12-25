import apiSlice from '../api/apiSlice';

const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		authenticateWithProvider: builder.mutation({
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
