import apiSlice from '../api/apiSlice';

const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		authenticate: builder.mutation({
			query: (data) => ({
				url: '/auth',
				method: 'POST',
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'DELETE',
			}),
		}),
	}),
});

export default authApi;
export const { useAuthenticateMutation, useLogoutMutation } = authApi;
