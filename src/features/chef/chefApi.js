import apiSlice from '../api/apiSlice';
import { addUserData } from '../user/userSlice';

const chefApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getChefs: builder.query({
            query: ({ page, limit, sort, order, include, exclude }) => {
                // Define the base URL
                const baseUrl = '/chefs';

                // Create an object with all parameters
                const params = { page, limit, sort, order, include, exclude };

                // Use reduce to construct the query string
                const queryString = Object.entries(params)
                    .reduce((acc, [key, value]) => {
                        // Only include parameters that have a value
                        if (value !== undefined) {
                            acc.push(`${key}=${encodeURIComponent(value)}`);
                        }
                        return acc;
                    }, [])
                    .join('&');

                // Construct the final URL
                const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

                return { url };
            },

            serializeQueryArgs: ({ queryArgs }) => {
                const { page, limit, sort, order, include, exclude, merge } =
                    queryArgs;

                const args = { limit, sort, order, include, exclude };

                // If merge is true, ignore page number to merge previous cache
                if (merge) {
                    args.page = 'all'; // Use 'all' to ignore page number
                } else {
                    args.page = page;
                }

                return args;
            },

            // Merge the incoming data with the existing data
            merge: (existingResponse, incomingResponse, { arg }) => {
                const { merge } = arg || false;

                if (merge) {
                    incomingResponse.data = [
                        ...existingResponse.data,
                        ...incomingResponse.data,
                    ];
                }

                return incomingResponse;
            },

            // force to refetch if query argument (page) changes
            forceRefetch: ({ currentArg, previousArg }) => {
                return (
                    currentArg?.page !== undefined &&
                    previousArg?.page !== currentArg?.page
                );
            },
        }),
        getChef: builder.query({
            query: ({ chef_id, include, exclude }) => {
                const baseUrl = `/chefs/chef/${chef_id}`;
                const params = { include, exclude };

                // Use reduce to construct the query string
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
                const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

                return { url };
            },
        }),
        getChefReviews: builder.query({
            query: ({ chef_id, page, limit, sort, order }) => {
                // Define the base URL
                const baseUrl = `/chefs/chef/${chef_id}/reviews`;

                // Create an object with all parameters
                const params = { page, limit, sort, order };

                // Use reduce to construct the query string
                const queryString = Object.entries(params)
                    .reduce((acc, [key, value]) => {
                        // Only include parameters that have a value
                        if (value !== undefined) {
                            acc.push(`${key}=${encodeURIComponent(value)}`);
                        }
                        return acc;
                    }, [])
                    .join('&');

                // Construct the final URL
                const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

                return { url };
            },
        }),
        addChefReview: builder.mutation({
            query: ({ chef_id, data }) => ({
                url: `/chefs/chef/${chef_id}/reviews`,
                method: 'POST',
                body: data,
            }),
        }),
        updateChefProfilePicture: builder.mutation({
            query: ({ formData }) => ({
                url: '/chefs/chef/upload-profile-picture',
                method: 'POST',
                body: formData,
            }),

            async onQueryStarted(arg, { queryFulfilled, getState, dispatch }) {
                const { imgUrl } = arg;

                try {
                    await queryFulfilled;

                    const existingChefData = getState().user;

                    // update the chef data
                    const updatedData = { ...existingChefData, img: imgUrl };

                    // update the cache
                    dispatch(addUserData(updatedData));
                } catch (error) {
                    // do nothing
                }
            },
        }),
    }),
});

export default chefApi;
export const {
    useGetChefsQuery,
    useGetChefQuery,
    useGetChefReviewsQuery,
    useAddChefReviewMutation,
    useUpdateChefProfilePictureMutation,
} = chefApi;
