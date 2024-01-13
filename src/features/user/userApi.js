import apiSlice from '../api/apiSlice';

const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserData: builder.query({
			query: (data) => ({
				url: `/user/${data.userId}`,
			}),
		}),
	}),
});

export default userApi;
export const { useGetUserDataQuery } = userApi;
