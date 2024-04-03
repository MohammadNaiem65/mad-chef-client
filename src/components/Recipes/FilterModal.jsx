import { RxCross1 } from 'react-icons/rx';

export default function FilterModal({ setHideModal }) {
	return (
		<section
			onClick={() => setHideModal(true)}
			className='h-screen w-screen bg-black/40 backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 z-50'>
			<div className='w-[50rem] h-[25rem] px-6 py-8 bg-Primary text-slate-700 rounded'>
				<div className='flex items-center justify-between'>
					<h3 className='text-xl font-semibold font-Vollokorn'>
						Search Filters
					</h3>
					<RxCross1
						onClick={() => setHideModal(true)}
						className='text-2xl cursor-pointer'
					/>
				</div>
				<div className='mt-7 flex items-start justify-between'>
					<div className='w-36'>
						<h4 className='font-semibold mb-3 pb-3 border-b-2'>
							UPLOAD DATE
						</h4>
						<p className='font-Popins cursor-pointer'>Today</p>
						<p className='font-Popins cursor-pointer'>This Month</p>
						<p className='font-Popins cursor-pointer'>This Year</p>
					</div>
					<div className='w-36'>
						<h4 className='font-semibold mb-3 pb-3 border-b-2'>
							REGION
						</h4>
						<p className='font-Popins cursor-pointer'>Asia</p>
						<p className='font-Popins cursor-pointer'>Europe</p>
						<p className='font-Popins cursor-pointer'>America</p>
						<p className='font-Popins cursor-pointer'>
							Latin America
						</p>
						<p className='font-Popins cursor-pointer'>Africa</p>
						<p className='font-Popins cursor-pointer'>
							Middle East
						</p>
					</div>
					<div className='w-36'>
						<h4 className='font-semibold mb-3 pb-3 border-b-2'>
							SORT BY
						</h4>
						<p className='font-Popins cursor-pointer'>
							Upload Date
						</p>
						<p className='font-Popins cursor-pointer'>Like</p>
						<p className='font-Popins cursor-pointer'>Rating</p>
					</div>
				</div>
			</div>
		</section>
	);
}
