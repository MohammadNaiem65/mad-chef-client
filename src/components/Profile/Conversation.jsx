import { Link } from 'react-router-dom';
import avater from '../../assets/man-avatar.png';

export default function Conversation({ conversation }) {
    return (
        <Link
            className='h-[3.5rem] flex items-center px-3 py-3 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'
            // to={`/inbox/${id}`}
        >
            <img
                className='object-cover w-10 h-10 rounded-full'
                src={avater}
                alt={name}
            />
            <div className='w-full pb-2 hidden md:block'>
                <div className='mt-2 flex justify-between'>
                    <span className='block ml-2 font-semibold text-gray-600'>
                        Lorem, ipsum.
                    </span>
                    <span className='block ml-2 text-sm text-gray-600'>
                        14:30:45
                    </span>
                </div>
                <span className='block ml-2 text-sm text-gray-600'>
                    {'falkdfj'}
                </span>
            </div>
        </Link>
    );
}
