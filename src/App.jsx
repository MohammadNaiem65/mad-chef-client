import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from './shared';
import { Suspense } from 'react';

function App() {
	return (
		<>
			<Navbar />
			<Suspense fallback={<h1>Loading...</h1>}>
				<Outlet />
			</Suspense>
			<Footer />
		</>
	);
}

export default App;
