import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';

export default function useAuthCheck() {
	// local states
	const [authChecked, setAuthChecked] = useState(false);

	// external imports
	const dispatch = useDispatch();

	// check for authentication credentials in localStorage
	useEffect(() => {
		const localAuth = JSON.parse(localStorage.getItem('auth'));

		// check if user credentials is available
		if (localAuth?.accessToken && localAuth?.user) {
			dispatch(
				setCredentials({
					accessToken: localAuth.accessToken,
					user: localAuth.user,
				})
			);
		}

		setAuthChecked(true);
	}, [dispatch]);

	return authChecked;
}
