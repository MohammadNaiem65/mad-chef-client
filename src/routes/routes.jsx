import { createBrowserRouter } from 'react-router-dom';
import {
	Blog,
	Consult,
	Dashboard,
	Home,
	Login,
	Recipes,
	Register,
} from '../pages';
import App from '../App';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/recipes',
				element: <Recipes />,
			},
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/consult',
				element: <Consult />,
			},
			{
				path: '/blog',
				element: <Blog />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},
]);

export default routes;
