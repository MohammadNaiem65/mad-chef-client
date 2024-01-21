import { useGetUserDataQuery } from '../../../features/user/userApi';
import { Spinner } from '../../../shared';
import Consults from './Consults/Consults';
import FavoriteRecipe from './FavoriteRecipe';
import UserDetails from './UserDetails';

export default function User({ userId }) {
	const { data, isLoading, isSuccess, isError } = useGetUserDataQuery({
		userId,
	});

	return isLoading ? (
		<Spinner />
	) : isSuccess ? (
		<>
			<UserDetails userData={data.data} />
			<Consults consults={data.data.consults} />
			<FavoriteRecipe favorites={data.data.favorites} />
		</>
	) : (
		isError && (
			<p className='w-fit mx-auto p-3 font-semibold text-xl bg-red-300 text-red-800 rounded'>
				Something went wrong! Kindly try again!!!
			</p>
		)
	);
}
