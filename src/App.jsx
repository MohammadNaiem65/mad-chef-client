import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from './shared';

function App() {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
