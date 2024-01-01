import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSelectors';

const features = [
	{ title: 'Unlimited Blogs', description: 'Access unlimited blogs.' },
	{
		title: 'Get 1 to 1 Support',
		description: 'Get in person help from chef.',
	},
	{
		title: 'Mad Community',
		description: 'Get full access to Mad Community.',
	},
];

export default function Packages() {
	// get user role
	const user = useSelector(selectUser);

	return (
		<section className='mt-20'>
			<h2 className='section-title'>
				Choose Your{' '}
				<span className='section-title-span  after:w-[118%]'>Plan</span>
			</h2>

			<div className='md:w-11/12 lg:w-[53%] mx-auto mt-8 text-slate-500 md:flex md:gap-x-3 bg'>
				{/* Basic */}
				<div className='w-11/12 lg:w-96 h-[31rem] mx-auto bg-white rounded-lg duration-300 drop-shadow-xl hover:scale-105'>
					<div>
						<div className='flex items-center'>
							<h3 className='text-2xl font-Popins font-semibold text-slate-700 mt-6 lg:mt-10 ml-10 lg:ml-14'>
								Basic
							</h3>
							<span className='ml-5 mt-6 lg:mt-10 px-3 py-1 font-semibold text-white text-sm bg-Primary/70 rounded'>
								Most Popular
							</span>
						</div>
						<p className='px-10 lg:px-14 mt-2 text-sm'>
							A starter package for everyone whom are confident to
							learn alone.
						</p>
					</div>

					<div className='h-20 w-11/12 mx-auto my-6 px-6 lg:px-8 bg-Primary/10 flex justify-between items-center rounded'>
						<p>
							<span className='text-3xl font-Vollokorn font-semibold text-slate-700'>
								Free
							</span>
							/month
						</p>
						<p className='font-semibold text-lg'>Forever</p>
					</div>

					<div className='px-10 lg:px-14'>
						{features.map((feature, index) => (
							<div
								key={index}
								className='mb-2 flex items-top gap-x-3'>
								<p>
									<span
										className={`w-10 h-10 text-xl font-semibold border-2 flex justify-center items-center rounded-full ${
											index === 0
												? 'text-white border-Primary/90 bg-Primary/90'
												: 'text-slate-700 border-slate-200 '
										}`}>
										{index + 1}
									</span>
								</p>
								<div>
									<p className='text-lg font-semibold'>
										{feature.title}
									</p>
									<p className='text-sm'>
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>

					{user?.plan === 'basic' ? (
						<button
							className='w-11/12 block mx-auto mt-6 py-2 text-slate-700 font-semibold text-xl bg-Primary/20 rounded'
							disabled='disabled'>
							Current
						</button>
					) : (
						<Link
							to='/register'
							className='w-11/12 block mx-auto mt-6 py-2 text-slate-700 text-center font-semibold text-xl bg-Primary/20 rounded'>
							Enroll for Free
						</Link>
					)}
				</div>

				{/* Pro */}
				<div className='w-11/12 lg:w-96 h-[31rem] mx-auto rounded-lg bg-gradient-to-bl from-[#FADADF] to-[#CCC8FD] duration-300 drop-shadow-xl hover:scale-105'>
					<div>
						<h3 className='text-2xl font-Popins font-semibold text-slate-700 mt-6 pt-6 md:pt-0 lg:mt-10 ml-10 lg:ml-14'>
							Pro
						</h3>
						<p className='px-10 lg:px-14 mt-2 text-sm'>
							For those, who are more passionate about cooking.
						</p>
					</div>

					<div className='h-20 w-11/12 mx-auto my-6 px-6 lg:px-8 bg-Primary/10 flex justify-between items-center rounded'>
						<p>
							<span className='mr-2 text-3xl font-Vollokorn font-semibold text-slate-700 line-through'>
								$5
							</span>
							<span className='text-3xl font-Vollokorn font-semibold text-slate-700'>
								$4
							</span>
							/month
						</p>
						<p className='font-semibold text-lg'>Save 20%</p>
					</div>

					<div className='px-10 lg:px-14'>
						{features.map((feature, index) => (
							<div
								key={index}
								className='mb-2 flex items-center gap-x-3'>
								<p>
									<span
										className={`w-10 h-10 text-xl text-white font-semibold border-2 border-Primary/90 bg-Primary/90 flex justify-center items-center rounded-full`}>
										{index + 1}
									</span>
								</p>
								<div>
									<p className='text-lg font-semibold'>
										{feature.title}
									</p>
									<p className='text-sm'>
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>

					{user?.plan === 'pro' ? (
						<button
							className='w-11/12 block mx-auto mt-6 py-2 text-white font-semibold text-xl bg-Primary/90 rounded uppercase'
							disabled>
							Current
						</button>
					) : (
						<button className='w-11/12 block mx-auto mt-6 py-2 text-white font-semibold text-xl bg-Primary/90 rounded uppercase'>
							Get Started
						</button>
					)}
				</div>
			</div>
		</section>
	);
}
