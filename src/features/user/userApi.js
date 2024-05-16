import showNotification from '../../helpers/showNotification';
import apiSlice from '../api/apiSlice';
import { setCredentials } from '../auth/authSlice';
import { addUserData } from './userSlice';

const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserData: builder.query({
			query: ({ userId, include, exclude }) => {
				// Define the base URL
				const baseUrl = `/users/user/${userId}`;

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
		updateUserPkg: builder.mutation({
			query: () => ({
				url: '/users/user/update-package',
				method: 'PATCH',
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
				try {
					await queryFulfilled;

					dispatch(addUserData({ pkg: 'pro' }));

					const { user, accessToken } = getState().auth;

					const updatedUser = { ...user };
					updatedUser.pkg = 'pro';

					dispatch(
						setCredentials({ user: updatedUser, accessToken })
					);
				} catch (error) {
					// Do nothing here
				}
			},
		}),
		editRecipeRatingByUser: builder.mutation({
			query: ({ userId, docId, data }) => ({
				url: `/users/user/${userId}/rating/recipe?docId=${docId}`,
				method: 'PATCH',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const { userId, docId, data } = arg;

				// Optimistically update the recipe rating
				const updatePatchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getRecipeRatings',
						{ data_filter: { userId } },
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
		deleteRecipeRatingByUser: builder.mutation({
			query: ({ userId, docId }) => ({
				url: `/users/user/${userId}/rating/recipe?docId=${docId}`,
				method: 'DELETE',
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const { userId, docId } = arg;

				// Optimistically delete the chef review document
				const deletePatchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getRecipeRatings',
						{ data_filter: { userId } },
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
		getChefReviewsByUser: builder.query({
			query: ({ userId }) => `/users/user/${userId}/review/chef`,
		}),
		editChefReviewsByUser: builder.mutation({
			query: ({ userId, docId, data }) => ({
				url: `/users/user/${userId}/review/chef?docId=${docId}`,
				method: 'PATCH',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const { userId, docId, data } = arg;

				// Optimistically update the recipe rating
				const updatePatchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getChefReviewsByUser',
						{ userId },
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
		deleteChefReviewByUser: builder.mutation({
			query: ({ userId, docId }) => ({
				url: `/users/user/${userId}/review/chef?docId=${docId}`,
				method: 'DELETE',
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const { userId, docId } = arg;

				// Optimistically delete the chef review document
				const deletePatchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getChefReviewsByUser',
						{ userId },
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

export default userApi;
export const {
	useGetUserDataQuery,
	useUpdateUserPkgMutation,
	useGetChefReviewsByUserQuery,
	useEditRecipeRatingByUserMutation,
	useDeleteRecipeRatingByUserMutation,
	useEditChefReviewsByUserMutation,
	useDeleteChefReviewByUserMutation,
} = userApi;
