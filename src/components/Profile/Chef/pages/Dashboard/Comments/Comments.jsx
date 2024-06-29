import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useGetChefQuery } from '../../../../../../features/chef/chefApi';
import Comment from './Comment';
import { Spinner } from '../../../../../../shared';

export default function Comments() {
	const { _id } = useSelector((state) => state.user);
	const [loading, setLoading] = useState(false);

	const { data, isLoading: getChefIsLoading } = useGetChefQuery({
		chef_id: _id,
		include: 'recipes',
	});
	const { recipes } = data?.data || {};

	// Set loading state
	useEffect(() => {
		if (getChefIsLoading) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [getChefIsLoading]);

	console.log(loading);

	return (
		<section className='w-full my-5 px-2 md:px-5'>
			<Helmet>
				<title>Comments | Profile - Mad Chef</title>
			</Helmet>

			<h3 className='w-3/4 md:w-1/2 mb-5 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
				Recipe Comments:
			</h3>

			<Comment />

			{/* {loading && <Spinner />} */}
		</section>
	);
}
