import HorizontalCard from './HorizontalCard';
import InvertedCard from './InvertedCard';

const arr = [1, 2, 3, 4, 5, 6];

export default function TopChefs() {
	return (
		<section className='mt-16 relative'>
			{/* Section title */}
			<h2 className='text-2xl text-center text-slate-700 font-semibold font-Vollokornn italic relative transform z-10'>
				America&apos;s
				<span className='ml-3 font-semibold text-Primary relative cursor-pointer z-10 hover:text-white after:duration-200 after:contents-[""] after:h-[6px] after:w-[112%] after:bg-Accent after:absolute after:bottom-[2px] after:-left-[6px] after:-z-10 hover:after:h-[88%] '>
					Best Chefs
				</span>
				<br />
				are on Mad Chef
			</h2>

			{/* Section content */}
			<div className='mt-8 px-5 flex flex-col gap-y-5'>
				<div className='grid gap-y-5'>
					{arr.slice(0, 2).map((e) => (
						<InvertedCard key={e} e={e} />
					))}

					<HorizontalCard e={arr[2]} />
				</div>
				<div className='grid gap-y-5'>
					<HorizontalCard e={arr[3]} />

					{arr.slice(4).map((e) => (
						<InvertedCard key={e} e={e} />
					))}
				</div>
			</div>
		</section>
	);
}
