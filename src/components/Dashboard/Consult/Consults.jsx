import Consult from './Consult';

export default function Consults() {
	return (
		<section className='w-11/12 mt-20 mx-auto'>
			<h3 className='w-1/4 px-2 border-b-2 text-2xl font-semibold text-slate-700 border-Primary'>
				Consults:
			</h3>

			<div className='w-11/12 mx-auto mt-8'>
				<Consult />
			</div>
		</section>
	);
}
