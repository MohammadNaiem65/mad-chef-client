import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Main Pages
const Home = lazy(() => import('../pages/Home'));
const Recipes = lazy(() => import('../pages/Recipes'));
const RecipeDetails = lazy(() => import('../pages/RecipeDetails'));
const Profile = lazy(() => import('../pages/Profile'));
const Payment = lazy(() => import('../pages/Payment'));
const Blog = lazy(() => import('../pages/Blog'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ErrorPage = lazy(() => import('../pages/Error'));
const Banner = lazy(() => import('../components/Recipes/Banner'));

// User Profile Pages
const UserMessages = lazy(() => import('../components/Profile/User/pages/Messages'));
const UserMyProfile = lazy(() => import('../components/Profile/User/pages/MyProfile/MyProfile'));

// Dashboard Pages - Profile
const UserDashboard = lazy(() => import('../components/Profile/User/pages/Dashboard/Dashboard'));
const UserLikes = lazy(() => import('../components/Profile/User/pages/Dashboard/Likes'));
const UserBookmarks = lazy(() => import('../components/Profile/User/pages/Dashboard/Bookmarks'));
const UserRatings = lazy(() => import('../components/Profile/User/pages/Dashboard/Ratings'));
const UserReviews = lazy(() => import('../components/Profile/User/pages/Dashboard/Reviews'));

// Consult Pages - Profile
const UserConsults = lazy(() => import('../components/Profile/User/pages/Consults/Consults'));
const UserConsultsCards = lazy(() => import('../components/Profile/User/pages/Consults/MyConsults'));
const ConsultForm = lazy(() => import('../components/Profile/User/pages/Consults/ConsultForm'));

// Payment pages
const UpgradeToPro = lazy(() => import('../components/Payment/BuyProPkg'));

// Payment History - User Profile pages
const UserPaymentHistory = lazy(() => import('../components/Profile/User/pages/PaymentHistory/PaymentHistory'));

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
						path: '/profile/user/messages',
						element: <UserMessages />,
					},
					{
						path: '/profile/user/consults',
						element: <UserConsults />,
						children: [
							{
								path: '/profile/user/consults/my-consults',
								element: <UserConsultsCards />,
							},
							{
								path: '/profile/user/consults/form',
								element: <ConsultForm />,
							},
						],
					},
					{
						path: '/profile/user/payment-history',
						element: <UserPaymentHistory />,
					},
					{
						path: '/profile/user/my-profile',
						element: <UserMyProfile />,
					},
				],
			},
			{
				path: '/payment',
				element: (
					<PrivateRoute>
						<Payment />
					</PrivateRoute>
				),
				children: [
					{
						path: '/payment/user/upgrade-to-pro',
						element: <UpgradeToPro />,
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
		errorElement: <ErrorPage />,
	},
]);

export default routes;
