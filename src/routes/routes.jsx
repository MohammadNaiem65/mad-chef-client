import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Main Pages
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

// Dashboard - User Pages
const UserConsults = lazy(() => import('../components/Profile/User/pages/Consults'));
const UserMessages = lazy(() => import('../components/Profile/User/pages/Messages'));
const UserMyProfile = lazy(() => import('../components/Profile/User/pages/MyProfile/MyProfile'));
const UserDashboard = lazy(() => import('../components/Profile/User/pages/Dashboard/Dashboard'));
const UserLikes = lazy(() => import('../components/Profile/User/pages/Dashboard/Likes'));
const UserBookmarks = lazy(() => import('../components/Profile/User/pages/Dashboard/Bookmarks'));
const UserRatings = lazy(() => import('../components/Profile/User/pages/Dashboard/Ratings'));
const UserReviews = lazy(() => import('../components/Profile/User/pages/Dashboard/Reviews'));

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
						path: '/recipes/:chefId',
						element: <Banner />,
					},
				],
			},
			{
				path: '/recipes/recipe/:recipeId',
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
				children: [
					// User related routes
					{
						path: '/profile/user/dashboard',
						element: <UserDashboard />,
						children: [
							{
								path: '/profile/user/dashboard/likes',
								element: <UserLikes />,
							},
							{
								path: '/profile/user/dashboard/bookmarks',
								element: <UserBookmarks />,
							},
							{
								path: '/profile/user/dashboard/recipe-ratings',
								element: <UserRatings />,
							},
							{
								path: '/profile/user/dashboard/chef-reviews',
								element: <UserReviews />,
							},
						],
					},
					{
						path: '/profile/user/consults',
						element: <UserConsults />,
					},
					{
						path: '/profile/user/messages',
						element: <UserMessages />,
					},
					{
						path: '/profile/user/my-profile',
						element: <UserMyProfile />,
					},
				],
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
