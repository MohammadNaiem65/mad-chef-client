import { Helmet } from 'react-helmet-async';

export default function Consult() {
	return (
		<section className='min-h-[calc(100vh-26.95rem)] mt-10'>
			<Helmet>
				<title>Consult - Mad Chef</title>
			</Helmet>

			<form className='w-3/5 mx-auto p-10 bg-Primary/20 text-gray-500 font-Popins relative rounded overflow-hidden'>
				<h1 className='text-center text-3xl font-semibold'>Consult</h1>
				<div className='w-3/4 mx-auto mt-10 flex flex-col items-center'>
					{/* Name */}
					<div>
						<label
							htmlFor='name'
							className='text-xl block mb-1 mt-5 tracking-wide'>
							Name:
						</label>
						<input
							type='text'
							id='name'
							name='name'
							className='w-96 px-5 py-2 outline-Primary rounded'
							required
						/>
					</div>

					{/* Email */}
					<div>
						<label
							htmlFor='email'
							className='text-xl block mb-1 mt-5 tracking-wide'>
							Email:
						</label>
						<input
							type='email'
							id='email'
							name='email'
							className='w-96 px-5 py-2 outline-Primary rounded'
							required
						/>
					</div>

					{/* Chief */}
					<div className='w-96'>
						<label
							htmlFor='chief'
							className='text-xl block mb-1 mt-5 tracking-wide'>
							Chief:
						</label>
						<select
							name='chief'
							id='chief'
							required
							className='w-96 px-5 py-2 outline-Primary rounded'>
							<option value='Naiem'>Naiem</option>
							<option value='Rifat'>Rifat</option>
							<option value='Emam'>Emam</option>
						</select>
					</div>

					<div className='w-96 flex gap-x-3'>
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
								className='w-full px-5 py-2 outline-Primary rounded'
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
								className='w-full px-5 py-2 outline-Primary rounded'
								required
								min='09:00'
								max='18:00'
							/>
						</div>
					</div>

					{/* Submit */}
					<button className='btn btn-primary mt-5' type='submit'>
						Submit
					</button>
				</div>

				{/* blobs */}
				<div className='shape-bg-one h-40 md:h-56 aspect-square bg-Primary/30 absolute top-[60%] md:top-[52%] lg:top-[44%] md:-left-28 lg:-left-20 rotate-45' />
				<div className='shape-bg-one h-40 md:h-56 aspect-square bg-Primary/30 absolute top-2/3 md:top-[56%] lg:top-1/2 md:-left-28 lg:-left-20 rotate-45' />

				<div className='shape-bg-three h-64 md:h-96 aspect-square bg-Primary/30 absolute -top-10 -right-28 lg:-right-16' />
				<div className='shape-bg-three h-64 md:h-96 aspect-square bg-Primary/20 absolute -right-28 lg:-right-16' />
			</form>
		</section>
	);
}
