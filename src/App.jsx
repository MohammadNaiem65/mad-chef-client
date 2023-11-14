import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar, Spinner } from './shared';

function App() {
	return (
		<>
			<Navbar />
			<div className='min-h-[calc(100dvh-29.475rem)] md:min-h-[calc(100vh-21.5rem)] mt-[4.625rem] md:mt-[5.5rem] lg:mt-[10rem]'>
				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
			</div>
			<Footer />
		</>
	);
}

export default App;
