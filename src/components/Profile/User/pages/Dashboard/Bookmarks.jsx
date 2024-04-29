import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../features/auth/authSelectors';
import { useGetBookmarkedRecipesQuery } from '../../../../../features/recipe/recipeApi';
import Bookmark from './Bookmark';
import { NoContent } from '../../../../../shared';

export default function Bookmarks() {
	const { userId } = useSelector(selectUser);
	const { data, isSuccess, isError, error } = useGetBookmarkedRecipesQuery({
		userId,
	});

	const bookmarks = data?.data || {};

	let content;
	if (isSuccess && bookmarks?.length === 0) {
		content = <NoContent />;
	} else if (isError) {
		content = (
			<p className='w-fit mt-10 p-3 bg-red-300 text-lg text-red-700 font-semibold rounded'>
				{error?.data}
			</p>
		);
	} else if (isSuccess && bookmarks?.length > 0) {
		content = bookmarks.map((bookmark, index) => (
			<Bookmark key={index} recipeId={bookmark?.recipeId} />
		));
	}

	return (
		<section className='w-full my-5 px-5'>
			<h3 className='w-1/2 mb-5 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
				My Bookmarks:
			</h3>
			{content}
		</section>
	);
}
