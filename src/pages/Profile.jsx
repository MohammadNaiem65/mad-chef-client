import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSelectors';
import { useGetUserDataQuery } from '../features/user/userApi';
import { Helmet } from 'react-helmet-async';
import { Spinner } from '../shared';
import { UserDetails } from '../components/Profile';

export default function Profile() {
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
		</section>
	) : (
		isError && (
			<p className='w-fit mx-auto p-3 font-semibold text-xl bg-red-300 text-red-800 rounded'>
				Something went wrong! Kindly try again!!!
			</p>
		)
	);
}
