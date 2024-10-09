import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BiSolidHide } from 'react-icons/bi';
import { FaEye, FaPen, FaHeart, FaStar } from 'react-icons/fa';
import {
    HiOutlineClipboardDocument,
    HiClipboardDocumentCheck,
} from 'react-icons/hi2';
import {
    MdOutlineBookmarkAdd,
    MdBookmarkAdded,
    MdDeleteForever,
} from 'react-icons/md';
import { useGetChefQuery } from '../../features/chef/chefApi';
import {
    useAddLikeToRecipeMutation,
    useBookmarkRecipeMutation,
    useDeleteRecipeMutation,
    useGetBookmarkedRecipeQuery,
    useGetLikedRecipeQuery,
    useRemoveBookmarkFromRecipeMutation,
    useRemoveLikeFromRecipeMutation,
    useUpdateRecipeStatusMutation,
} from '../../features/recipe/recipeApi';
import { showNotification } from '../../helpers';
import { ConfirmationModal } from '../../shared';

export default function ChefDetails({
    author,
    rating,
    like,
    recipeId,
    createdAt,
    status,
}) {
    const navigate = useNavigate();
    const [copiedId, setCopiedId] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { _id: currUserId, role } = useSelector((state) => state.user);

    // Fetch chef data
    const { data: chefData } = useGetChefQuery({
        chef_id: author,
        include: 'name,img',
    });
    const { _id, name, img } = chefData?.data || {};

    // Fetch liked and bookmarked status
    const { data: docLiked } = useGetLikedRecipeQuery(
        {
            studentId: currUserId,
            recipeId,
        },
        { skip: role !== 'student' }
    );
    const { data: docBookmarked } = useGetBookmarkedRecipeQuery(
        {
            studentId: currUserId,
            recipeId,
        },
        { skip: role !== 'student' }
    );

    // API mutations
    const [
        updateRecipeStatus,
        { isSuccess: updateStatusIsSucc, isError: updateStatusIsErr },
    ] = useUpdateRecipeStatusMutation();
    const [deleteRecipe, { isSuccess: deleteRecipeIsSucc }] =
        useDeleteRecipeMutation();
    const [addLike] = useAddLikeToRecipeMutation();
    const [removeLike] = useRemoveLikeFromRecipeMutation();
    const [addBookmark] = useBookmarkRecipeMutation();
    const [removeBookmark] = useRemoveBookmarkFromRecipeMutation();

    // Handle copying chef ID
    const copyId = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(_id);
            setCopiedId(true);
            setTimeout(() => setCopiedId(false), 2000);
        } catch (error) {
            console.error('Failed to copy ID:', error);
        }
    }, [_id]);

    // Handle updating recipe status
    const handleUpdateRecipeStatus = useCallback(
        (newStatus) => {
            updateRecipeStatus({ recipeId, status: newStatus });
        },
        [recipeId, updateRecipeStatus]
    );

    // Handle deleting recipe
    const handleDeleteRecipe = useCallback(() => {
        setShowModal(false);
        showNotification('promise', 'Deleting the recipe...', {
            promise: deleteRecipe({ recipeId }),
            successMessage: 'Successfully deleted the recipe.',
            errorMessage: 'An error occurred while deleting.',
        });
    }, [recipeId, deleteRecipe]);

    // Handle toggling like
    const handleToggleLike = useCallback(() => {
        if (role !== 'student') {
            return;
        }

        const action = docLiked?.data?.studentId ? removeLike : addLike;
        action({ studentId: currUserId, recipeId });
    }, [
        docLiked?.data?.studentId,
        role,
        currUserId,
        recipeId,
        removeLike,
        addLike,
    ]);

    // Handle toggling bookmark
    const handleToggleBookmark = useCallback(() => {
        if (role !== 'student') {
            return;
        }

        const action = docBookmarked?.data?.studentId
            ? removeBookmark
            : addBookmark;
        action({ studentId: currUserId, recipeId });
    }, [
        docBookmarked?.data?.studentId,
        role,
        currUserId,
        recipeId,
        removeBookmark,
        addBookmark,
    ]);

    // Handle notifications and navigation
    useEffect(() => {
        if (updateStatusIsSucc) {
            showNotification('success', 'Successfully updated the status.');
        } else if (updateStatusIsErr) {
            showNotification(
                'error',
                'An error occurred while updating status.'
            );
        } else if (deleteRecipeIsSucc) {
            navigate('/recipes');
        }
    }, [navigate, updateStatusIsSucc, updateStatusIsErr, deleteRecipeIsSucc]);

    // Render chef actions if the current user is the author
    const renderChefActions = () => {
        if (currUserId !== author) return null;

        return (
            <div className='flex items-center gap-x-2'>
                <Link
                    to={`/recipes/edit-recipe/${recipeId}`}
                    className='px-3 py-1 border-2 border-blue-400 bg-blue-100 text-lg text-blue-400 flex items-center gap-x-1 rounded'
                >
                    Edit <FaPen className='text-base' />
                </Link>
                {status === 'published' ? (
                    <button
                        className='px-3 py-1 border-2 border-orange-400 bg-orange-100 text-lg text-orange-400 flex items-center gap-x-1 rounded'
                        onClick={() => handleUpdateRecipeStatus('hidden')}
                    >
                        Hide <BiSolidHide />
                    </button>
                ) : (
                    status === 'hidden' && (
                        <button
                            className='px-3 py-1 border-2 border-green-400 bg-green-100 text-lg text-green-400 flex items-center gap-x-1 rounded'
                            onClick={() =>
                                handleUpdateRecipeStatus('published')
                            }
                        >
                            Publish <FaEye />
                        </button>
                    )
                )}
                <button
                    className='px-3 py-1 border-2 border-red-500 bg-red-100 text-lg text-red-500 flex items-center gap-x-1 rounded'
                    onClick={() => setShowModal(true)}
                >
                    Delete <MdDeleteForever className='text-xl' />
                </button>
            </div>
        );
    };

    return (
        <section className='mt-2 lg:mt-4 border-b-2 border-slate-300 flex justify-between items-center'>
            <div className='pb-2 flex items-center gap-x-2 md:gap-x-3'>
                <img
                    src={img}
                    alt={`${name}'s image`}
                    className='w-10 md:w-12 lg:w-14 aspect-square object-cover rounded-full'
                />
                <div className='font-Vollkorn'>
                    <div className='flex gap-x-2'>
                        <p className='font-semibold flex items-center lg:text-lg group'>
                            {name}
                            <span className='block md:hidden group-hover:block'>
                                {copiedId ? (
                                    <HiClipboardDocumentCheck className='ml-2 text-xl text-Primary cursor-pointer' />
                                ) : (
                                    <HiOutlineClipboardDocument
                                        title='Copy chef ID'
                                        className='ml-2 text-xl cursor-pointer'
                                        onClick={copyId}
                                    />
                                )}
                            </span>
                        </p>

                        {currUserId === author && (
                            <p
                                className={`px-2 py-1 font-semibold drop-shadow-sm capitalize ${
                                    status === 'pending'
                                        ? 'text-blue-300'
                                        : status === 'published'
                                        ? 'text-green-300'
                                        : status === 'rejected'
                                        ? 'text-red-300'
                                        : 'text-orange-300'
                                }`}
                            >
                                {status}
                            </p>
                        )}
                    </div>

                    <div className='text-slate-500 -mt-1 flex items-center gap-x-2'>
                        {new Date(createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                        <span className='h-1 w-1 bg-black rounded-full' />
                        <p className='text-xl flex items-center gap-x-1'>
                            <FaStar className='text-yellow-400' />
                            {rating || 0}
                        </p>
                        <span className='h-1 w-1 bg-black rounded-full' />
                        <p className='text-xl flex items-center gap-x-1'>
                            <FaHeart
                                className={`cursor-pointer ${
                                    docLiked?.data?.studentId && 'text-red-400'
                                }`}
                                onClick={handleToggleLike}
                            />
                            <span>{like}</span>
                        </p>
                        <span className='h-1 w-1 bg-black rounded-full' />
                        <p className='text-xl flex items-center gap-x-1'>
                            {docBookmarked?.data?.studentId ? (
                                <MdBookmarkAdded
                                    className='cursor-pointer'
                                    onClick={handleToggleBookmark}
                                />
                            ) : (
                                <MdOutlineBookmarkAdd
                                    className='cursor-pointer'
                                    onClick={handleToggleBookmark}
                                />
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {renderChefActions()}

            {showModal && (
                <ConfirmationModal
                    title='Sure want to delete this recipe?'
                    details="This action can't be undone."
                    setIsVisible={setShowModal}
                    onConfirm={handleDeleteRecipe}
                />
            )}
        </section>
    );
}
