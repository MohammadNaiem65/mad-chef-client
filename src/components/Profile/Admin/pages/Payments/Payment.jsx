import { BsExclamationLg } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa6';
import { IoCheckmarkDone } from 'react-icons/io5';

export default function Payment({ payment }) {
    const { username, email, pkg, amount, status, createdAt } = payment || {};

    const packageName =
        pkg?.split('/') && pkg?.split('/')[1]?.replace(/-/g, ' ');
    const date = `${new Date(createdAt).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    })} - ${new Date(createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })}`;

    return (
        <div className='w-[58.875rem] lg:w-full p-2 text-sm text-gray-500 grid grid-cols-12 hover:bg-slate-200'>
            <div className='col-span-2 flex items-center gap-x-2'>
                {/* Amount */}
                <p className='text-base text-gray-700'>
                    ${(amount / 100).toFixed(2)}
                </p>

                {/* Status */}
                <p
                    title={`Order Status: ${status}`}
                    className={`w-fit py-[.07rem] px-2 text-xs capitalize flex items-center gap-x-1 rounded-sm ${
                        status === 'pending'
                            ? 'bg-slate-300 text-slate-700'
                            : status === 'succeeded'
                            ? 'py-[.09rem] bg-green-200 text-green-600'
                            : status === 'failed' && 'bg-red-200 text-red-600'
                    }`}
                >
                    <span className='w-[2.5rem] truncate'>{status}</span>
                    {status === 'pending' ? (
                        <FaRegClock className='text-xs my-1' />
                    ) : status === 'succeeded' ? (
                        <IoCheckmarkDone className='text-xs' />
                    ) : (
                        status === 'failed' && (
                            <BsExclamationLg className='text-lg -mx-1 ' />
                        )
                    )}
                </p>
            </div>

            {/* Username */}
            <span title={username} className='truncate ml-3 col-span-2'>
                {username}
            </span>

            {/* Email */}
            <span title={email} className='truncate col-span-3'>
                {email}
            </span>

            {/* Package Name */}
            <span
                title={packageName}
                className='capitalize truncate col-span-2'
            >
                {packageName}
            </span>

            {/* Date */}
            <span title={date} className='col-span-3 truncate'>
                {date}
            </span>
        </div>
    );
}
