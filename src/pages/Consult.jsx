import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Consult() {
	// local states
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		chef: '',
		date: new Date().toISOString().split('T')[0],
		startTime: new Date().toLocaleTimeString().split(' ')[0],
		endTime: '',
	});
	return (
		<section className='lg:w-3/5 py-10 mx-auto text-slate-500 font-Popins bg-Primary/20 relative rounded overflow-hidden'>
			<Helmet>
				<title>Consult - Mad Chef</title>
			</Helmet>

			<h1 className='text-center text-3xl font-semibold'>Consult</h1>

			<form className='w-11/12 md:w-2/3 mx-auto'>
				{/* Name */}
				<>
					<label
						htmlFor='name'
						className='text-xl block mb-1 mt-5 tracking-wide'>
						Name:
					</label>
					<input
						type='text'
						id='name'
						name='name'
						className='w-full px-5 py-2 outline-Primary rounded'
						required
						value={formData.name}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								name: e.target.value,
							}))
						}
					/>
				</>

				{/* Email */}
				<>
					<label
						htmlFor='email'
						className='text-xl block mb-1 mt-5 tracking-wide'>
						Email:
					</label>
					<input
						type='email'
						id='email'
						name='email'
						className='w-full px-5 py-2 outline-Primary rounded'
						required
						value={formData.email}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								email: e.target.value,
							}))
						}
					/>
				</>

				{/* Chef */}
				<>
					<label
						htmlFor='chief'
						className='text-xl block mb-1 mt-5 tracking-wide'>
						Chief:
					</label>
					<select
						name='chief'
						id='chief'
						required
						className='w-full px-5 py-2 bg-white outline-Primary rounded'
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								chef: e.target.value,
							}))
						}>
						<option value='Naiem'>Naiem</option>
						<option value='Rifat'>Rifat</option>
						<option value='Emam'>Emam</option>
					</select>
				</>

				{/* Date and Time */}
				<div className='w-full flex gap-x-3'>
					{/* Date */}
					<div className='w-1/2'>
						<label
							htmlFor='date'
							className='text-xl block mb-1 mt-5 tracking-wide'>
							Date:
						</label>
						<input
							type='date'
							name='date'
							id='date'
							className='w-full px-5 py-2 bg-white outline-Primary rounded'
							required
							min={new Date().toISOString().split('T')[0]}
							value={formData.date}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									date: e.target.value,
								}))
							}
						/>
					</div>

					{/* Start Time */}
					<div className='flex-grow'>
						<label
							htmlFor='time'
							className='text-xl block mb-1 mt-5 tracking-wide'>
							Start:
						</label>
						<input
							type='time'
							name='time'
							id='time'
							className='w-full px-5 py-2 bg-white outline-Primary rounded'
							required
							min='09:00'
							max='18:00'
							// value={formData.startTime}
							onChange={(e) => console.log(e.target.value)}
						/>
					</div>

					{/* End Time */}
					<div className='flex-grow'>
						<label
							htmlFor='time'
							className='text-xl block mb-1 mt-5 tracking-wide'>
							End:
						</label>
						<input
							type='time'
							name='time'
							id='time'
							className='w-full px-5 py-2 bg-white outline-Primary rounded'
							required
							min='09:00'
							max='18:00'
						/>
					</div>
				</div>

				{/* Submit */}
				<button
					className='btn btn-primary block mt-10 mx-auto'
					type='submit'>
					Submit
				</button>
			</form>

			{/* blobs */}
			<div className='shape-bg-three h-64 md:h-96 aspect-square bg-Primary/20 md:bg-Primary/30 lg:bg-Primary/20 absolute -top-10 md:-top-16 -right-32 md:-right-28 lg:-right-16 -z-10' />

			<div className='shape-bg-one h-40 md:h-56 aspect-square bg-Primary/20 absolute top-[40%] lg:top-[44%] -left-14 md:-left-28 lg:-left-20 rotate-45 -z-10' />
			<div className='shape-bg-one h-40 md:h-56 aspect-square bg-Primary/20 absolute top-[43%] lg:top-1/2 -left-14 md:-left-28 lg:-left-20 rotate-45 -z-20' />

			<div className='shape-bg-three h-64 md:h-96 aspect-square bg-Primary/20 absolute -right-20 md:-right-24 lg:-right-20 -z-10' />
		</section>
	);
}
