import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from './shared';
import { Suspense } from 'react';

function App() {
	return (
		<>
			<Navbar />
			<div className='min-h-[calc(100dvh-29.475rem)] md:min-h-[calc(100vh-21.5rem)]'>
				<Suspense fallback={<h1>Loading...</h1>}>
					<Outlet />
				</Suspense>
			</div>
			<Footer />
		</>
	);
}

export default App;
