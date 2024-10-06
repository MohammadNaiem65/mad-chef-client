import { useGetStudentDataQuery } from '../../../../../../features/student/studentApi';
import { Avatar, Rating } from '../../../../../../shared';

export default function Review({ review }) {
    const { studentId, rating, message, createdAt, updatedAt } = review || {};

    const { data } = useGetStudentDataQuery({ studentId, include: 'name,img' });
    const { name, img } = data?.data || {};

    return (
        <div className='w-full lg:w-[26rem] mx-auto lg:mx-0'>
            <div className='flex border-2 rounded-lg border-gray-200 border-opacity-50 px-5 py-4 md:p-8 sm:flex-row flex-col hover:shadow-xl duration-300'>
                {/* Conditional rendering of userImg or Avatar */}
                {img ? (
                    <img
                        src={img}
                        alt={name}
                        className='w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full flex-shrink-0'
                    />
                ) : (
                    <div className='size-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 overflow-hidden'>
                        <Avatar />
                    </div>
                )}

                <div className='flex-grow'>
                    <h2
                        title={name}
                        className='w-full lg:w-64 text-gray-900 text-lg font-medium truncate'
                    >
                        {name}
                    </h2>
                    <div className='mb-1 text-yellow-500 flex gap-x-1'>
                        {<Rating rating={rating} />}
                    </div>

                    {createdAt !== updatedAt && (
                        <p className='mb-1 text-gray-500 text-xs'>Edited</p>
                    )}

                    <p className='w-full lg:w-64 mt-3 leading-relaxed text-justify text-gray-400 line-clamp-3 group-hover:line-clamp-none'>
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
}
