import { useState, useEffect } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
	useDeleteRecipeRatingByUserMutation,
	useEditRecipeRatingByUserMutation,
} from '../../../../../features/user/userApi';
import { useGetRecipeQuery } from '../../../../../features/recipe/recipeApi';
import showNotification from '../../../../../helpers/showNotification';
import { Avatar, ConfirmationModal, Rating } from '../../../../../shared';
import RatingForm from './RatingForm';

export default function RatingCardForRecipeRating({ userId, rating }) {
	const [editMode, setEditMode] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const { _id, recipeId, rating: ratingCount, message } = rating || {};
	const { data } = useGetRecipeQuery(recipeId);
	const { title, img } = data?.data || {};

	const [editRecipeRating, { isSuccess: editRecipeRatingIsSuccess }] =
		useEditRecipeRatingByUserMutation();
	const [deleteRecipeRating, { isSuccess: deleteRecipeRatingIsSuccess }] =
		useDeleteRecipeRatingByUserMutation();

	const handleDeletion = () => {
		deleteRecipeRating({ userId, docId: _id });
	};

	// Notify the user upon successful editing
	useEffect(() => {
		if (editRecipeRatingIsSuccess) {
			showNotification(
				'success',
				'Successfully updated the recipe rating'
			);
		}
	}, [editRecipeRatingIsSuccess]);

	// Notify the user upon successful deletion
	useEffect(() => {
		if (deleteRecipeRatingIsSuccess) {
			showNotification(
				'success',
				'Successfully deleted the recipe rating'
			);
		}
	}, [deleteRecipeRatingIsSuccess]);

	return (
		<div className='w-full lg:w-[27rem] mx-auto group'>
			<div className='flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col hover:shadow-xl duration-300'>
				{/* Conditional rendering of userImg or Avatar */}
				{img ? (
					<img
						src={img}
						alt={title}
						className='w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full flex-shrink-0'
					/>
				) : (
					<div className='size-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 overflow-hidden'>
						<Avatar />
					</div>
				)}
				{editMode ? (
					<RatingForm
						userId={userId}
						docId={_id}
						title={title}
						message={message}
						ratingCount={ratingCount}
						setEditMode={setEditMode}
						submitDocFn={editRecipeRating}
					/>
				) : (
					<div className='flex-grow'>
						<h2 className='text-gray-900 text-lg title-font font-medium mb-1'>
							{title}
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
								onClick={() => setEditMode(true)}>
								<FiEdit3 className='text-lg' /> Edit
							</button>
							<button
								className='py-1 hover:text-red-500 flex items-center gap-x-1 rounded'
								onClick={() => setShowModal(true)}>
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
