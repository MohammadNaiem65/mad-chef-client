import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
	// get auth data from the redux store
	const auth = useSelector((state) => state.auth);

	return auth?.accessToken && auth?.user ? (
		children
	) : (
		<Navigate to={'/login'} />
	);
}
