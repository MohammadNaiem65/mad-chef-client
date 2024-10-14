import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Rating from './Rating';
import ArrowLink from './ArrowLink';

export default function Recipe({ recipe }) {
    const { _id, img, title, ingredients, author, status, rating } = recipe;
    const { _id: currUserId, role } = useSelector((state) => state.user);

    return (
        <motion.div
            className='bg-Primary/20 mt-3 p-3 md:p-5 lg:p-6 text-slate-500 text-sm font-Popins relative rounded flex items-center'
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <img
                className='size-[5rem] md:w-36 md:h-24 rounded object-cover shrink-0'
                src={img}
                alt="Dish's picture"
            />
            <div className='w-3/5 lg:w-4/5 ml-2 md:ml-3 grow'>
                <Link to={`/recipes/recipe/${recipe._id}`}>
                    <h2 className='max-w-40 md:max-w-96 lg:max-w-[37.5rem] mb-1 text-black text-xl font-Vollkorn truncate'>
                        {title}
                    </h2>
                </Link>
                <p className='max-w-40 md:max-w-96 lg:max-w-[37.5rem] truncate'>
                    Ingredients: {ingredients?.join(', ')}
                </p>
                <div className='text-xl text-yellow-500 mt-2 flex gap-1'>
                    {<Rating rating={rating} />}
                </div>
            </div>

            <div className='arrows w-12 h-6 ml-auto flex justify-center items-center'>
                <ArrowLink to={`/recipes/recipe/${_id}`} />
            </div>

            {role === 'chef' && currUserId === author && (
                <p
                    className={`px-2 py-1 font-semibold capitalize absolute top-0 right-3 ${
                        status === 'pending'
                            ? 'bg-blue-300'
                            : status === 'published'
                            ? 'bg-green-300'
                            : status === 'rejected'
                            ? 'bg-red-300'
                            : 'bg-orange-300'
                    }`}
                >
                    {status}
                </p>
            )}
        </motion.div>
    );
}
