import apiSlice from '../api/apiSlice';

const recipeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: ({
                data_filter = {},
                page,
                limit,
                sort,
                order,
                include,
                exclude,
                role,
            }) => {
                // Define the base URL
                const baseUrl = '/recipes';

                // Create an object with all parameters
                const params = {
                    page,
                    limit,
                    sort,
                    order,
                    include,
                    exclude,
                    role,
                };

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

                let url;

                // Add filter options if has values
                const dataFilterKeys = Object.keys(data_filter);
                if (dataFilterKeys.length > 0) {
                    const filterKeysWithValues = {};
                    dataFilterKeys.forEach((elKey) => {
                        if (data_filter[elKey]) {
                            filterKeysWithValues[elKey] = data_filter[elKey];
                        }
                    });

                    const stringifiedDataFilter =
                        JSON.stringify(filterKeysWithValues);

                    const encodedDataFiler = encodeURIComponent(
                        stringifiedDataFilter
                    );

                    if (queryString) {
                        url = `${baseUrl}?${queryString}&data_filter=${encodedDataFiler}`;
                    } else {
                        url = `${baseUrl}?data_filter=${encodedDataFiler}`;
                    }
                } else {
                    url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
                }

                return { url };
            },
        }),
        getRecipe: builder.query({
            query: ({ recipeId, include, exclude }) => {
                // Define the base URL
                const baseUrl = `/recipes/recipe/${recipeId}`;

                // Create an object with all parameters
                const params = {
                    include,
                    exclude,
                };

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

                let url;

                url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

                return { url };
            },
        }),
        postRecipe: builder.mutation({
            query: ({ data }) => ({
                url: '/recipes/post-recipe',
                method: 'POST',
                body: data,
                formData: true,
            }),
        }),
        editRecipe: builder.mutation({
            query: ({ recipeId, data }) => ({
                url: `/recipes/edit-recipe/${recipeId}`,
                method: 'PATCH',
                body: data,
                formData: true,
            }),

            async onQueryStarted({ recipeId }, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getRecipe',
                            { recipeId },
                            (draft) => {
                                draft.data = data.data;
                            }
                        )
                    );
                } catch (error) {
                    // Handle error in the page
                }
            },
        }),
        deleteRecipe: builder.mutation({
            query: ({ recipeId }) => ({
                url: `/recipes/recipe/${recipeId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { recipeId, filters } = arg;

                // Optimistically update the cache
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getRecipes',
                        filters,
                        (draft) => {
                            const restRecipes = draft.data.filter(
                                (recipe) => recipe._id !== recipeId
                            );

                            draft.data = restRecipes;
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
        updateRecipeStatus: builder.mutation({
            query: ({ recipeId, status }) => ({
                url: `/recipes/recipe/${recipeId}/update-status?status=${status}`,
                method: 'PATCH',
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { recipeId, status, filters } = arg;

                // Optimistically update the "getRecipes" query cache
                const patchResultOne = dispatch(
                    apiSlice.util.updateQueryData(
                        'getRecipes',
                        filters,
                        (draft) => {
                            const recipeToUpdate = draft.data.find(
                                (recipe) => recipe._id === recipeId
                            );

                            recipeToUpdate.status = status;
                        }
                    )
                );

                // Optimistically update the "getRecipe" query cache
                const patchResultTwo = dispatch(
                    apiSlice.util.updateQueryData(
                        'getRecipe',
                        { recipeId },
                        (draft) => {
                            const recipeData = draft.data;

                            recipeData.status = status;
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResultOne.undo();
                    patchResultTwo.undo();
                }
            },
        }),
        getRecipeRatings: builder.query({
            query: ({
                data_filter = {},
                recipeId,
                page,
                limit,
                sort,
                order,
                include,
                exclude,
            }) => {
                // Define the base URL
                const baseUrl = !recipeId
                    ? '/recipes/ratings'
                    : `/recipes/recipe/${recipeId}/ratings`;

                // Create an object with all parameters
                const params = {
                    recipeId,
                    page,
                    limit,
                    sort,
                    order,
                    include,
                    exclude,
                };

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
                const urlWithoutFilterOptions = queryString
                    ? `${baseUrl}?${queryString}`
                    : baseUrl;

                let url;

                // Add filter options which has values
                const dataFilterKeys = Object.keys(data_filter);
                if (dataFilterKeys.length > 0) {
                    const filterKeysWithValues = {};
                    dataFilterKeys.forEach((elKey) => {
                        if (data_filter[elKey]) {
                            filterKeysWithValues[elKey] = data_filter[elKey];
                        }
                    });

                    if (Object.keys(filterKeysWithValues).length > 0) {
                        const stringifiedDataFilter =
                            JSON.stringify(filterKeysWithValues);

                        const encodedDataFiler = encodeURIComponent(
                            stringifiedDataFilter
                        );

                        if (baseUrl !== urlWithoutFilterOptions) {
                            url =
                                urlWithoutFilterOptions +
                                `&data_filter=${encodedDataFiler}`;
                        } else {
                            url =
                                urlWithoutFilterOptions +
                                `?data_filter=${encodedDataFiler}`;
                        }
                    } else {
                        url = urlWithoutFilterOptions;
                    }
                } else {
                    url = urlWithoutFilterOptions;
                }

                return { url };
            },
        }),
        addRecipeRating: builder.mutation({
            query: ({ recipeId, data }) => ({
                url: `/recipes/recipe/${recipeId}/ratings`,
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(
                { recipeId, data },
                { queryFulfilled, dispatch }
            ) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getRecipeRatings',
                        { recipeId },
                        (draft) => {
                            draft.data = [data, ...draft.data];
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
        getBookmarkedRecipe: builder.query({
            query: ({ studentId, recipeId }) =>
                `/students/student/${studentId}/bookmark?recipeId=${recipeId}`,
        }),
        getBookmarkedRecipes: builder.query({
            query: ({ studentId }) =>
                `/students/student/${studentId}/bookmarks`,
        }),
        bookmarkRecipe: builder.mutation({
            query: ({ studentId, recipeId }) => ({
                url: `/students/student/${studentId}/add-bookmark?recipeId=${recipeId}`,
                method: 'POST',
            }),

            async onQueryStarted(
                { studentId, recipeId },
                { queryFulfilled, dispatch }
            ) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getBookmarkedRecipe',
                        { studentId, recipeId },
                        (draft) => {
                            draft.data = { studentId, recipeId };
                        }
                    )
                );

                try {
                    const result = await queryFulfilled;

                    // Add document _id into getBookmarkedRecipe cache
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getBookmarkedRecipe',
                            { studentId, recipeId },
                            (draft) => {
                                draft = result.data;

                                return draft;
                            }
                        )
                    );
                } catch (error) {
                    // Revert the changes
                    patchResult.undo();
                }
            },
        }),
        removeBookmarkFromRecipe: builder.mutation({
            query: ({ studentId, recipeId }) => ({
                url: `/students/student/${studentId}/remove-bookmark?recipeId=${recipeId}`,
                method: 'DELETE',
            }),

            async onQueryStarted(
                { studentId, recipeId },
                { queryFulfilled, dispatch }
            ) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getBookmarkedRecipe',
                        { studentId, recipeId },
                        (draft) => {
                            draft.data = {};
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    // Revert the changes
                    patchResult.undo();
                }
            },
        }),
        getLikedRecipe: builder.query({
            query: ({ studentId, recipeId }) =>
                `/students/student/${studentId}/like?recipeId=${recipeId}`,
        }),
        getLikedRecipes: builder.query({
            query: ({ studentId }) => `/students/student/${studentId}/likes`,
        }),
        addLikeToRecipe: builder.mutation({
            query: ({ studentId, recipeId }) => ({
                url: `/students/student/${studentId}/add-like?recipeId=${recipeId}`,
                method: 'POST',
            }),

            async onQueryStarted(
                { studentId, recipeId },
                { queryFulfilled, dispatch }
            ) {
                const patchResultOne = dispatch(
                    apiSlice.util.updateQueryData(
                        'getRecipe',
                        { recipeId },
                        (draft) => {
                            ++draft.data.like;
                        }
                    )
                );

                const patchResultTwo = dispatch(
                    apiSlice.util.updateQueryData(
                        'getLikedRecipe',
                        { studentId, recipeId },
                        (draft) => {
                            draft = {
                                message: 'Successful',
                                data: {
                                    studentId,
                                    recipeId,
                                },
                            };

                            return draft;
                        }
                    )
                );

                try {
                    const result = await queryFulfilled;

                    // Add document _id getLikedRecipe cache
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getLikedRecipe',
                            { studentId, recipeId },
                            (draft) => {
                                draft = result.data;

                                return draft;
                            }
                        )
                    );
                } catch (error) {
                    // Revert the changes
                    patchResultOne.undo();
                    patchResultTwo.undo();
                }
            },
        }),
        removeLikeFromRecipe: builder.mutation({
            query: ({ studentId, recipeId }) => ({
                url: `/students/student/${studentId}/remove-like?recipeId=${recipeId}`,
                method: 'DELETE',
            }),

            async onQueryStarted(
                { studentId, recipeId },
                { queryFulfilled, dispatch }
            ) {
                const patchResultOne = dispatch(
                    apiSlice.util.updateQueryData(
                        'getRecipe',
                        { recipeId },
                        (draft) => {
                            if (draft.data.like === 0) {
                                draft.data.like = 0;
                            } else {
                                --draft.data.like;
                            }
                        }
                    )
                );

                const patchResultTwo = dispatch(
                    apiSlice.util.updateQueryData(
                        'getLikedRecipe',
                        { studentId, recipeId },
                        (draft) => {
                            draft = {
                                message: "You didn't like the recipe.",
                                data: {},
                            };

                            return draft;
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    // Revert the changes
                    patchResultOne.undo();
                    patchResultTwo.undo();
                }
            },
        }),
    }),
});

export default recipeApi;
export const {
    useGetRecipesQuery,
    useGetRecipeQuery,
    usePostRecipeMutation,
    useEditRecipeMutation,
    useDeleteRecipeMutation,
    useUpdateRecipeStatusMutation,
    useGetRecipeRatingsQuery,
    useAddRecipeRatingMutation,
    useGetBookmarkedRecipeQuery,
    useGetBookmarkedRecipesQuery,
    useBookmarkRecipeMutation,
    useRemoveBookmarkFromRecipeMutation,
    useGetLikedRecipeQuery,
    useGetLikedRecipesQuery,
    useAddLikeToRecipeMutation,
    useRemoveLikeFromRecipeMutation,
} = recipeApi;
