import store from '../app/store';
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
	const { userId } = store.getState().auth.user || {};

	// Get user data from database using userId
	const { data } = await store
		.dispatch(userApi.endpoints.getUserData.initiate({ userId }))
		.unwrap();

	const {
		_id,
		name,
		email,
		emailVerified,
		role,
		img,
		createdAt,
		updatedAt,
		pkg,
	} = data || {};

	// Save the user data to the store
	store.dispatch(
		addUserData({
			_id,
			name,
			email,
			emailVerified,
			role,
			img,
			createdAt,
			updatedAt,
			pkg,
		})
	);
}
