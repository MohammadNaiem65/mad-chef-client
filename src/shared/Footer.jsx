import { Link } from 'react-router-dom';
import { lgLogo } from '../assets';

export default function Footer() {
    return (
        <section className='md:h-64 lg:h-60 mt-20 px-[5%] pb-4 lg:pb-0 bg-[#495579] text-stone-300 flex flex-col md:flex-row justify-between'>
            {/* Left Side Container */}
            <div>
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
            <div className='mt-10 md:w-36 shrink-0'>
                <h4 className='font-semibold font-Popins text-lg'>
                    Useful links
                </h4>
                <div className='mt-3 font-Vollkorn text-lg flex flex-col'>
                    <Link to='/home' className='w-fit link-hover'>
                        Home
                    </Link>
                    <Link to='/recipes' className='w-fit link-hover'>
                        Recipes
                    </Link>
                    <Link to='/dashboard' className='w-fit link-hover'>
                        Dashboard
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
        </section>
    );
}
