import { useState, useEffect } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useGetChefQuery } from '../../../../../features/chef/chefApi';
import {
    useDeleteChefReviewByStudentMutation,
    useEditChefReviewsByStudentMutation,
} from '../../../../../features/student/studentApi';
import showNotification from '../../../../../helpers/showNotification';
import { Avatar, ConfirmationModal, Rating } from '../../../../../shared';
import RatingForm from './RatingForm';

export default function RatingCardForChefReview({ userId, rating }) {
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { _id, chefId, rating: ratingCount, message } = rating || {};
    const { data } = useGetChefQuery({ chef_id: chefId, include: 'name,img' });
    const { name, img } = data?.data || {};

    const [editChefReview, { isSuccess: editChefReviewIsSuccess }] =
        useEditChefReviewsByStudentMutation();
    const [deleteChefReview, { isSuccess: deleteChefReviewIsSuccess }] =
        useDeleteChefReviewByStudentMutation();

    const handleDeletion = () => {
        deleteChefReview({ studentId: userId, docId: _id });
    };

    // Notify the user upon successful editing
    useEffect(() => {
        if (editChefReviewIsSuccess) {
            showNotification('success', 'Successfully updated the chef review');
        }
    }, [editChefReviewIsSuccess]);

    // Notify the user upon successful deletion
    useEffect(() => {
        if (deleteChefReviewIsSuccess) {
            showNotification('success', 'Successfully deleted the chef review');
        }
    }, [deleteChefReviewIsSuccess]);

    return (
        <div className='w-full lg:w-[27rem] mx-auto lg:mx-0 group'>
            <div className='flex border-2 rounded-lg border-gray-200 border-opacity-50 px-5 py-4 md:p-8 sm:flex-row flex-col hover:shadow-xl duration-300'>
                {/* Conditional rendering of userImg or Avatar */}
                {img ? (
                    <img
                        src={img}
                        alt={name}
                        className='w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full flex-shrink-0'
                    />
                ) : (
                    <div className='size-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 overflow-hidden'>
                        <Avatar />
                    </div>
                )}
                {editMode ? (
                    <RatingForm
                        studentId={userId}
                        docId={_id}
                        title={name}
                        message={message}
                        ratingCount={ratingCount}
                        setEditMode={setEditMode}
                        submitDocFn={editChefReview}
                    />
                ) : (
                    <div className='flex-grow'>
                        <h2 className='text-gray-900 text-lg font-medium mb-1'>
                            {name}
                        </h2>
                        <div className='text-yellow-500 flex gap-x-1'>
                            {<Rating rating={ratingCount} />}
                        </div>
                        <p className='w-60 mt-3 leading-relaxed text-justify text-gray-400 line-clamp-3 group-hover:line-clamp-none'>
                            {message}
                        </p>
                        {/* group-hover:opacity-100 */}
                        <div className='mt-5 flex justify-end gap-x-3 group-hover:'>
                            <button
                                className='px-3 py-1 hover:text-Primary flex items-center gap-x-1 rounded'
                                onClick={() => setEditMode(true)}
                            >
                                <FiEdit3 className='text-lg' /> Edit
                            </button>
                            <button
                                className='py-1 hover:text-red-500 flex items-center gap-x-1 rounded'
                                onClick={() => setShowModal(true)}
                            >
                                <RiDeleteBin6Line className='text-lg' /> Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <ConfirmationModal
                    setIsVisible={setShowModal}
                    onConfirm={handleDeletion}
                    title={'Are you sure you want to delete?'}
                    details={'This action can not be undone'}
                />
            )}
        </div>
    );
}
