import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	convertTo12HourFormat,
	showNotification,
} from '../../../../../helpers';
import { Avatar, ConfirmationModal } from '../../../../../shared';
import {
	useCancelConsultMutation,
	useDeleteConsultMutation,
} from '../../../../../features/consult/consultApi';
import { useGetUserDataQuery } from '../../../../../features/user/userApi';

const ACTION_TYPES = {
	JOIN: 'join',
	DELETE: 'delete',
};

export default function Consult({ consult, cardRef }) {
	const [showModal, setShowModal] = useState(false);
	const [takeAction, setTakeAction] = useState({ status: false, type: null });

	const { _id, userId, username, date, startTime, endTime, status } =
		consult || {};

	const { data } = useGetUserDataQuery({ userId, include: 'img' });
	const { img } = data?.data || '';

	const [
		cancelConsult,
		{ isSuccess: cancelConsultIsSucc, isError: cancelConsultIsErr },
	] = useCancelConsultMutation();
	const [
		deleteConsult,
		{ isSuccess: deleteConsultIsSucc, isError: deleteConsultIsErr },
	] = useDeleteConsultMutation();

	const handleCancelConsult = () => {
		cancelConsult({ _id });
	};

	const handleDeleteConsult = () => {
		deleteConsult({ _id });
	};

	// Take action based on the status of the consult
	useEffect(() => {
		const now = Date.now();
		const parsedDate = new Date(now).toISOString();
		const today = parsedDate.split('T')[0];
		const consultDate = date.split('T')[0];

		if (status === 'accepted' || status === 'pending') {
			if (today === consultDate) {
				setTakeAction({
					status: true,
					type: ACTION_TYPES.JOIN,
				});
			} else if (today > consultDate) {
				setTakeAction({
					status: true,
					type: ACTION_TYPES.DELETE,
				});
			} else {
				setTakeAction({ status: false, type: null });
			}
		} else {
			setTakeAction({ status: false, type: null });
		}
	}, [date, status]);

	// Show notifications based on the action status
	useEffect(() => {
		if (cancelConsultIsSucc) {
			showNotification(
				'success',
				'Successfully Cancelled the Consult request'
			);
		}
		if (cancelConsultIsErr) {
			showNotification(
				'error',
				'An error occurred while Cancelling the Consult request'
			);
		}
		if (deleteConsultIsSucc) {
			showNotification('success', 'Successfully Deleted the Consult');
		}
		if (deleteConsultIsErr) {
			showNotification(
				'error',
				'An error occurred while Deleting the Consult request'
			);
		}
	}, [
		cancelConsultIsSucc,
		cancelConsultIsErr,
		deleteConsultIsSucc,
		deleteConsultIsErr,
	]);

	return (
		<>
			<motion.div
				ref={cardRef}
				whileHover='hover'
				transition={{
					duration: 1,
					ease: 'backInOut',
				}}
				variants={{
					hover: {
						scale: 1.05,
					},
				}}
				className={`h-96 w-72 lg:w-80 relative shrink-0 overflow-hidden rounded-xl ${
					takeAction.type === ACTION_TYPES.JOIN
						? 'bg-green-500/90'
						: takeAction.type === ACTION_TYPES.DELETE
						? 'bg-yellow-500/65'
						: 'bg-Primary'
				}`}>
				<div className='w-full h-full relative z-10 text-white backdrop-blur-sm p-5 lg:p-8 text-center'>
					<span className='mb-3 block w-fit bg-white/30 px-3 py-0.5 text-sm font-light text-white capitalize rounded-full'>
						{!takeAction.type ||
						takeAction.type === ACTION_TYPES.JOIN
							? status
							: takeAction.type === ACTION_TYPES.DELETE &&
							'Expired'}
					</span>

					<motion.div
						initial={{ scale: 0.85 }}
						variants={{
							hover: {
								scale: 1,
							},
						}}
						transition={{
							duration: 1,
							ease: 'backInOut',
						}}
						className='size-[10.5rem] mx-auto -mt-3 bg-Primary/40 flex justify-center items-center object-cover origin-top rounded-full overflow-hidden'>
						{img ? (
							<img src={img} className='size-full' />
						) : (
							<Avatar />
						)}
					</motion.div>
					<p className='mt-3 text-xl truncate' title={username}>
						{username}
					</p>
					<p className=''>
						{convertTo12HourFormat(startTime)} -{' '}
						{convertTo12HourFormat(endTime)}
					</p>
					<p>
						{new Date(date).toLocaleDateString('en-US', {
							day: 'numeric',
							month: 'short',
							year: 'numeric',
						})}
					</p>

					{/* Cancel or Delete button */}
					{status === 'pending' &&
						takeAction.type !== ACTION_TYPES.DELETE && (
							<div className='flex gap-x-3'>
								<button
									className='w-full mt-4 py-2 border-2 border-green-500 bg-green-500/50 backdrop-blur text-center font-mono font-black uppercase text-neutral-800 rounded transition-colors hover:bg-green-500 hover:text-white'
									onClick={() => setShowModal(true)}>
									Accept
								</button>
								<button
									className='w-full mt-4 py-2 border-2 border-red-500/60 bg-red-500/50 backdrop-blur text-center font-mono font-black uppercase text-neutral-800 rounded transition-colors hover:bg-red-500 hover:text-white'
									onClick={() => setShowModal(true)}>
									Cancel
								</button>
							</div>
						)}

					{status === 'accepted' &&
					takeAction.type !== ACTION_TYPES.DELETE ? (
						takeAction.type === ACTION_TYPES.JOIN ? (
							<button
								className='mt-4 w-full rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white'
								onClick={() => setShowModal(true)}>
								Join
							</button>
						) : (
							<button className='mt-4 w-full rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white'>
								Wait For The Date
							</button>
						)
					) : (
						<button
							className='mt-4 w-full rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white'
							onClick={() => setShowModal(true)}>
							DELETE
						</button>
					)}
				</div>

				{/* background blobs */}
				<motion.svg
					width='320'
					height='384'
					viewBox='0 0 320 384'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='absolute inset-0 z-0 lg:mt-3 -ml-4 md:ml-0'
					variants={{
						hover: {
							scale: 1.5,
						},
					}}
					transition={{
						duration: 1,
						ease: 'backInOut',
					}}>
					<motion.circle
						variants={{
							hover: {
								scaleY: 0.5,
								y: -25,
							},
						}}
						transition={{
							duration: 1,
							ease: 'backInOut',
							delay: 0.2,
						}}
						cx='160.5'
						cy='114.5'
						r='101.5'
						fill='#262626'
					/>
					<motion.ellipse
						variants={{
							hover: {
								scaleY: 2.25,
								y: -25,
							},
						}}
						transition={{
							duration: 1,
							ease: 'backInOut',
							delay: 0.2,
						}}
						cx='160.5'
						cy='265.5'
						rx='101.5'
						ry='43.5'
						fill='#262626'
					/>
				</motion.svg>
			</motion.div>

			{showModal && (
				<ConfirmationModal
					title='Are You Sure?'
					details={`Do you really want to ${
						status === 'pending' || status === 'accepted'
							? 'Cancel'
							: 'Delete'
					} the consult? And it can't be undo`}
					setIsVisible={setShowModal}
					onConfirm={
						status === 'pending' || status === 'accepted'
							? handleCancelConsult
							: handleDeleteConsult
					}
				/>
			)}
		</>
	);
}
