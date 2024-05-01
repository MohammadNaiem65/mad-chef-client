import { useState } from 'react';
import { FaStarHalfAlt } from 'react-icons/fa';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import { CiSaveUp1 } from 'react-icons/ci';
import { MdOutlineCancel } from 'react-icons/md';
import { useEffect } from 'react';

export default function RatingForm({
	userId,
	docId,
	title,
	ratingCount,
	message,
	setEditMode,
	submitDoc,
}) {
	const [formData, setFormData] = useState({
		ratingCount: ratingCount,
		message: message,
	});
	const [error, setError] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (typeof parseFloat(formData.ratingCount) !== 'number') {
			return setError('Please provide rating.');
		}

		const data = {
			rating: parseFloat(formData.ratingCount),
			message: formData.message,
		};

		submitDoc({ userId, docId, data });
		setEditMode(false);
	};

	// Set error message conditionally based on rating count
	useEffect(() => {
		if (parseFloat(formData.ratingCount) < 0) {
			setError('Rating must be greater than zero.');
			setFormData((prev) => ({ ...prev, ratingCount: 0 }));
		}
		if (parseFloat(formData.ratingCount) > 5) {
			setError('Rating must be lesser than five.');
			setFormData((prev) => ({ ...prev, ratingCount: 5 }));
		}
	}, [formData.ratingCount]);

	return (
		<form className='flex-grow' onSubmit={handleSubmit}>
			<h2 className='text-gray-900 text-lg title-font font-medium mb-1'>
				{title}
			</h2>
			<div className='mt-1 text-yellow-500 flex items-center gap-x-1'>
				{Array.from({ length: 5 }, (_, i) => {
					if (formData.ratingCount >= i + 1) {
						return (
							<FaStar
								key={i}
								onClick={() =>
									setFormData((prev) => ({
										...prev,
										ratingCount: i + 1,
									}))
								}
							/>
						);
					} else if (formData.ratingCount >= i + 0.5) {
						return (
							<FaStarHalfAlt
								key={i}
								onClick={() =>
									setFormData((prev) => ({
										...prev,
										ratingCount: i + 1,
									}))
								}
							/>
						);
					} else {
						return (
							<FaRegStar
								key={i}
								onClick={() =>
									setFormData((prev) => ({
										...prev,
										ratingCount: i + 1,
									}))
								}
							/>
						);
					}
				})}
				<input
					type='text'
					className='w-10 h-7 ml-2 px-2 py-1 border-2 border-Primary/30 outline-Primary text-slate-700'
					value={formData?.ratingCount}
					onChange={(e) => {
						setError('');
						setFormData((prev) => ({
							...prev,
							ratingCount: e.target.value,
						}));
					}}
				/>
			</div>
			<textarea
				className='w-full mt-3 px-2 py-1 border-2 border-Primary/30 outline-Primary leading-relaxed text-justify text-slate-700 line-clamp-3 group-hover:line-clamp-none rounded'
				value={formData.message}
				onChange={(e) =>
					setFormData((prev) => ({
						...prev,
						message: e.target.value,
					}))
				}
				required
			/>

			{error && (
				<p className='mt-2 py-1 bg-red-200 text-center text-red-700 rounded'>
					{error}
				</p>
			)}

			{/* group-hover:opacity-100 */}
			<div className='mt-5 flex justify-end gap-x-3 group-hover:'>
				<button
					className='py-1 hover:text-green-500 flex items-center gap-x-1 rounded'
					type='submit'>
					<CiSaveUp1 className='text-lg' /> Save
				</button>
				<button
					className='py-1 hover:text-yellow-500 flex items-center gap-x-1 rounded'
					onClick={() => setEditMode(false)}>
					<MdOutlineCancel className='text-lg' /> Cancel
				</button>
			</div>
		</form>
	);
}
