import './Spinner.css';
export default function Spinner() {
	return (
		<div className='h-screen w-screen flex justify-center items-center fixed top-0 left-0 z-[9999]'>
			<span className='loader' />
		</div>
	);
}
