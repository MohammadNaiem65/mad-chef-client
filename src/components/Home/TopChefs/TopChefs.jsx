import HorizontalCard from './HorizontalCard';
import VerticalCard from './VerticalCard';

const arr = [1, 2, 3, 4, 5, 6];

export default function TopChefs() {
	return (
		<section className='md:w-11/12 lg:w-10/12 mt-16 lg:mt-20 md:mx-auto relative'>
			{/* Section title */}
			<h2 className='section-title'>
				America&apos;s
				<span className='section-title-span after:w-[112%]'>
					Best Chefs
				</span>
				<br />
				are on Mad Chef
			</h2>

			{/* Section content */}
			<section className='mt-8 px-5 md:px-0 flex flex-col lg:flex-row gap-y-5 lg:gap-x-5'>
				{/* Left side container */}
				<div className='lg:w-1/2 grid md:grid-cols-2 gap-y-5 md:gap-x-3 lg:gap-y-3'>
					{arr.slice(0, 2).map((e) => (
						<VerticalCard key={e} e={e} />
					))}

					<HorizontalCard e={arr[2]} />
				</div>
				{/* Right side container */}
				<div className='lg:w-1/2 grid md:grid-cols-2 gap-y-5 md:gap-x-3 lg:gap-y-3'>
					<HorizontalCard e={arr[3]} />

					{arr.slice(4).map((e) => (
						<VerticalCard key={e} e={e} />
					))}
				</div>
			</section>
		</section>
	);
}
