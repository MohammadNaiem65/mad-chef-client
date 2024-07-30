import apiSlice from '../api/apiSlice';

const adminApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAdminData: builder.query({
			query: ({ id }) => ({
				url: `/admins/admin/${id}`,
				method: 'GET',
			}),
			transformResponse: (response) => response.data,
		}),
	}),
});

export default adminApi;
export const { useGetAdminDataQuery } = adminApi;
