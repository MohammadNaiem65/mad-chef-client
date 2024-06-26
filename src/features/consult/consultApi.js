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
		updateConsultStatus: builder.mutation({
			query: ({ _id, data }) => ({
				url: `/consults/chef/consult/${_id}`,
				method: 'PATCH',
				body: data,
			}),

			async onQueryStarted({ _id, data }, { queryFulfilled, dispatch }) {
				let canceledDoc = null;
				const { status, link } = data || {};
				const addToStatus =
					status === 'accepted'
						? 'accepted'
						: 'failed,rejected,cancelled';

				// Optimistically remove the doc cache
				const activeConsultPatchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getConsults',
						{ status: 'pending' },
						(draft) => {
							const restData = draft.data.filter((doc) => {
								// Save the document data
								if (doc._id === _id) {
									canceledDoc = {
										...doc,
										status,
										link,
									};
								}
								return doc._id !== _id;
							});

							draft.data = restData;
						}
					)
				);

				// Optimistically remove the doc from the history
				const ConsultHistoryPatchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getConsults',
						{
							status: addToStatus,
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
		cancelConsult: builder.mutation({
			query: ({ _id }) => ({
				url: `/consults/consult/${_id}`,
				method: 'PATCH',
			}),

			async onQueryStarted(
				{ _id },
				{ queryFulfilled, dispatch, getState }
			) {
				const role = getState()?.user?.role || '';

				let canceledDoc = null;
				const removeFromStatus =
					role === 'student' ? 'accepted,pending' : 'pending';
				const addToStatus =
					role === 'student'
						? 'completed,failed,rejected,cancelled'
						: 'failed,rejected,cancelled';

				// Optimistically remove the doc cache
				const activeConsultPatchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getConsults',
						{ status: removeFromStatus },
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

				// Optimistically remove the doc from the history
				const ConsultHistoryPatchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getConsults',
						{
							status: addToStatus,
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
			async onQueryStarted(
				{ _id },
				{ queryFulfilled, dispatch, getState }
			) {
				const role = getState()?.user?.role || '';
				const patchResults = [];

				// Optimistically remove the document
				if (role === 'student') {
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

					patchResults.push(patchResult);
				} else if (role === 'chef') {
					const statuses = [
						'accepted',
						'pending',
						'completed',
						'failed,rejected,cancelled',
					];

					statuses.forEach((status) => {
						const patchResult = dispatch(
							apiSlice.util.updateQueryData(
								'getConsults',
								{ status },
								(oldData) => ({
									...oldData,
									data: oldData.data.filter(
										(consult) => consult?._id !== _id
									),
								})
							)
						);

						patchResults.push(patchResult);
					});
				}

				try {
					await queryFulfilled;
				} catch (err) {
					// Revert the cache updates
					patchResults.forEach((patchResult) => {
						patchResult.undo();
					});
				}
			},
		}),
	}),
});

export default consultApi;
export const {
	useBookConsultMutation,
	useGetConsultsQuery,
	useUpdateConsultStatusMutation,
	useCancelConsultMutation,
	useDeleteConsultMutation,
} = consultApi;
