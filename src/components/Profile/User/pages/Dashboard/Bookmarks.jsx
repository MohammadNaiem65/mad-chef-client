import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../features/auth/authSelectors';
import { useGetUserDataQuery } from '../../../../../features/user/userApi';
import { NoContent } from '../../../../../shared';
import Bookmark from './Bookmark';

export default function Bookmarks() {
	const { userId } = useSelector(selectUser);
	const { data, isSuccess, isError, error } = useGetUserDataQuery({
		userId,
		include: 'bookmarks',
	});

	const { bookmarks: bookmarksIds } = data?.data || {};

	let content;
	if (isSuccess && bookmarksIds?.length === 0) {
		content = <NoContent />;
	} else if (isError) {
		content = (
			<p className='w-fit mt-10 p-3 bg-red-300 text-lg text-red-700 font-semibold rounded'>
				{error?.data}
			</p>
		);
	} else if (bookmarksIds?.length > 0) {
		content = bookmarksIds.map((recipeId, index) => (
			<Bookmark key={index} recipeId={recipeId} />
		));
	}

	return (
		<section className='w-full my-5 px-5'>
			<h3 className='w-1/4 mb-5 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
				My Bookmarks:
			</h3>
			{content}
		</section>
	);
}
