import apiSlice from '../api/apiSlice';

const consultApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		bookConsult: builder.mutation({
			query: ({ data }) => ({
				url: '/consults/consult',
				method: 'POST',
				body: data,
			}),

			async onQueryStarted(args, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;
					const doc = result.data?.data;

					// Pessimistically update the cache
					dispatch(
						apiSlice.util.updateQueryData(
							'getConsults',
							{ status: 'pending,completed,failed,rejected' },
							(oldData) => ({
								...oldData,
								data: [...oldData.data, doc],
							})
						)
					);
				} catch (err) {
					// Do nothing for now
				}
			},
		}),
		getConsults: builder.query({
			query: ({ status }) => {
				let url = '/consults/user';

				if (status) {
					url += `?status=${status}`;
				}

				return { url };
			},
		}),
	}),
});

export default consultApi;
export const { useBookConsultMutation, useGetConsultsQuery } = consultApi;
