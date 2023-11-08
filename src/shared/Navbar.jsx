import { Link } from 'react-router-dom';
import ActiveLink from './ActiveLink';
import { lgLogo, smLogo } from '../assets';

export default function Navbar() {
	return (
		<div className='min-h-[7rem] px-16 border-b-2 border-slate-300 font-semibold font-Vollokorn text-lg md:flex justify-between items-center gap-x-6'>
			<Link to='/'>
				<picture>
					<source media='(min-width:427px)' srcSet={lgLogo} />
					<source media='(max-width:426px)' srcSet={smLogo} />
					<img src={lgLogo} alt='logo' />
				</picture>
			</Link>

			<div className='flex items-center gap-x-6'>
				<ActiveLink to='/'>Home</ActiveLink>
				<ActiveLink to='/recipes'>Recipes</ActiveLink>
				<ActiveLink to='/dashboard'>Dashboard</ActiveLink>
				<ActiveLink to='/consult'>Consult</ActiveLink>
				<ActiveLink to='/blog'>Blog</ActiveLink>
				<Link to='/register' className='btn btn-primary'>
					Sign Up
				</Link>
			</div>
		</div>
	);
}
