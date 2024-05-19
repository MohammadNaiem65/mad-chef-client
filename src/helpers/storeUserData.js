import store from '../app/store';
import userApi from '../features/user/userApi';
import { addUserData } from '../features/user/userSlice';

export default async function storeUserData() {
	// Get the userId from the store
	const { userId } = store.getState().auth.user || {};

	// Get user data from database using userId
	const { data } = await store
		.dispatch(userApi.endpoints.getUserData.initiate({ userId }))
		.unwrap();

	const { _id, name, email, emailVerified, role, img, createdAt, pkg } =
		data || {};

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
			pkg,
		})
	);
}
