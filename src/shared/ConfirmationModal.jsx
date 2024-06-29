import { motion } from 'framer-motion';
import { sureImg } from '../assets';

// Define the ConfirmationModal component with optional onCancel props
/**
 * A modal component for displaying confirmation messages.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.title - The title of the modal.
 * @param {string} [props.details] - Additional details to display in the modal.
 * @param {Function} props.setIsVisible - A function to set the visibility of the modal.
 * @param {Function} props.onConfirm - A function to handle the confirmation action.
 * @param {Function} [props.onCancel] - A function to handle the cancellation action.
 * @returns {JSX.Element} - The ConfirmationModal component.
 */
function ConfirmationModal({
	title,
	details,
	setIsVisible,
	onConfirm,
	onCancel = () => {},
}) {
	// Function to handle the "Okay" button click
	const handleConfirm = () => {
		setIsVisible(false);
		onConfirm();
	};

	// Function to handle the "Cancel" button click
	const handleCancel = () => {
		setIsVisible(false);
		onCancel();
	};

	return (
		<section
			onClick={() => setIsVisible(false)}
			className='h-[100dvh] w-[100dvw] bg-gray-500/20 flex justify-center items-center fixed inset-0 z-[99] cursor-pointer'>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				initial={{ y: '100%', opacity: 0 }}
				animate={{ y: '0%', opacity: 1 }}
				exit={{ y: '100%', opacity: 0 }}
				transition={{ duration: 0.3 }}
				className='h-80 w-[95%] md:w-2/3 lg:w-1/3 bg-blue-300 mt-16 md:mt-14 lg:mt-8 relative flex items-center justify-center rounded cursor-default'>
				<img className='h-52 absolute -top-24' src={sureImg} alt='' />
				<div className='text-center my-auto'>
					<h1 className='text-3xl text-slate-700 font-semibold mt-[5.5rem]'>
						{title}
					</h1>
					{details && (
						<p className='w-2/3 mx-auto mt-2 text-center text-slate-600 font-semibold leading-5'>
							{details}
						</p>
					)}
					<button
						onClick={handleConfirm}
						className='btn btn-primary mt-5'>
						Confirm
					</button>
					<button
						onClick={handleCancel}
						className='btn btn-danger-outline ml-5'>
						Cancel
					</button>
				</div>
			</motion.div>
		</section>
	);
}

export default ConfirmationModal;
