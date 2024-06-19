import store from '../app/store';
import chefApi from '../features/chef/chefApi';
import userApi from '../features/user/userApi';
import { addUserData } from '../features/user/userSlice';

/**
 * Asynchronously fetches user data from the database and stores it in the Redux store.
 *
 * This function performs the following steps:
 * 1. Retrieves the userId from the Redux store.
 * 2. Fetches user data from the database using the userId.
 * 3. Extracts relevant user information from the fetched data.
 * 4. Dispatches an action to save the user data in the Redux store.
 *
 * @async
 * @function storeUserData
 * @returns {Promise<void>} A promise that resolves when the user data has been successfully stored.
 */
export default async function storeUserData() {
	// Get the userId from the store
	const { userId, role: userRole } = store.getState().auth.user || {};

	let userData = null;

	// Get user data from database using userId
	if (userRole === 'student') {
		const { data } = await store
			.dispatch(userApi.endpoints.getUserData.initiate({ userId }))
			.unwrap();

		userData = {
			_id: data?._id,
			name: data?.name,
			email: data?.email,
			emailVerified: data?.emailVerified,
			role: data?.role,
			img: data?.img,
			pkg: data?.pkg,
			createdAt: data?.createdAt,
			updatedAt: data?.updatedAt,
		};
	} else if (userRole === 'chef') {
		const { data } = await store
			.dispatch(
				chefApi.endpoints.getChef.initiate({
					chef_id: userId,
					include: 'rating',
					exclude: 'consultBookings,recipes',
				})
			)
			.unwrap();

		userData = {
			_id: data?._id,
			name: data?.name,
			email: data?.email,
			emailVerified: data?.emailVerified,
			role: data?.role,
			img: data?.img,
			bio: data?.bio,
			rating: data?.rating,
			yearsOfExperience: data?.yearsOfExperience,
			createdAt: data?.createdAt,
			updatedAt: data?.updatedAt,
		};
	}

	// Save the user data to the store
	store.dispatch(addUserData(userData));
}
