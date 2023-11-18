import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import RecipeDetails from '../pages/RecipeDetails';
const Home = lazy(() => import('../pages/Home'));
const Recipes = lazy(() => import('../pages/Recipes'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Consult = lazy(() => import('../pages/Consult'));
const Blog = lazy(() => import('../pages/Blog'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

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
				path: '/home',
				element: <Home />,
			},
			{
				path: '/recipes',
				element: <Recipes />,
				children: [
					{
						path: '/recipes/:id',
						element: <Recipes />,
					},
				],
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
