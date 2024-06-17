import { Link } from 'react-router-dom';

export default function Error() {
	return (
		<section className='w-full h-screen flex justify-center items-center dark:bg-gray-900'>
			<div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
				<div className='mx-auto max-w-screen-sm text-center'>
					<h1 className='mb-4 text-Primary text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500'>
						404
					</h1>
					<p className='mb-4 text-3xl tracking-tight font-bold font-Vollokorn md:text-4xl dark:text-white'>
						Something&apos;s missing.
					</p>
					<p className='mb-4 text-lg font-Popins font-light text-gray-500 dark:text-gray-400'>
						Sorry, we can&apos;t find that page. You&apos;ll find
						lots to explore on the home page.{' '}
					</p>
					<Link
						to='/'
						className='focus:ring-4 focus:outline-none focus:ring-Primary btn btn-primary'>
						Back to Homepage
					</Link>
				</div>
			</div>
		</section>
	);
}
