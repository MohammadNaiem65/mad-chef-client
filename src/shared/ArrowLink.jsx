import { motion } from 'framer-motion';

export default function ArrowLink() {
	const arrowVariant = {
		hover: {
			x: [-20, 0],
			opacity: [0, 1],
			rotate: '45deg',
		},
	};

	return (
		<motion.p
			whileHover='hover'
			whileTap='hover'
			className='w-12 h-6 flex justify-center items-center'>
			{[0, 1, 2].map((time) => (
				<motion.span
					key={time}
					initial={{
						x: 0,
						opacity: 1,
						rotate: '45deg',
					}}
					variants={arrowVariant}
					transition={{
						duration: 0.7,
						delay: 0.25 * time,
					}}
					className='w-3 h-3 border-t-[3px] border-r-[3px] border-Primary rounded-tr-[2px] block transform rotate-45'
				/>
			))}
		</motion.p>
	);
}
