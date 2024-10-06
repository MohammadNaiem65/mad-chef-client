import { motion } from 'framer-motion';
import { sureImg } from '../../../assets';

export default function ConfirmationModal({ setShowModal }) {
	return (
		<section
			onClick={() => setShowModal(false)}
			className='h-screen w-full bg-[#000000e1] flex justify-center items-center fixed top-0 z-[99] cursor-pointer'>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				initial={{ y: '100%', opacity: 0 }}
				animate={{ y: '0%', opacity: 1 }}
				exit={{ y: '100%', opacity: 0 }}
				transition={{ duration: 0.3 }}
				className='h-80 w-1/3 bg-blue-300 mt-8 relative flex items-center justify-center rounded cursor-default'>
				<img className='h-52 absolute -top-24' src={sureImg} alt='' />
				<div className='text-center my-auto'>
					<h1 className='text-3xl text-slate-900 font-semibold mt-[5.5rem]'>
						Are you sure you want to apply?
					</h1>
					<p className='w-2/3 mx-auto mt-2 text-center text-slate-600 font-semibold leading-5'>
						If you choose to apply, all your data as a Student will
						be deleted and a new profile as a Chef will be created.
					</p>
					<button className='btn btn-primary mt-5'>Apply</button>
					<button
						onClick={() => setShowModal(false)}
						className='btn btn-danger-outline ml-5'>
						Cancel
					</button>
				</div>
			</motion.div>
		</section>
	);
}
