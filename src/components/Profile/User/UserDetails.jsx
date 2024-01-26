import { useState } from 'react';
import { modelImg } from '../../../assets';
import SureModal from './SureModal';
import showNotification from '../../../helpers/showNotification';

export default function UserDetails({ userData }) {
	const { name, email, emailVerified, pkg, img, role } = userData;

	const [showModal, setShowModal] = useState(false);

	const decideToShowModal = () => {
		if (emailVerified) {
			setShowModal((prev) => !prev);
		} else {
			showNotification('error', 'Email must be verified to be a Chef.');
		}
	};

	return (
		<>
			<section className='lg:w-3/5 h-60 md:h-72 lg:h-80 md:px-24 bg-gradient-to-bl from-Primary/30 to-Primary/80 mx-auto flex items-center gap-x-5 lg:gap-x-8 relative rounded overflow-hidden'>
				<img
					src={img ? img : modelImg}
					alt=''
					className='w-40 md:w-52 aspect-square ml-4 object-cover rounded-full relative z-20'
				/>
				<div className='text-lg relative z-20'>
					<h3 className='text-2xl md:text-3xl text-slate-700 font-semibold'>
						{name}
					</h3>
					<p>
						Email: <span className='text-slate-600'>{email}</span>
					</p>
					<div className='flex justify-between w-full'>
						<p>
							Email Verified:
							<span
								className={`text-slate-600 ml-1 ${
									emailVerified || 'mr-3'
								}`}>
								{emailVerified ? 'Verified' : 'Not Verified'}
							</span>
						</p>
						<p>
							Package:
							<span className='text-slate-600 ml-1 capitalize'>
								{pkg}
							</span>
						</p>
					</div>
				</div>

				{!emailVerified && (
					<button className='btn btn-primary-outline absolute right-[10.5rem] bottom-5 z-[22]'>
						Verify Email
					</button>
				)}

				{role === 'student' && (
					<button
						className='btn btn-primary absolute right-5 bottom-5 z-[22]'
						onClick={decideToShowModal}>
						Be a Chef
					</button>
				)}

				{/* blobs */}
				<div className='shape-bg-one h-40 md:h-56 aspect-square bg-Primary/50 absolute top-[60%] md:top-[52%] lg:top-[44%] md:-left-28 lg:-left-20 rotate-45' />
				<div className='shape-bg-one h-40 md:h-56 aspect-square bg-Primary/50 absolute top-2/3 md:top-[56%] lg:top-1/2 md:-left-28 lg:-left-20 rotate-45' />
				<div className='shape-bg-three h-64 md:h-96 aspect-square bg-Primary/60 absolute -right-28 lg:-right-24' />
			</section>

			{/* modal */}
			{showModal && (
				<SureModal showModal={showModal} setShowModal={setShowModal} />
			)}
		</>
	);
}
