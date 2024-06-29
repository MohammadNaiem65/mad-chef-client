import { useState } from 'react';

export default function JoinLinkModal({ setShowModal, onSubmitFn }) {
	const [joinLink, setJoinLink] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();

		onSubmitFn(joinLink);
		setShowModal(false);
	};

	return (
		<section
			className='h-dvh w-dvw bg-gray-700/40 flex justify-center items-center fixed inset-0 cursor-pointer z-[100]'
			onClick={() => setShowModal(false)}>
			<section
				className='w-4/5 md:w-2/3 lg:w-1/3 h-52 bg-blue-300 flex items-center cursor-auto rounded'
				onClick={(e) => e.stopPropagation()}>
				<form className='w-full mt-4 px-4' onSubmit={handleSubmit}>
					<p className='text-lg text-slate-900 font-Vollkorn'>
						Provide Meeting Link:
					</p>
					<input
						className='w-full h-10 mt-1 px-2 text-lg text-slate-600 font-Vollkorn border-2 border-blue-200 outline-blue-200 rounded-md'
						value={joinLink}
						onChange={(e) => setJoinLink(e.target.value)}
					/>

					<button className='btn btn-primary mx-auto mt-4 block'>
						Submit
					</button>
				</form>
			</section>
		</section>
	);
}
