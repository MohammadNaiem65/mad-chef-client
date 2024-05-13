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
	}),
});

export default paymentApi;
export const {
	useCreatePaymentIntentMutation,
	useGetPaymentReceiptsQuery,
	useSavePaymentReceiptMutation,
} = paymentApi;
