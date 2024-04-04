import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Home = lazy(() => import('../pages/Home'));
const Recipes = lazy(() => import('../pages/Recipes'));
const RecipeDetails = lazy(() => import('../pages/RecipeDetails'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Consult = lazy(() => import('../pages/Consult'));
const Profile = lazy(() => import('../pages/Profile'));
const Blog = lazy(() => import('../pages/Blog'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Banner = lazy(() => import('../components/Recipes/Banner'));

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
						element: <Banner />,
					},
				],
			},
			{
				path: '/recipes/recipe/:id',
				element: (
					<PrivateRoute>
						<RecipeDetails />
					</PrivateRoute>
				),
			},
			{
				path: '/dashboard',
				element: (
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				),
			},
			{
				path: '/consult',
				element: (
					<PrivateRoute>
						<Consult />
					</PrivateRoute>
				),
			},
			{
				path: '/profile',
				element: (
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				),
			},
			{
				path: '/blog',
				element: <Blog />,
			},
			{
				path: '/login',
				element: (
					<PublicRoute>
						<Login />
					</PublicRoute>
				),
			},
			{
				path: '/register',
				element: (
					<PublicRoute>
						<Register />
					</PublicRoute>
				),
			},
		],
	},
]);

export default routes;
