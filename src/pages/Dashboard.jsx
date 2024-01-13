import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useGetUserDataQuery } from '../features/user/userApi';
import { selectUser } from '../features/auth/authSelectors';

import { Consults, FavoriteRecipe, UserDetails } from '../components/Dashboard';
import Spinner from '../shared/Spinner/Spinner';

export default function Dashboard() {
	const { userId } = useSelector(selectUser);
	const { data, isLoading, isSuccess, isError } = useGetUserDataQuery({
		userId,
	});

	return isLoading ? (
		<Spinner />
	) : isSuccess ? (
		<section>
			<Helmet>
				<title>Dashboard - Mad Chef</title>
			</Helmet>

			<UserDetails userData={data.data} />
			<Consults consults={data.data.consults} />
			<FavoriteRecipe favorites={data.data.favorites} />
		</section>
	) : (
		isError && (
			<p className='w-fit mx-auto p-3 font-semibold text-xl bg-red-300 text-red-800 rounded'>
				Something went wrong! Kindly try again!!!
			</p>
		)
	);
}
