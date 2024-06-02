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
	}),
});

export default roleApi;
export const {
	useApplyForPromotionMutation,
	useCheckApplicationForPromotionQuery,
} = roleApi;
