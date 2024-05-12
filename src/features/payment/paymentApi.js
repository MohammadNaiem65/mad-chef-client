import apiSlice from '../api/apiSlice';

const paymentApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createPaymentIntent: builder.mutation({
			query: ({ amount }) => ({
				url: '/payment/create-payment-intent',
				method: 'POST',
				body: { amount },
			}),
		}),
		savePaymentReceipt: builder.mutation({
			query: ({ data }) => ({
				url: '/payment/save-payment-receipt',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export default paymentApi;
export const { useCreatePaymentIntentMutation, useSavePaymentReceiptMutation } =
	paymentApi;
