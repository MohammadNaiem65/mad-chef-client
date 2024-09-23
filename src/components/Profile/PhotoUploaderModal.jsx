import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Error, RoundSpinner } from '../../shared';

export default function PhotoUploaderModal({
    loading,
    existingImg,
    setIsVisible,
    onSubmitFn,
}) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    const handleSelectImg = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!file) {
            setError('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('profile-image', file);

        onSubmitFn({ formData, imgUrl: URL.createObjectURL(file) });
    };

    return (
        <AnimatePresence>
            <section
                className='h-[100dvh] w-[100dvw] bg-gray-500/20 flex justify-center items-center fixed inset-0 z-[99] cursor-pointer'
                onClick={() => setIsVisible(false)}
            >
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='h-[80%] w-[95%] md:w-2/3 lg:w-2/3 bg-white mt-16 md:mt-14 lg:mt-8 relative flex items-center justify-center rounded cursor-default'
                >
                    <div className='size-[90%] md:size-1/2 text-center my-auto border-2 border-dotted border-gray-300 flex items-center justify-center'>
                        <form
                            encType='multipart/form-data'
                            className='text-center'
                            onSubmit={handleSubmit}
                        >
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : existingImg
                                }
                                alt='profile-img'
                                className='size-24 mx-auto rounded-full object-cover'
                            />

                            <div className='mt-2 flex items-center justify-center'>
                                <p className='w-56 px-2 py-1 bg-slate-300 text-start text-slate-900 truncate'>
                                    {file ? file?.name : 'Choose photo'}
                                </p>

                                <button
                                    type='button'
                                    className='ml-3 px-6 py-1 bg-Primary/50 rounded'
                                    onClick={handleSelectImg}
                                >
                                    Upload
                                </button>

                                <input
                                    type='file'
                                    name='profile-image'
                                    accept='image/*'
                                    hidden
                                    ref={inputRef}
                                    onChange={handleFileChange}
                                />
                            </div>

                            {error && (
                                <Error
                                    message={error}
                                    className='w-4/5 mx-auto'
                                />
                            )}

                            <button
                                type='submit'
                                className='btn btn-primary mt-4'
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </motion.div>

                {loading && (
                    <RoundSpinner className='text-Primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                )}
            </section>
        </AnimatePresence>
    );
}
