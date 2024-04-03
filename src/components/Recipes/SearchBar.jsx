import { FaBars } from 'react-icons/fa6';
import { LuSearch } from 'react-icons/lu';

export default function SearchBar({ setHideModal }) {
	return (
		<form className='h-8 mb-4 relative'>
			<input
				type='text'
				id=''
				className='size-full mb-4 px-8 py-1 text-gray-500 font-semibold outline-Primary rounded'
			/>
			<LuSearch className='text-xl text-gray-500 absolute top-[50%] left-2 -translate-y-[50%] cursor-pointer' />
			<FaBars
				className='text-lg text-gray-500 absolute top-[50%] right-2 -translate-y-[50%] cursor-pointer'
				onClick={() => setHideModal(false)}
			/>
		</form>
	);
}
