/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Main Pages
const Home = lazy(() => import('../pages/Home'));
const Recipes = lazy(() => import('../pages/Recipes'));
const RecipeDetails = lazy(() => import('../pages/RecipeDetails'));
const PostRecipe = lazy(() => import('../pages/PostRecipe'));
const EditRecipe = lazy(() => import('../pages/EditRecipe'));
const Profile = lazy(() => import('../pages/Profile'));
const ChefProfile = lazy(() => import('../pages/ChefProfile'));
const Payment = lazy(() => import('../pages/Payment'));
const Blog = lazy(() => import('../pages/Blog'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgetPassword = lazy(() => import('../pages/ForgetPassword'));
const ErrorPage = lazy(() => import('../pages/Error'));
const Banner = lazy(() => import('../components/Recipes/Banner'));

// Payment pages
const UpgradeToPro = lazy(() => import('../components/Payment/BuyProPkg'));

// * Student Profile Pages
const StudentMessages = lazy(() =>
    import('../components/Profile/Student/pages/Messages')
);
const StudentMyProfile = lazy(() =>
    import('../components/Profile/Student/pages/MyProfile/MyProfile')
);

// Dashboard Pages
const StudentDashboard = lazy(() =>
    import('../components/Profile/Student/pages/Dashboard/Dashboard')
);
const StudentLikes = lazy(() =>
    import('../components/Profile/Student/pages/Dashboard/Likes')
);
const StudentBookmarks = lazy(() =>
    import('../components/Profile/Student/pages/Dashboard/Bookmarks')
);
const StudentRatings = lazy(() =>
    import('../components/Profile/Student/pages/Dashboard/Ratings')
);
const StudentReviews = lazy(() =>
    import('../components/Profile/Student/pages/Dashboard/Reviews')
);

// Consult Pages
const StudentConsults = lazy(() =>
    import('../components/Profile/Student/pages/Consults/Consults')
);
const StudentConsultsCards = lazy(() =>
    import('../components/Profile/Student/pages/Consults/MyConsults')
);
const ConsultForm = lazy(() =>
    import('../components/Profile/Student/pages/Consults/ConsultForm')
);

// Payment History
const StudentPaymentHistory = lazy(() =>
    import('../components/Profile/Student/pages/PaymentHistory/PaymentHistory')
);

// * Chef Profile pages
const ChefMessages = lazy(() =>
    import('../components/Profile/Chef/pages/Messages/Messages')
);
const ChefConsults = lazy(() =>
    import('../components/Profile/Chef/pages/Consults/Consults')
);
const ChefPaymentHistory = lazy(() =>
    import('../components/Profile/Chef/pages/PaymentHistory/PaymentHistory')
);
const ChefMyProfile = lazy(() =>
    import('../components/Profile/Chef/pages/MyProfile/MyProfile')
);

// Dashboard Pages
const ChefDashboard = lazy(() =>
    import('../components/Profile/Chef/pages/Dashboard/Dashboard')
);
const ChefRecipes = lazy(() =>
    import('../components/Profile/Chef/pages/Dashboard/Recipes/Recipes')
);
const ChefComments = lazy(() =>
    import('../components/Profile/Chef/pages/Dashboard/Comments/Comments')
);
const ChefReviews = lazy(() =>
    import('../components/Profile/Chef/pages/Dashboard/Reviews/Reviews')
);

// * Admin Profile Pages
const AdminProfile = lazy(() => import('../components/Profile/Admin/Admin'));
const AdminPayments = lazy(() =>
    import('../components/Profile/Admin/pages/Payments/Payments')
);
const AdminMyProfile = lazy(() =>
    import('../components/Profile/Admin/pages/MyProfile/MyProfile')
);

// Dashboard Pages
const AdminDashboard = lazy(() =>
    import('../components/Profile/Admin/pages/Dashboard/Dashboard')
);
const AdminUsers = lazy(() =>
    import('../components/Profile/Admin/pages/Dashboard/Users/Users')
);
const AdminChefs = lazy(() =>
    import('../components/Profile/Admin/pages/Dashboard/Chefs/Chefs')
);
const AdminPromotionApplications = lazy(() =>
    import(
        '../components/Profile/Admin/pages/Dashboard/PromotionApplications/PromotionApplications'
    )
);

// Contents Pages
const AdminContents = lazy(() =>
    import('../components/Profile/Admin/pages/Contents/Contents')
);
const AdminRecipes = lazy(() =>
    import('../components/Profile/Admin/pages/Contents/Recipes/Recipes')
);
const AdminBlogs = lazy(() =>
    import('../components/Profile/Admin/pages/Contents/Blogs/Blogs')
);

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
                path: '/recipes/post-recipe',
                element: (
                    <PrivateRoute>
                        <PostRecipe />
                    </PrivateRoute>
                ),
            },
            {
                path: '/recipes/edit-recipe/:recipeId',
                element: (
                    <PrivateRoute>
                        <EditRecipe />
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
                    // Student related routes
                    {
                        path: '/profile/student/dashboard',
                        element: <StudentDashboard />,
                        children: [
                            {
                                path: '/profile/student/dashboard/likes',
                                element: <StudentLikes />,
                            },
                            {
                                path: '/profile/student/dashboard/bookmarks',
                                element: <StudentBookmarks />,
                            },
                            {
                                path: '/profile/student/dashboard/recipe-ratings',
                                element: <StudentRatings />,
                            },
                            {
                                path: '/profile/student/dashboard/chef-reviews',
                                element: <StudentReviews />,
                            },
                        ],
                    },
                    {
                        path: '/profile/student/messages',
                        element: <StudentMessages />,
                    },
                    {
                        path: '/profile/student/consults',
                        element: <StudentConsults />,
                        children: [
                            {
                                path: '/profile/student/consults/my-consults',
                                element: <StudentConsultsCards />,
                            },
                            {
                                path: '/profile/student/consults/form',
                                element: <ConsultForm />,
                            },
                        ],
                    },
                    {
                        path: '/profile/student/payment-history',
                        element: <StudentPaymentHistory />,
                    },
                    {
                        path: '/profile/student/my-profile',
                        element: <StudentMyProfile />,
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
                path: '/profile/chef/:chefId',
                element: <ChefProfile />,
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
