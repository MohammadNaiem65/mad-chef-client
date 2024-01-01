import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuth } from '../features/auth/authSelectors';

export default function PrivateRoute({ children }) {
	// get auth data from the redux store
	const auth = useSelector(selectAuth);

	return auth?.accessToken && auth?.user ? (
		children
	) : (
		<Navigate to={'/login'} />
	);
}
