import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';

/**
 * Custom React Hook to check authentication status and set credentials.
 * 
 * @returns {boolean} - Returns true when authentication status is checked.
 */
export default function useAuthCheck() {
    // Local state to track if authentication status is checked
    const [authChecked, setAuthChecked] = useState(false);

    // Dispatch function from react-redux to dispatch actions
    const dispatch = useDispatch();

    // useEffect hook to check for authentication credentials in localStorage
    useEffect(() => {
        // Parse the 'auth' item from localStorage
        const localAuth = JSON.parse(localStorage.getItem('auth'));

        // Check if user credentials are available
        if (localAuth?.accessToken && localAuth?.user) {
            // Dispatch action to set the credentials in the Redux store
            dispatch(
                setCredentials({
                    accessToken: localAuth.accessToken,
                    user: localAuth.user,
                })
            );
        }

        // Set authChecked to true after checking the authentication status
        setAuthChecked(true);
    }, [dispatch]); // Dependency on dispatch to re-run the effect when the dispatch function changes

    // Return the authChecked status
    return authChecked;
}
