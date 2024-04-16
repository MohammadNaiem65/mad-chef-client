import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaBars } from 'react-icons/fa6';
import { LuSearch } from 'react-icons/lu';
import { filterWithKeyword } from '../../features/recipe/recipeFilterSlice';

export default function SearchBar({ setHideModal }) {
	const [keyword, setKeyword] = useState('');
	const dispatch = useDispatch();

	const handleSearch = (e) => {
		e.preventDefault();

		dispatch(filterWithKeyword(keyword));
	};

	return (
		<form className='h-8 mb-4 relative' onSubmit={handleSearch}>
			<input
				type='text'
				id=''
				placeholder='Search by Chef or Recipe name'
				className='size-full mb-4 px-8 py-1 text-gray-500 font-semibold outline-Primary rounded'
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<LuSearch className='text-xl text-gray-500 absolute top-[50%] left-2 -translate-y-[50%] cursor-pointer' />
			<FaBars
				className='text-lg text-gray-500 absolute top-[50%] right-2 -translate-y-[50%] cursor-pointer'
				onClick={() => setHideModal(false)}
			/>
		</form>
	);
}
