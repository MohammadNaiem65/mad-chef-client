import { useGetStudentDataQuery } from '../../features/student/studentApi';
import { Rating } from '../../shared';

export default function RecipeRating({ rating: ratingDoc }) {
    const { studentId, rating, message } = ratingDoc || {};
    const { data } = useGetStudentDataQuery({
        studentId,
        include: 'name,role,img',
    });
    const { name, img } = data?.data || {};

    return (
        <div className='w-full mt-5 mr-12 flex'>
            <img
                src={img}
                className='size-10 md:size-12 object-cover rounded-full flex-'
                alt='user image'
            />
            <div className='w-[15.3rem] ml-2 py-3 px-4 bg-Primary/40 rounded-b-3xl rounded-tr-3xl flex-1'>
                <div className='flex items-center gap-x-2'>
                    <h3 className='max-w-20 font-semibold truncate'>{name}</h3>
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
