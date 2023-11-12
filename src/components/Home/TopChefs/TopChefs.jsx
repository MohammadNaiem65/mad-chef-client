import HorizontalCard from './HorizontalCard';
import InvertedCard from './InvertedCard';

export default function TopChefs() {
	return (
		<section>
			{/* Section title */}
			<h2
				className={`text-2xl text-center text-slate-700 font-semibold font-Vollokornn italic relative transform`}>
				America&apos;s
				<span className='ml-3 font-semibold text-Primary relative cursor-pointer z-40 hover:text-white after:duration-200 after:contents-[""] after:h-[6px] after:w-[112%] after:bg-Accent after:absolute after:bottom-[2px] after:-left-[6px] after:-z-10 hover:after:h-[88%] '>
					Best Chefs
				</span>
				<br />
				are on Mad Chef
			</h2>

			<InvertedCard />
			<HorizontalCard />
		</section>
	);
}
