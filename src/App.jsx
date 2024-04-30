import { useEffect, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import store from './app/store';
import useAuthCheck from './hooks/useAuthCheck';
import storeUserData from './helpers/storeUserData';
import { Footer, Navbar, Spinner } from './shared';
import './App.css';

function App() {
	// Check for authentication credentials in localStorage
	const authChecked = useAuthCheck();

	// Store user data in the redux store after initial authentication check
	useEffect(() => {
		if (authChecked) {
			storeUserData();
		}
	}, [authChecked]);

	return !authChecked ? (
		<Spinner />
	) : (
		<Provider store={store}>
			<Navbar />
			<div className='min-h-[calc(100dvh-29.475rem)] md:min-h-[calc(100vh-21.5rem)] mt-[7rem] md:mt-[8.5rem] lg:mt-[10rem]'>
				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
			</div>
			<Footer />
			<Toaster position='top-right' reverseOrder={false} />
		</Provider>
	);
}

export default App;
