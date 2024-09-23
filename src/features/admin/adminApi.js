import apiSlice from '../api/apiSlice';
import { addUserData } from '../user/userSlice';

const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminData: builder.query({
            query: ({ id }) => ({
                url: `/admins/admin/${id}`,
                method: 'GET',
            }),
            transformResponse: (response) => response.data,
        }),
        updateAdminProfilePicture: builder.mutation({
            query: ({ formData }) => ({
                url: '/admins/admin/upload-profile-picture',
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

export default adminApi;
export const { useGetAdminDataQuery, useUpdateAdminProfilePictureMutation } =
    adminApi;
