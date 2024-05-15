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
	}),
});

export default paymentApi;
export const {
	useCreatePaymentIntentMutation,
	useGetPaymentReceiptsQuery,
	useSavePaymentReceiptMutation,
	useDeletePaymentReceiptMutation,
} = paymentApi;
