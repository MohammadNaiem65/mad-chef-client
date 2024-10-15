import { useGetStudentDataQuery } from '../features/student/studentApi';
import Rating from './Rating';

/**
 * A component to display a student's rating.
 *
 * @param {{ studentId: string, rating: number, message: string }} ratingDoc
 * @returns {JSX.Element} A JSX element representing the student's rating.
 */
export default function StudentRating({ rating: ratingDoc }) {
    const { studentId, rating, message } = ratingDoc || {};
    const { data } = useGetStudentDataQuery({
        studentId,
        include: 'name,role,img',
    });
    const { name, img } = data?.data || {};

    return (
        <div className='w-full mt-5 mr-12 flex items-center'>
            <img
                src={img}
                className='size-10 md:size-12 object-cover rounded-full shrink-0'
                alt='user image'
            />
            <div className='w-[15.3rem] ml-2 py-3 px-4 bg-Primary/40 rounded-b-3xl rounded-tr-3xl flex-1'>
                <div className='flex items-center gap-x-2'>
                    <h3 className='font-semibold line-clamp-1'>{name}</h3>
                    <span className='size-1 bg-black rounded-full' />
                    <div className='flex text-lg text-yellow-400'>
                        <Rating rating={rating} />
                    </div>
                </div>

                <p>{message}</p>
            </div>
        </div>
    );
}
