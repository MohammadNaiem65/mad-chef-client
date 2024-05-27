import { useState, useEffect } from 'react';
import { useGetConsultsQuery } from '../../../../../features/consult/consultApi';
import { NoContent, Spinner } from '../../../../../shared';
import ConsultCards from './ConsultCards';

export default function MyConsults() {
	const [error, setError] = useState('');

	const {
		data: activeConsultsData,
		isLoading: activeConsultsIsLoading,
		error: activeConsultsErr,
	} = useGetConsultsQuery({
		status: 'accepted',
	});
	const {
		data: consultHistoryData,
		isLoading: consultHistoryIsLoading,
		error: consultHistoryErr,
	} = useGetConsultsQuery({
		status: 'pending,completed,failed,rejected',
	});
	const { data: activeConsults } = activeConsultsData || {};
	const { data: consultHistories } = consultHistoryData || {};

	useEffect(() => {
		if (activeConsultsErr?.msg || activeConsultsErr?.message) {
			setError(activeConsultsErr?.msg || activeConsultsErr?.message);
		}
		if (consultHistoryErr?.msg || consultHistoryErr?.message) {
			setError(consultHistoryErr?.msg || consultHistoryErr?.message);
		}
	}, [
		activeConsultsErr?.message,
		activeConsultsErr?.msg,
		consultHistoryErr?.message,
		consultHistoryErr?.msg,
	]);

	return (
		<section className='pl-5 pt-3'>
			{activeConsultsIsLoading ? (
				<Spinner />
			) : (
				activeConsults?.length > 0 && (
					<ConsultCards
						title='Active Consults'
						consults={activeConsults}
					/>
				)
			)}
			<section className='mt-10'>
				{consultHistoryIsLoading ? (
					<Spinner />
				) : (
					consultHistories?.length > 0 && (
						<ConsultCards
							title='Consult History'
							consults={consultHistories}
							error={error?.msg || error?.message}
						/>
					)
				)}
			</section>

			{!activeConsults?.length && !consultHistories?.length && (
				<NoContent />
			)}
		</section>
	);
}
