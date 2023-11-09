import { Link } from 'react-router-dom';
import { lgLogo } from '../assets';

export default function Footer() {
	return (
		<section className='md:h-64 px-[5%] pb-4 bg-[#495579] text-stone-300 md:flex'>
			<div className=''>
				{/* Left Side Container */}
				<Link to='/home'>
					<img
						className='-ml-3 -mb-3'
						src={lgLogo}
						alt='logo of mad chef'
					/>
				</Link>
				<p className='md:w-3/5 lg:w-2/5 text-sm font-Popins'>
					Mad Chef is the perfect way to find and order food from
					countries best chefs. Mad Chef can help you find the perfect
					meal for any occasion.
				</p>
			</div>

			{/* Right side Container */}
			<div className='mt-10 flex justify-between'>
				<div className='md:w-36 lg:mr-20'>
					<h4 className='font-semibold font-Popins text-lg'>
						Useful links
					</h4>
					<div className='mt-3 font-Vollokorn text-lg flex flex-col'>
						<Link to='/home' className='w-fit link-hover'>
							Home
						</Link>
						<Link to='/recipes' className='w-fit link-hover'>
							Recipes
						</Link>
						<Link to='/dashboard' className='w-fit link-hover'>
							Dashboard
						</Link>
						<Link to='/blog' className='w-fit link-hover'>
							Blog
						</Link>
						<p>
							<Link to='/login' className='w-fit link-hover'>
								Login
							</Link>
							/
							<Link to='/register' className='w-fit link-hover'>
								Sign In
							</Link>
						</p>
					</div>
				</div>
				<div className='md:w-40'>
					<h4 className='font-semibold font-Popins text-lg'>
						Quick links
					</h4>
					<div className='mt-3  font-Vollokorn text-lg flex flex-col'>
						<Link to='/blog' className='w-fit link-hover'>
							Our Blog
						</Link>
						<Link to='/' className='w-fit link-hover'>
							Top Rated Chefs
						</Link>
						<Link to='/' className='w-fit link-hover'>
							Most Liked Recipes
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
