import { motion } from 'framer-motion';
import { chef, knife, pan, spoon } from '../../../assets';

export default function RightSideContainer() {
	return (
		<section className='w-64 relative'>
			<motion.img
				animate={{ y: [10, -30, 10] }}
				transition={{ ease: 'linear', duration: 8, repeat: Infinity }}
				src={chef}
				alt='banner image'
				className='w-48 ml-10 mt-7'
			/>
			<motion.img
				animate={{ y: [10, -30, 10] }}
				transition={{
					ease: 'linear',
					duration: 8,
					delay: 0.6,
					repeat: Infinity,
				}}
				src={knife}
				alt='banner image'
				className='w-14 absolute top-14 right-6'
			/>
			<motion.img
				animate={{ y: [10, -30, 10] }}
				transition={{
					ease: 'linear',
					duration: 8,
					delay: 0.5,
					repeat: Infinity,
				}}
				src={pan}
				alt='banner image'
				className='w-16 absolute top-36 -left-2'
			/>
			<motion.img
				animate={{ y: [10, -30, 10] }}
				transition={{
					ease: 'linear',
					duration: 8,
					delay: 0.2,
					repeat: Infinity,
				}}
				src={spoon}
				alt='banner image'
				className='w-44 absolute bottom-7 right-6'
			/>
		</section>
	);
}
