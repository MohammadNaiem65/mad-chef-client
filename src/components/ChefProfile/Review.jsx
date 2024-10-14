import { useGetStudentDataQuery } from '../../features/student/studentApi';
import { Rating } from '../../shared';

export default function Review({ review }) {
    const { studentId, rating, message, createdAt, updatedAt } = review;
    const edited = createdAt === updatedAt;

    const { data } = useGetStudentDataQuery({ studentId, include: 'name,img' });
    const { name: studentName, img: studentImg } = data?.data || {};

    return (
        <div className='p-2 bg-white text-slate-400 text-sm font-Popins rounded'>
            <div className='flex items-center gap-x-2'>
                <img
                    src={studentImg}
                    alt='student image'
                    className='size-10 rounded-full'
                />
                <div>
                    <h4 className='text-black'>{studentName}</h4>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-yellow-400 flex items-center'>
                            <Rating rating={rating} />
                        </p>
                        {edited && (
                            <>
                                <span className='size-1 bg-black rounded-full' />
                                <p>Edited</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <p className='w-full mt-1 line-clamp-3'>{message}</p>
        </div>
    );
}
