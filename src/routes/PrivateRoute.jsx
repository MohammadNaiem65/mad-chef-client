import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { selectAuth } from '../features/auth/authSelectors';

export default function PrivateRoute({ children }) {
	// get auth data from the redux store
	const auth = useSelector(selectAuth);
	const location = useLocation();

	return auth?.accessToken && auth?.user ? (
		children
	) : (
		<Navigate to={'/login'} state={{ from: location }} replace />
	);
}
