import apiSlice from '../api/apiSlice';
import userApi from '../user/userApi';
import { addUserData, removeUserData } from '../user/userSlice';
import { removeCredentials, setCredentials } from './authSlice';

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        authenticate: builder.mutation({
            query: ({ token }) => ({
                url: '/auth',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: { reqType: 'registration' },
            }),
        }),
        authenticateForToken: builder.mutation({
            query: (data) => ({
                url: '/auth',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    const { user, accessToken } = data?.data || {};

                    // Store the data in the local storage
                    localStorage.setItem('auth', JSON.stringify(data.data));

                    // Store auth data in the redux store
                    dispatch(
                        setCredentials({
                            user,
                            accessToken,
                        })
                    );

                    // Get user data from database using userId
                    const { data: userDataResult } = await dispatch(
                        userApi.endpoints.getUserData.initiate({
                            userId: user?.userId,
                        })
                    ).unwrap();

                    const userData = {
                        _id: userDataResult?._id,
                        name: userDataResult?.name,
                        email: userDataResult?.email,
                        emailVerified: userDataResult?.emailVerified,
                        role: userDataResult?.role,
                        img: userDataResult?.img,
                        pkg: userDataResult?.pkg,
                        createdAt: userDataResult?.createdAt,
                        updatedAt: userDataResult?.updatedAt,
                    };

                    // Store user data in the redux store
                    dispatch(addUserData(userData));
                } catch (error) {
                    // handle error in the UI
                }
            },
        }),
        unAuthenticate: builder.mutation({
            query: (data) => ({
                url: `/auth/logout/${data.userId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;

                    dispatch(removeCredentials());
                    dispatch(removeUserData());

                    // remove credentials from local storage
                    localStorage.removeItem('auth');
                } catch (error) {
                    // handle error in the UI
                }
            },
        }),
    }),
});

export default authApi;
export const {
    useAuthenticateMutation,
    useAuthenticateForTokenMutation,
    useUnAuthenticateMutation,
} = authApi;
