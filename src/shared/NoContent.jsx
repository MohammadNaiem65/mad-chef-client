export default function NoContent({ message }) {
	return (
		<p className='my-10 text-center text-slate-600 text-xl font-semibold'>
			{message ? message : 'No content found.'}
		</p>
	);
}
