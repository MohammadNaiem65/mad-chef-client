import { motion } from 'framer-motion';
import Consult from './Consult';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Consults() {
	const [cContainerWidth, setCContainerWidth] = useState(0);
	const cContainer = useRef();

	useEffect(() => {
		setCContainerWidth(
			cContainer.current.scrollWidth - cContainer.current.offsetWidth
		);
	}, []);

	return (
		<section className='w-11/12 mt-20 mx-auto overflow-hidden'>
			<h3 className='w-1/4 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
				Consults:
			</h3>

			<motion.section
				drag='x'
				ref={cContainer}
				dragConstraints={{ right: 0, left: -cContainerWidth }}
				whileTap={{ cursor: 'grabbing' }}
				className='w-11/12 mx-auto mt-8 flex gap-x-5 cursor-grab bg-red-500'>
				{arr.map((el) => (
					<Consult key={el} />
				))}
			</motion.section>
		</section>
	);
}
