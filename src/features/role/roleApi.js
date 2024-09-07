import apiSlice from '../api/apiSlice';

const roleApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        applyForPromotion: builder.mutation({
            query: ({ role }) => ({
                url: `/roles/apply-for-promotion?role=${role}`,
                method: 'POST',
            }),
        }),
        checkApplicationForPromotion: builder.query({
            query: ({ role }) => ({
                url: `/roles/has-applied-for-promotion?role=${role}`,
                method: 'GET',
            }),
        }),
        getRolePromotionApplication: builder.query({
            query: ({ applicationId }) => ({
                url: `/roles/role-promotion-application/${applicationId}`,
                method: 'GET',
            }),
        }),
        getRolePromotionApplications: builder.query({
            query: ({ page, limit, sort, order }) => {
                // Define the base URL
                const baseUrl = '/roles/role-promotion-applications';

                // Create an object with required parameters
                const params = {
                    page,
                    limit,
                    sort,
                    order,
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

                // return the object
                return { url: `${baseUrl}?${queryString}` };
            },
        }),
        updatePromotionApplicationStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/roles/update-promotion-application-status?id=${id}&status=${status}`,
                method: 'PATCH',
            }),
        }),
        deletePromotionApplication: builder.mutation({
            query: ({ id }) => ({
                url: `/roles/delete-promotion-application/${id}`,
                method: 'PATCH',
            }),
        }),
    }),
});

export default roleApi;
export const {
    useApplyForPromotionMutation,
    useCheckApplicationForPromotionQuery,
    useGetRolePromotionApplicationQuery,
    useGetRolePromotionApplicationsQuery,
    useUpdatePromotionApplicationStatusMutation,
    useDeletePromotionApplicationMutation,
} = roleApi;
