import { modelImg } from '../../assets';

export default function UserDetails() {
	return (
		<section className='w-3/5 h-72 px-24 bg-gradient-to-bl from-Primary/30 to-Primary/80 mx-auto flex items-center gap-x-8 relative rounded overflow-hidden'>
			<img
				src={modelImg}
				alt=''
				className='w-52 h-52 object-cover rounded-full relative z-20'
			/>

			<div className='text-lg relative z-20'>
				<h3 className='text-3xl text-slate-700 font-semibold'>
					Mohammad Naiem
				</h3>
				<p>
					Email: <span className='text-slate-600'>abc@gmail.com</span>
				</p>
				<div className='flex justify-between w-full'>
					<p>
						Favorites: <span className='text-slate-600'>02</span>
					</p>
					<p>
						Consult: <span className='text-slate-600'>03</span>
					</p>
				</div>
			</div>

			{/* blobs */}
			<div className='shape-bg-one h-56 aspect-square bg-Primary/50 absolute top-[44%] -left-20 rotate-45' />
			<div className='shape-bg-one h-56 aspect-square bg-Primary/50 absolute top-1/2 -left-20 rotate-45' />

			<div className='shape-bg-three h-96 aspect-square bg-Primary/60 absolute -right-16'/>
		</section>
	);
}
