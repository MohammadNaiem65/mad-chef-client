import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../features/auth/authSelectors';
import { useGetUserDataQuery } from '../../../../../features/user/userApi';
import { NoContent, Spinner } from '../../../../../shared';
import Like from './Like';

export default function Likes() {
	const { userId } = useSelector(selectUser);
	const { data, isLoading, isSuccess, isError, error } = useGetUserDataQuery({
		userId,
		include: 'favorites',
	});

	const { favorites: favoritesIds } = data?.data || {};

	let content;
	if (isLoading) {
		content = <Spinner />;
	} else if (isSuccess && favoritesIds?.length === 0) {
		content = <NoContent />;
	} else if (isError) {
		content = (
			<p className='w-fit mt-10 p-3 bg-red-300 text-lg text-red-700 font-semibold rounded'>
				{error?.data}
			</p>
		);
	} else if (isSuccess && favoritesIds?.length > 0) {
		content = favoritesIds.map((recipeId, index) => (
			<Like key={index} recipeId={recipeId} />
		));
	}

	return (
		<section className='w-full my-5 px-5'>
			<h3 className='w-1/2 mb-5 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
				Liked Recipes:
			</h3>
			{content}
		</section>
	);
}
