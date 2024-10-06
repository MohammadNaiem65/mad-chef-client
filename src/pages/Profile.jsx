import { useState, useEffect, Suspense } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { CiCamera } from 'react-icons/ci';

import { Avatar, Spinner } from '../shared';
import { showNotification } from '../helpers';
import {
    AdminSidebar,
    PhotoUploaderModal,
    Sidebar,
} from '../components/Profile';
import { useUpdateChefProfilePictureMutation } from '../features/chef/chefApi';
import { useUpdateStudentProfilePictureMutation } from '../features/student/studentApi';
import { useUpdateAdminProfilePictureMutation } from '../features/admin/adminApi';

export default function Profile() {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRouteReady, setIsRouteReady] = useState(false);

    const { name, img, role } = useSelector((state) => state.user);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [
        updateUserProfilePicture,
        {
            isLoading: userProfileUpdateIsLoading,
            isSuccess: userProfileUpdateIsSucc,
            isError: userProfileUpdateIsError,
        },
    ] = useUpdateStudentProfilePictureMutation();
    const [
        updateChefProfilePicture,
        {
            isLoading: chefProfileUpdateIsLoading,
            isSuccess: chefProfileUpdateIsSucc,
            isError: chefProfileUpdateIsError,
        },
    ] = useUpdateChefProfilePictureMutation();
    const [
        updateAdminProfilePicture,
        {
            isLoading: adminProfileUpdateIsLoading,
            isSuccess: adminProfileUpdateIsSucc,
            isError: adminProfileUpdateIsError,
        },
    ] = useUpdateAdminProfilePictureMutation();

    // Navigate the user to proper destination based on role
    useEffect(() => {
        const paths = pathname.split('/');
        const mainPage = paths?.length > 3 ? paths[3] : 'dashboard';
        const subPage = paths?.length > 4 ? paths[4] : '';

        if (mainPage) {
            let newPath = `/profile/${role}/${mainPage}`;
            if (subPage) {
                newPath += `/${subPage}`;
            }
            navigate(newPath);
            setIsRouteReady(true);
        }
    }, [navigate, role, pathname]);

    // Handle request states
    useEffect(() => {
        if (
            userProfileUpdateIsSucc ||
            chefProfileUpdateIsSucc ||
            adminProfileUpdateIsSucc ||
            userProfileUpdateIsError ||
            chefProfileUpdateIsError ||
            adminProfileUpdateIsError
        ) {
            setShowModal(false);
        }
    }, [
        userProfileUpdateIsSucc,
        chefProfileUpdateIsSucc,
        adminProfileUpdateIsSucc,
        userProfileUpdateIsError,
        chefProfileUpdateIsError,
        adminProfileUpdateIsError,
    ]);

    // Handle loading state
    useEffect(() => {
        setIsLoading(
            userProfileUpdateIsLoading ||
                chefProfileUpdateIsLoading ||
                adminProfileUpdateIsLoading
        );
    }, [
        userProfileUpdateIsLoading,
        chefProfileUpdateIsLoading,
        adminProfileUpdateIsLoading,
    ]);

    const handleProfilePictureUpdate = (params) => {
        const updateFn =
            role === 'student'
                ? updateUserProfilePicture
                : role === 'chef'
                ? updateChefProfilePicture
                : updateAdminProfilePicture;

        showNotification('promise', 'Updating profile picture...', {
            promise: updateFn(params),
            successMessage: 'Successfully updated profile picture.',
            errorMessage: 'An error occurred. Try again later.',
        });
    };

    // Return the user if the route is not generated yet
    if (!isRouteReady) {
        return <Spinner />;
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Profile - Mad Chef</title>
            </Helmet>

            <section className='w-full xl:w-4/5 mx-auto'>
                {/* Header */}
                <div className='w-full pb-4 flex items-center gap-x-6'>
                    <div className='size-20 md:size-28 aspect-square ml-4 object-cover rounded-full relative z-20 overflow-hidden group'>
                        {img ? (
                            <img
                                src={img}
                                alt='User Image'
                                className='size-full object-cover'
                            />
                        ) : (
                            <Avatar />
                        )}
                        <div className='h-1/3 w-full bg-gray-700/20 hidden group-hover:flex items-center justify-center absolute bottom-2 md:bottom-0 left-0 z-10'>
                            <CiCamera
                                className='text-3xl cursor-pointer'
                                onClick={() => setShowModal(true)}
                            />
                        </div>
                    </div>
                    <div className='font-Popins overflow-hidden'>
                        <p className='text-lg'>Hello</p>
                        <h3 className='text-xl md:text-2xl truncate'>{name}</h3>
                    </div>
                </div>

                <section className='w-full border-t border-gray-300 flex'>
                    {role === 'admin' ? <AdminSidebar /> : <Sidebar />}

                    <section className='w-[88%] md:w-3/4'>
                        {/* Main content */}
                        <Suspense fallback={<Spinner />}>
                            <Outlet />
                        </Suspense>
                    </section>
                </section>

                {showModal && (
                    <PhotoUploaderModal
                        existingImg={img}
                        loading={isLoading}
                        setIsVisible={setShowModal}
                        onSubmitFn={handleProfilePictureUpdate}
                    />
                )}
            </section>
        </>
    );
}
