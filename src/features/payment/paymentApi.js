import apiSlice from '../api/apiSlice';

const paymentApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createPaymentIntent: builder.mutation({
			query: ({ amount }) => ({
				url: '/payments/create-payment-intent',
				method: 'POST',
				body: { amount },
			}),
		}),
		getPaymentReceipts: builder.query({
			query: ({ userId, filter }) => {
				// Define the base URL
				const baseUrl = '/payments/payment-receipt';

				// Create an object with all parameters
				const params = { userId, filter };

				// Use reduce to construct the query string without filter parameter
				const queryString = Object.entries(params)
					.reduce((acc, [key, value]) => {
						// Only include parameters that have a value
						if (value) {
							acc.push(`${key}=${encodeURIComponent(value)}`);
						}
						return acc;
					}, [])
					.join('&');

				// Construct the URL without filter parameters
				const finalUrl = queryString
					? `${baseUrl}?${queryString}`
					: baseUrl;

				return { url: finalUrl };
			},
		}),
		savePaymentReceipt: builder.mutation({
			query: ({ data }) => ({
				url: '/payments/payment-receipt',
				method: 'POST',
				body: data,
			}),

			async onQueryStarted(args, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;

					const doc = result.data?.data;

					// Assuming 'doc' contains the fields needed for filtering
					const userId = doc.userId;
					const status = doc.status;

					// Update cache for 'all' filter
					dispatch(
						apiSlice.util.updateQueryData(
							'getPaymentReceipts',
							{ filter: 'all', userId },
							(draft) => {
								draft.data.push(doc);
							}
						)
					);

					// Update cache based on the document's status
					dispatch(
						apiSlice.util.updateQueryData(
							'getPaymentReceipts',
							{ filter: status, userId },
							(draft) => {
								draft.data.push(doc);
							}
						)
					);
				} catch (error) {
					// Do nothing for now
				}
			},
		}),
		deletePaymentReceipt: builder.mutation({
			query: ({ receiptId }) => ({
				url: `/payments/payment-receipt?receiptId=${receiptId}`,
				method: 'DELETE',
			}),

			async onQueryStarted(args, { queryFulfilled, dispatch }) {
				const { userId, receiptId, filter } = args;

				// Optimistically delete the receipt
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getPaymentReceipts',
						{ filter, userId },
						(draft) => {
							const receipts = draft?.data;

							const restReceipts = receipts.filter(
								(receipt) => receipt._id !== receiptId
							);

							draft.data = restReceipts;
						}
					)
				);

				try {
					await queryFulfilled;
				} catch (error) {
					patchResult.undo();
				}
			},
		}),
		deletePaymentReceipts: builder.mutation({
			query: ({ receiptIds }) => ({
				url: `/payments/payment-receipt`,
				method: 'DELETE',
				body: { receiptIds },
			}),

			async onQueryStarted(args, { queryFulfilled, dispatch }) {
				const { userId, receiptIds, filter } = args;

				// Optimistically delete the receipt
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getPaymentReceipts',
						{ filter, userId },
						(draft) => {
							const receipts = draft?.data;

							const restReceipts = receipts.filter(
								(receipt) => !receiptIds.includes(receipt._id)
							);

							draft.data = restReceipts;
						}
					)
				);

				try {
					await queryFulfilled;
				} catch (error) {
					patchResult.undo();
				}
			},
		}),
	}),
});

export default paymentApi;
export const {
	useCreatePaymentIntentMutation,
	useGetPaymentReceiptsQuery,
	useSavePaymentReceiptMutation,
	useDeletePaymentReceiptMutation,
	useDeletePaymentReceiptsMutation,
} = paymentApi;
