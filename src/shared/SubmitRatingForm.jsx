import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Rating from './Rating';
import { showNotification } from '../helpers';

/**
 * A component that renders a rating form for the given doc.
 *
 * @param {{ fieldName: string, fieldValue: string, queryName: string }} ratingForDoc
 * @param {function} submitFn
 * @returns {JSX.Element}
 */
export default function RatingField({ ratingForDoc, submitFn }) {
    const { _id, name, role, img } = useSelector((state) => state.user);
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState('');

    const handleSubmitRating = (e) => {
        e.preventDefault();

        const parsedRating = parseFloat(rating);

        if (
            typeof parsedRating === 'number' &&
            parsedRating >= 0 &&
            parsedRating <= 5
        ) {
            const data = {
                studentId: _id,
                rating: parsedRating,
                [ratingForDoc.fieldName]: ratingForDoc.fieldValue,
                message,
            };

            setRating(5);
            setMessage('');

            return submitFn({
                [ratingForDoc.queryName]: ratingForDoc.fieldValue,
                data,
            });
        }

        showNotification('error', 'Please provide rating between 0 to 5');
    };

    // Set error message conditionally based on rating count
    useEffect(() => {
        const parsedRating = parseFloat(rating);

        if (parsedRating < 0) {
            showNotification('error', 'Rating cannot be negative');
            setRating(0);
        } else if (parsedRating > 5) {
            showNotification('error', 'Rating cannot be more than 5');

            setRating(5);
        }
    }, [rating]);

    return (
        <section className='mt-2 border-t-2 border-slate-300 '>
            {role === 'student' ? (
                <div className='mt-5 md:mx-12 p-3 bg-Primary/35 flex rounded'>
                    <img
                        src={img}
                        className='size-12 md:size-20 object-fill rounded-full shrink-0'
                        alt='user image'
                    />
                    <form
                        onSubmit={handleSubmitRating}
                        className='w-full px-2 md:px-4 rounded-b-3xl rounded-tr-3xl'
                    >
                        <div className='mb-2 flex flex-wrap items-center gap-x-2'>
                            <h3 className='font-semibold line-clamp-1'>
                                {name}
                            </h3>
                            <span className='size-1 bg-black rounded-full' />
                            <h3 className='font-semibold capitalize'>{role}</h3>
                            <span className='size-1 hidden md:block bg-black rounded-full' />

                            <div className='flex items-center'>
                                <div className='flex md:text-xl text-yellow-400 cursor-pointer'>
                                    <Rating
                                        rating={rating}
                                        setRating={setRating}
                                    />
                                </div>

                                <input
                                    type='text'
                                    className='w-10 h-6 md:h-7 ml-2 px-2 py-1 border-2 border-Primary/30 outline-Primary text-slate-700'
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                />
                            </div>
                        </div>

                        <textarea
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='w-full h-20 p-2 bg-slate-100 text-slate-900 outline-Primary resize-none rounded-b-3xl rounded-tr-3xl'
                        />

                        <button
                            type='submit'
                            className='mt-1 ml-auto block px-6 py-1 bg-Primary/50 text-white cursor-pointer  rounded'
                        >
                            Post
                        </button>
                    </form>
                </div>
            ) : null}
        </section>
    );
}
