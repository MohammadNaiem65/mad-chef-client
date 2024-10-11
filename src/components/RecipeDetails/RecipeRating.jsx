import { useGetStudentDataQuery } from '../../features/student/studentApi';
import { Rating } from '../../shared';

export default function RecipeRating({ rating: ratingDoc }) {
    const { studentId, rating, message } = ratingDoc || {};
    const { data } = useGetStudentDataQuery({
        studentId,
        include: 'name,role,img',
    });
    const { name, role, img } = data?.data || {};

    return (
        <div className='flex justify-start mt-5 mr-12'>
            <img
                src={img}
                className='size-12 object-cover rounded-full'
                alt='user image'
            />
            <div className='ml-2 py-3 px-4 bg-Primary/40 rounded-b-3xl rounded-tr-3xl'>
                <div className='flex items-center gap-x-2'>
                    <h3 className='font-semibold'>{name}</h3>
                    <span className='size-1 bg-black rounded-full' />
                    <h3 className='font-semibold capitalize'>{role}</h3>
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
