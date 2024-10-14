import { useParams } from 'react-router-dom';
import { FaBriefcase, FaStar } from 'react-icons/fa6';
import { MdFastfood } from 'react-icons/md';
import { useGetChefQuery } from '../../features/chef/chefApi';

export default function Banner() {
    const { chefId } = useParams();

    const { data } = useGetChefQuery({ chef_id: chefId });
    const { name, bio, rating, yearsOfExperience, recipes, img } =
        data?.data || {};

    return (
        <section className='mb-10 p-6 bg-Primary/20 text-gray-500 font-Popins lg:flex gap-x-5 md:flex justify-between rounded'>
            <img
                className='size-44 lg:size-52 mx-auto rounded-full object-cover shrink-0'
                src={img}
                alt='chef image'
            />
            <div className='w-full h-fit my-auto text-justify'>
                <p className='mt-2 lg:mb-3 text-2xl text-black text-center md:text-start lg:text-start font-Vollkorn font-semibold'>
                    {name}
                </p>
                <p className='text-center md:text-start text-wrap'>{bio}</p>
                <div className='mt-1 flex justify-between'>
                    <p title='Rating' className='flex items-center'>
                        <span className='mr-1 text-yellow-500'>
                            <FaStar />
                        </span>
                        {rating ? rating : 'Null'}
                    </p>
                    <p title='Experience' className='flex items-center'>
                        <span className='mr-1'>
                            <FaBriefcase />
                        </span>
                        {yearsOfExperience
                            ? `${yearsOfExperience} years`
                            : 'Experience unavailable'}
                    </p>
                    <p title='Recipes' className='flex items-center'>
                        <span className='mr-1'>
                            <MdFastfood />
                        </span>
                        {`${recipes?.length} recipe${
                            recipes?.length > 1 ? 's' : ''
                        }`}
                    </p>
                </div>
            </div>
        </section>
    );
}
