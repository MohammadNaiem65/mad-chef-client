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
							{ status: 'accepted,pending' },
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
			query: ({ status, date }) => {
				let url = '/consults';

				if (status) {
					url += `?status=${status}`;

					if (date) {
						const encodedDate = encodeURIComponent(
							JSON.stringify(date)
						);

						url += `&date=${encodedDate}`;
					}
				}

				if (!status && date) {
					const encodedDate = encodeURIComponent(
						JSON.stringify(date)
					);

					url += `?date=${encodedDate}`;
				}

				return { url };
			},
		}),
		cancelConsult: builder.mutation({
			query: ({ _id }) => ({
				url: `/consults/consult/${_id}`,
				method: 'PATCH',
			}),

			async onQueryStarted({ _id }, { queryFulfilled, dispatch }) {
				let canceledDoc = null;

				// Optimistically update Active Consult cache
				const activeConsultPatchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getConsults',
						{ status: 'accepted,pending' },
						(draft) => {
							const restData = draft.data.filter((doc) => {
								// Save the document data
								if (doc._id === _id) {
									canceledDoc = {
										...doc,
										status: 'cancelled',
									};
								}
								return doc._id !== _id;
							});

							draft.data = restData;
						}
					)
				);

				// Optimistically update Consult History cache
				const ConsultHistoryPatchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getConsults',
						{
							status: 'completed,failed,rejected,cancelled',
						},
						(draft) => {
							draft.data.push(canceledDoc);
						}
					)
				);
				try {
					await queryFulfilled;
				} catch (err) {
					// Revert the cache update
					activeConsultPatchResult.undo();
					ConsultHistoryPatchResult.undo();
				}
			},
		}),
		deleteConsult: builder.mutation({
			query: ({ _id }) => ({
				url: `/consults/consult/${_id}`,
				method: 'DELETE',
			}),
			async onQueryStarted({ _id }, { queryFulfilled, dispatch }) {
				// Optimistically remove the document
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getConsults',
						{ status: 'completed,failed,rejected,cancelled' },
						(oldData) => ({
							...oldData,
							data: oldData.data.filter(
								(consult) => consult?._id !== _id
							),
						})
					)
				);

				try {
					await queryFulfilled;
				} catch (err) {
					// Revert the cache update
					patchResult.undo();
				}
			},
		}),
	}),
});

export default consultApi;
export const {
	useBookConsultMutation,
	useGetConsultsQuery,
	useCancelConsultMutation,
	useDeleteConsultMutation,
} = consultApi;
