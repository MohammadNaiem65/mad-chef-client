import showNotification from '../../helpers/showNotification';
import apiSlice from '../api/apiSlice';
import { setCredentials } from '../auth/authSlice';
import { addUserData } from '../user/userSlice';

const studentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStudentData: builder.query({
            query: ({ studentId, include, exclude }) => {
                // Define the base URL
                const baseUrl = `/students/student/${studentId}`;

                // Create an object with all parameters
                const params = { include, exclude };

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

                let finalUrl = baseUrl;

                if (queryString) {
                    finalUrl += `?${queryString}`;
                }

                return { url: finalUrl };
            },
        }),
        getStudentsData: builder.query({
            query: ({ page = 1, limit = 10, sort = 'name', order = 'asc' }) => {
                // Define the base URL
                const baseUrl = '/students';

                // Create an object with all parameters
                const params = { page, limit, sort, order };

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

                let finalUrl = baseUrl;

                if (queryString) {
                    finalUrl += `?${queryString}`;
                }

                return { url: finalUrl };
            },
        }),
        updateStudentData: builder.mutation({
            query: ({ data }) => ({
                url: '/students/student/update-data',
                method: 'PATCH',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { studentId, data } = arg;

                const queryPatchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getStudentData',
                        { studentId },
                        (draft) => {
                            const prevData = draft.data.data;

                            const updatedData = { ...prevData, ...data };

                            draft.data.data = updatedData;
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    queryPatchResult.undo();
                }
            },
        }),
        updateStudentProfilePicture: builder.mutation({
            query: ({ formData }) => ({
                url: '/students/student/upload-profile-picture',
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
        updateStudentPkg: builder.mutation({
            query: () => ({
                url: '/students/student/update-package',
                method: 'PATCH',
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken } = data?.data || {};

                    const userData = getState().user || {};

                    // Update the user data in the store
                    dispatch(
                        addUserData({
                            ...userData,
                            pkg: 'pro',
                        })
                    );

                    const { user } = getState().auth;

                    const updatedUser = { ...user };
                    updatedUser.pkg = 'pro';

                    dispatch(
                        setCredentials({
                            user: updatedUser,
                            accessToken,
                        })
                    );

                    // Store auth data in the local storage
                    localStorage.setItem(
                        'auth',
                        JSON.stringify({ user: updatedUser, accessToken })
                    );
                } catch (error) {
                    // Do nothing here
                }
            },
        }),
        editRecipeRatingByStudent: builder.mutation({
            query: ({ studentId, docId, data }) => ({
                url: `/students/student/${studentId}/rating/recipe?docId=${docId}`,
                method: 'PATCH',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { studentId, docId, data } = arg;

                // Optimistically update the recipe rating
                const updatePatchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getRecipeRatings',
                        { data_filter: { studentId } },
                        (draft) => {
                            const ratings = draft?.data;

                            const recipeToEdit = ratings.find(
                                (rating) => rating?._id === docId
                            );

                            recipeToEdit.rating = data.rating;
                            recipeToEdit.message = data.message;
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    // Revert the optimistic patch updates and notify the user
                    updatePatchResult.undo();
                    showNotification(
                        'error',
                        'An error occurred while updating the rating.'
                    );
                }
            },
        }),
        deleteRecipeRatingByStudent: builder.mutation({
            query: ({ studentId, docId }) => ({
                url: `/students/student/${studentId}/rating/recipe?docId=${docId}`,
                method: 'DELETE',
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { studentId, docId } = arg;

                // Optimistically delete the chef review document
                const deletePatchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getRecipeRatings',
                        { data_filter: { studentId } },
                        (draft) => {
                            const documents = draft?.data;

                            const docsWithoutDeletedOne = documents?.filter(
                                (doc) => doc._id !== docId
                            );

                            draft.data = docsWithoutDeletedOne;
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    // Revert the optimistically deleting rating document and notify the user
                    deletePatchResult.undo();
                    showNotification(
                        'error',
                        'An error occurred while deleting the rating'
                    );
                }
            },
        }),
        getChefReviewsByStudent: builder.query({
            query: ({ studentId }) =>
                `/students/student/${studentId}/review/chef`,
        }),
        editChefReviewsByStudent: builder.mutation({
            query: ({ studentId, docId, data }) => ({
                url: `/students/student/${studentId}/review/chef?docId=${docId}`,
                method: 'PATCH',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { studentId, docId, data } = arg;

                // Optimistically update the recipe rating
                const updatePatchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getChefReviewsByUser',
                        { studentId },
                        (draft) => {
                            const ratings = draft?.data;

                            const recipeToEdit = ratings.find(
                                (rating) => rating?._id === docId
                            );

                            recipeToEdit.rating = data.rating;
                            recipeToEdit.message = data.message;
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    // Revert the optimistic patch updates and notify the user
                    updatePatchResult.undo();
                    showNotification(
                        'error',
                        'An error occurred while updating the review'
                    );
                }
            },
        }),
        deleteChefReviewByStudent: builder.mutation({
            query: ({ studentId, docId }) => ({
                url: `/students/student/${studentId}/review/chef?docId=${docId}`,
                method: 'DELETE',
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { studentId, docId } = arg;

                // Optimistically delete the chef review document
                const deletePatchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getChefReviewsByUser',
                        { studentId },
                        (draft) => {
                            const documents = draft?.data;

                            const docsWithoutDeletedOne = documents?.filter(
                                (doc) => doc._id !== docId
                            );

                            draft.data = docsWithoutDeletedOne;
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    // Revert the optimistically deleting review document and notify the user
                    deletePatchResult.undo();
                    showNotification(
                        'error',
                        'An error occurred while deleting the review'
                    );
                }
            },
        }),
    }),
});

export default studentApi;
export const {
    useGetStudentDataQuery,
    useGetStudentsDataQuery,
    useUpdateStudentDataMutation,
    useUpdateStudentProfilePictureMutation,
    useUpdateStudentPkgMutation,
    useEditRecipeRatingByStudentMutation,
    useDeleteRecipeRatingByStudentMutation,
    useGetChefReviewsByStudentQuery,
    useEditChefReviewsByStudentMutation,
    useDeleteChefReviewByStudentMutation,
} = studentApi;
