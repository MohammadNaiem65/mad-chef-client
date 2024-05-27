import apiSlice from '../api/apiSlice';

const consultApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		bookConsult: builder.mutation({
			query: ({ data }) => ({
				url: '/consults/consult',
				method: 'POST',
				body: data,
			}),
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
