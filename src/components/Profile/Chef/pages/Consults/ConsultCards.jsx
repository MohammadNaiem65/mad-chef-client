import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Error, NoContent, RoundSpinner } from '../../../../../shared';
import Consult from './Consult';

export default function ConsultCards({ isLoading, error, consults = [] }) {
	// Local states
	const cardRef = useRef();
	const containerRef = useRef();
	const [containerWidth, setContainerWidth] = useState(0);
	const [scrollProgress, setScrollProgress] = useState({
		prev: null,
		curr: 0,
		cardWidth: null,
	});

	// Set container width and scroll progress for the cards scroll animation
	useEffect(() => {
		setContainerWidth(
			containerRef.current?.scrollWidth -
				containerRef.current?.offsetWidth
		);

		setScrollProgress((prev) => ({
			...prev,
			cardWidth: cardRef.current?.offsetWidth + 20,
		}));
	}, [consults?.length]);

	const handleSlidePrev = () => {
		setScrollProgress((prev) => {
			const { curr, cardWidth } = prev;
			return {
				...prev,
				prev: curr - cardWidth <= 0 ? 0 : curr,
				curr: curr - cardWidth <= 0 ? 0 : curr - cardWidth,
			};
		});
	};

	const handleSlideNext = () => {
		setScrollProgress((prev) => {
			const { curr, cardWidth } = prev;
			return {
				...prev,
				prev:
					curr + cardWidth >= containerWidth ? containerWidth : curr,
				curr:
					curr + cardWidth >= containerWidth
						? containerWidth
						: curr + cardWidth,
			};
		});
	};

	// Render the content
	let content = null;
	if (isLoading) {
		content = <RoundSpinner className='mt-32 text-Primary' />;
	} else if (!isLoading && error) {
		content = <Error message={error} />;
	} else if (!isLoading && consults?.length === 0) {
		content = <NoContent />;
	} else if (!isLoading && consults?.length > 0) {
		content = (
			<div className='p-5 overflow-x-hidden'>
				<motion.section
					drag='x'
					ref={containerRef}
					animate={{
						x: `-${scrollProgress.curr}px`,
					}}
					dragConstraints={{
						right: 0,
						left: -containerWidth,
					}}
					whileTap={{ cursor: 'grabbing' }}
					className='flex gap-x-5 cursor-grab'>
					{consults.map((el, index) => (
						<Consult key={index} cardRef={cardRef} consult={el} />
					))}
				</motion.section>
			</div>
		);
	}

	return (
		<>
			<div className='flex justify-between items-center'>
				<h3 className='w-4/5 md:w-2/4 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
					My Consults :
				</h3>

				{/* Arrow controls */}
				{consults.length >= 3 && (
					<div className='text-3xl text-Primary flex items-center gap-x-2'>
						<button
							onClick={handleSlidePrev}
							disabled={scrollProgress.curr === 0}
							className='disabled:translate-y-1 disabled:scale-95 duration-300 disabled:text-blue-700 translate-y-0'>
							<FaAngleLeft className='cursor-pointer' />
						</button>
						<button
							onClick={handleSlideNext}
							disabled={scrollProgress.curr === containerWidth}
							className='disabled:translate-y-1 disabled:scale-95 duration-300 disabled:text-blue-700 translate-y-0'>
							<FaAngleRight className='cursor-pointer' />
						</button>
					</div>
				)}
			</div>

			{/* Content */}
			{content}
		</>
	);
}
