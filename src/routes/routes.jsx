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
const ForgetPassword = lazy(() => import('../pages/ForgetPassword'));
const ErrorPage = lazy(() => import('../pages/Error'));
const Banner = lazy(() => import('../components/Recipes/Banner'));

// Payment pages
const UpgradeToPro = lazy(() => import('../components/Payment/BuyProPkg'));

// * User Profile Pages
const UserMessages = lazy(() => import('../components/Profile/User/pages/Messages'));
const UserMyProfile = lazy(() => import('../components/Profile/User/pages/MyProfile/MyProfile'));

// Dashboard Pages
const UserDashboard = lazy(() => import('../components/Profile/User/pages/Dashboard/Dashboard'));
const UserLikes = lazy(() => import('../components/Profile/User/pages/Dashboard/Likes'));
const UserBookmarks = lazy(() => import('../components/Profile/User/pages/Dashboard/Bookmarks'));
const UserRatings = lazy(() => import('../components/Profile/User/pages/Dashboard/Ratings'));
const UserReviews = lazy(() => import('../components/Profile/User/pages/Dashboard/Reviews'));

// Consult Pages
const UserConsults = lazy(() => import('../components/Profile/User/pages/Consults/Consults'));
const UserConsultsCards = lazy(() => import('../components/Profile/User/pages/Consults/MyConsults'));
const ConsultForm = lazy(() => import('../components/Profile/User/pages/Consults/ConsultForm'));

// Payment History
const UserPaymentHistory = lazy(() => import('../components/Profile/User/pages/PaymentHistory/PaymentHistory'));

// * Chef Profile pages
const ChefMessages = lazy(() => import('../components/Profile/Chef/pages/Messages/Messages'));
const ChefConsults = lazy(() => import('../components/Profile/Chef/pages/Consults/Consults'));
const ChefPaymentHistory = lazy(() => import('../components/Profile/Chef/pages/PaymentHistory/PaymentHistory'));
const ChefMyProfile = lazy(() => import('../components/Profile/Chef/pages/MyProfile/MyProfile'));

// Dashboard Pages
const ChefDashboard = lazy(() => import('../components/Profile/Chef/pages/Dashboard/Dashboard'));
const ChefRecipes = lazy(() => import('../components/Profile/Chef/pages/Dashboard/Recipes/Recipes'));
const ChefComments = lazy(() => import('../components/Profile/Chef/pages/Dashboard/Comments/Comments'));
const ChefReviews = lazy(() => import('../components/Profile/Chef/pages/Dashboard/Reviews/Reviews'));

// * Admin Profile Pages
const AdminProfile = lazy(() => import('../components/Profile/Admin/Admin'));
const AdminPayments = lazy(() => import('../components/Profile/Admin/pages/Payments/Payments'));
const AdminMyProfile = lazy(() => import('../components/Profile/Admin/pages/MyProfile/MyProfile'));

// Dashboard Pages
const AdminDashboard = lazy(() => import('../components/Profile/Admin/pages/Dashboard/Dashboard'));
const AdminUsers = lazy(() => import('../components/Profile/Admin/pages/Dashboard/Users/Users'));
const AdminChefs = lazy(() => import('../components/Profile/Admin/pages/Dashboard/Chefs/Chefs'));
const AdminPromotionApplications = lazy(() => import('../components/Profile/Admin/pages/Dashboard/PromotionApplications/PromotionApplications'));

// Contents Pages
const AdminContents = lazy(() => import('../components/Profile/Admin/pages/Contents/Contents'));
const AdminRecipes = lazy(() => import('../components/Profile/Admin/pages/Contents/Recipes/Recipes'));
const AdminBlogs = lazy(() => import('../components/Profile/Admin/pages/Contents/Blogs/Blogs'));

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

					// Chef related routes
					{
						path: '/profile/chef/dashboard',
						element: <ChefDashboard />,
						children: [
							{
								path: '/profile/chef/dashboard/recipes',
								element: <ChefRecipes />,
							},
							{
								path: '/profile/chef/dashboard/comments',
								element: <ChefComments />,
							},
							{
								path: '/profile/chef/dashboard/reviews',
								element: <ChefReviews />,
							},
						],
					},
					{
						path: '/profile/chef/messages',
						element: <ChefMessages />,
					},
					{
						path: '/profile/chef/consults',
						element: <ChefConsults />,
					},
					{
						path: '/profile/chef/payment-history',
						element: <ChefPaymentHistory />,
					},
					{
						path: '/profile/chef/my-profile',
						element: <ChefMyProfile />,
					},

					// Admin related routes
					{
						path: '/profile/admin',
						element: <AdminProfile />,
						children: [
							{
								path: '/profile/admin/dashboard',
								element: <AdminDashboard />,
								children: [
									{
										path: '/profile/admin/dashboard/users',
										element: <AdminUsers />,
									},
									{
										path: '/profile/admin/dashboard/chefs',
										element: <AdminChefs />,
									},
									{
										path: '/profile/admin/dashboard/promotion-applications',
										element: <AdminPromotionApplications />,
									},
								],
							},
							{
								path: '/profile/admin/contents',
								element: <AdminContents />,
								children: [
									{
										path: '/profile/admin/contents/recipes',
										element: <AdminRecipes />,
									},
									{
										path: '/profile/admin/contents/blogs',
										element: <AdminBlogs />,
									},
								],
							},
							{
								path: '/profile/admin/payments',
								element: <AdminPayments />,
							},
							{
								path: '/profile/admin/my-profile',
								element: <AdminMyProfile />,
							},
						],
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
			{
				path: '/forget-password',
				element: (
					<PublicRoute>
						<ForgetPassword />
					</PublicRoute>
				),
			},
		],
		errorElement: <ErrorPage />,
	},
]);

export default routes;
