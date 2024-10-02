import apiSlice from '../api/apiSlice';

const newsletterApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        subscribeToNewsletter: builder.mutation({
            query: (data) => ({
                url: '/newsletter/subscribe',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export default newsletterApi;
export const { useSubscribeToNewsletterMutation } = newsletterApi;
