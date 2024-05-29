import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { modelImg } from '../../../../../assets';
import {
	convertTo12HourFormat,
	showNotification,
} from '../../../../../helpers';
import { ConfirmationModal } from '../../../../../shared';
import {
	useCancelConsultMutation,
	useDeleteConsultMutation,
} from '../../../../../features/consult/consultApi';

export default function Consult({ consult, cardRef }) {
	const { _id, chefName, date, startTime, endTime, status } = consult || {};
	const [showModal, setShowModal] = useState(false);

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
				className='relative h-96 w-72 lg:w-80 shrink-0 overflow-hidden rounded-xl bg-Primary'>
				<div className='w-full h-full relative z-10 text-white backdrop-blur-sm p-5 lg:p-8 text-center'>
					<span className='mb-3 block w-fit bg-white/30 px-3 py-0.5 text-sm font-light text-white capitalize rounded-full'>
						{status}
					</span>
					<motion.img
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
						className='h-[10.5rem] aspect-square mx-auto -mt-3 object-cover origin-top rounded-full'
						src={modelImg}
					/>
					<p className='mt-3 text-xl truncate'>{chefName}</p>
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
					<button
						className='mt-4 w-full rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white'
						onClick={() => setShowModal(true)}>
						{status === 'pending' || status === 'accepted'
							? 'Cancel'
							: 'Delete'}
					</button>
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
