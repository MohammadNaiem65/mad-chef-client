import { useGetUserDataQuery } from '../../../features/user/userApi';
import { Spinner } from '../../../shared';
import UserDetails from './UserDetails';

export default function User({ userId }) {
	const { data, isLoading, isSuccess, isError } = useGetUserDataQuery({
		userId,
	});

	return isLoading ? (
		<Spinner />
	) : isSuccess ? (
		<section>
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
