import { Helmet } from 'react-helmet-async';

export default function Consult() {
	return (
		<section className='bg-Primary/20 text-slate-500 font-Popins py-10 relative overflow-hidden'>
			<Helmet>
				<title>Consult - Mad Chef</title>
			</Helmet>

			<h1 className='text-center text-3xl font-semibold'>Consult</h1>

			<form className='w-11/12 mx-auto'>
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
						className='w-full px-5 py-2 bg-white outline-Primary rounded'>
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
						/>
					</div>

					{/* Time */}
					<div className='flex-grow'>
						<label
							htmlFor='time'
							className='text-xl block mb-1 mt-5 tracking-wide'>
							Time:
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
			<div className='shape-bg-three h-64 md:h-96 aspect-square bg-Primary/20 md:bg-Primary/30 absolute -top-10 -right-32 lg:-right-16 -z-10' />

			<div className='shape-bg-one h-40 md:h-56 aspect-square bg-Primary/20 md:bg-Primary/30 absolute top-[40%] md:top-[52%] lg:top-[44%] -left-14 md:-left-28 lg:-left-20 rotate-45 -z-10' />
			<div className='shape-bg-one h-40 md:h-56 aspect-square bg-Primary/20 md:bg-Primary/30 absolute top-[43%] md:top-[56%] lg:top-1/2 -left-14 md:-left-28 lg:-left-20 rotate-45 -z-20' />

			<div className='shape-bg-three h-64 md:h-96 aspect-square bg-Primary/20 absolute -right-20 lg:-right-16 -z-10' />
		</section>
	);
}
