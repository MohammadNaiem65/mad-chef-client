import { useState, useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Spinner from './Spinner/Spinner';
import Error from './Error';

// Define regions as a constant to avoid repetition
const REGIONS = [
    'asia',
    'africa',
    'europe',
    'america',
    'latin america',
    'middle east',
];

export default function PostRecipeForm({
    loading,
    formData,
    setFormData,
    handleSubmitForm,
    error,
    setError,
}) {
    const [errors, setErrors] = useState({});

    // Ref for ingredients and file input
    const ingredientsRef = useRef(null);
    const fileInputRef = useRef(null);

    // Handle changes in form inputs
    const handleChange = (e) => {
        setError('');
        const { name, value, type, files } = e.target;
        setFormData((prevData) => {
            const newData = {
                ...prevData,
                [name]: type === 'file' ? files[0] : value,
            };

            // Change imgTitle property if type is 'file'
            if (type === 'file') {
                newData.imgTitle = '';
            }

            return newData;
        });
    };

    // Handle adding new ingredients
    const handleAddIngredient = () => {
        const newIngredient = ingredientsRef.current.value.trim();
        if (!newIngredient) {
            setErrors((prev) => ({
                ...prev,
                ingredients: 'Please enter an ingredient',
            }));
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            ingredients: [...prevData.ingredients, newIngredient],
        }));

        ingredientsRef.current.value = '';
        setError('');
        setErrors((prev) => ({ ...prev, ingredients: '' }));
    };

    // Handle removing ingredients
    const handleRemoveIngredient = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            ingredients: prevData.ingredients.filter((_, i) => i !== index),
        }));
    };

    // Handle file input click
    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    // Validate form before submission
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.img) newErrors.img = 'Image is required';
        if (formData.ingredients.length === 0)
            newErrors.ingredients = 'At least one ingredient is required';
        if (!formData.region) newErrors.region = 'Region is required';
        if (!formData.method.trim()) newErrors.method = 'Method is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        handleSubmitForm();
    };

    return (
        <form
            encType='multipart/form-data'
            onSubmit={handleFormSubmit}
            className='w-11/12 lg:w-1/2 mx-auto'
        >
            {/* Title input field */}
            <input
                type='text'
                name='title'
                placeholder='Enter recipe title..'
                className='bg-transparent text-3xl lg:text-[2.8rem] text-slate-400 font-Popins font-bold outline-none w-full'
                onChange={handleChange}
                value={formData.title}
                required
            />
            {errors?.title && <p className='text-red-500'>{errors.title}</p>}

            {/* Image upload section */}
            <div className='w-full h-[15.875rem] md:h-[25rem] mt-5 border-2 border-dashed flex justify-center items-center relative'>
                <button
                    type='button'
                    onClick={handleFileInputClick}
                    className='ml-3 px-6 py-1 bg-Primary/50 rounded cursor-pointer text-white'
                >
                    Select
                </button>
                <input
                    type='file'
                    accept='image/*'
                    name='img'
                    ref={fileInputRef}
                    className='hidden'
                    onChange={handleChange}
                />
                {formData.img && (
                    <div className='bg-Primary/50 flex justify-center items-center absolute inset-0 overflow-hidden'>
                        <RxCross2
                            className='text-3xl absolute top-2 right-2 cursor-pointer'
                            onClick={() =>
                                setFormData((prev) => ({
                                    ...prev,
                                    img: null,
                                    imgTitle: '',
                                }))
                            }
                        />
                        <img
                            src={
                                formData.img instanceof File
                                    ? URL.createObjectURL(formData.img)
                                    : formData.img
                            }
                            alt={`Image for ${formData.title}`}
                            className='w-full max-h-[15.875rem] md:max-h-[26rem] mt-5 object-cover'
                        />
                    </div>
                )}
            </div>
            {errors?.img && <p className='text-red-500'>{errors.img}</p>}

            {/* Image title input field */}
            {formData.img && (
                <input
                    type='text'
                    name='imgTitle'
                    placeholder='Enter image title..'
                    className='bg-transparent mt-1 mx-auto text-lg:text-[2.8rem] text-slate-400 text-center font-Popins font-bold outline-none block w-full'
                    onChange={handleChange}
                    value={formData.imgTitle}
                />
            )}

            {/* Ingredients and Region input fields */}
            <div className='mt-4 flex flex-wrap'>
                {/* Ingredients */}
                <div className='w-full md:w-2/3 mb-4 md:mb-0'>
                    <label
                        htmlFor='ingredients'
                        className='text-2xl text-slate-400 font-Popins font-bold outline-none mt-5 block'
                    >
                        Ingredients:
                    </label>
                    <div className='mt-1 mb-2 flex flex-wrap gap-1'>
                        {formData.ingredients.map((ingredient, index) => (
                            <span
                                key={index}
                                className='w-fit bg-Primary/50 px-3 py-1 flex items-center rounded-full'
                            >
                                {ingredient}
                                <RxCross2
                                    className='text-xl inline-block hover:text-white cursor-pointer ml-2'
                                    onClick={() =>
                                        handleRemoveIngredient(index)
                                    }
                                />
                            </span>
                        ))}
                    </div>
                    <div className='flex flex-wrap items-center'>
                        <input
                            type='text'
                            id='ingredients'
                            ref={ingredientsRef}
                            placeholder='Enter ingredients'
                            className='w-full md:w-[25rem] xl:w-96 px-3 py-1 border-2 text-sm md:text-base font-Popins border-transparent outline-Primary rounded mr-2 mb-2 md:mb-0'
                        />
                        <button
                            type='button'
                            onClick={handleAddIngredient}
                            className='px-6 py-1 bg-Primary/50 rounded cursor-pointer text-white'
                        >
                            Add
                        </button>
                    </div>
                    {errors?.ingredients && (
                        <p className='text-red-500'>{errors.ingredients}</p>
                    )}
                </div>

                {/* Region */}
                <div className='w-full md:w-1/3'>
                    <label
                        htmlFor='region'
                        className='text-2xl text-slate-400 font-Popins font-bold outline-none mt-5 block'
                    >
                        Select Region:
                    </label>
                    <select
                        name='region'
                        id='region'
                        required
                        className='w-full mt-3 px-3 py-1 border-2 text-sm md:text-base font-Popins border-transparent outline-Primary rounded'
                        onChange={handleChange}
                        value={formData.region}
                    >
                        <option value=''>Select</option>
                        {REGIONS.map((region) => (
                            <option key={region} value={region}>
                                {region.charAt(0).toUpperCase() +
                                    region.slice(1)}
                            </option>
                        ))}
                    </select>
                    {errors.region && (
                        <p className='text-red-500'>{errors.region}</p>
                    )}
                </div>
            </div>

            {/* Method input field */}
            <div className='mt-5'>
                <label
                    htmlFor='method'
                    className='text-2xl text-slate-400 font-Popins font-bold outline-none mt-5 block'
                >
                    Method:
                </label>
                <textarea
                    name='method'
                    placeholder='Enter method..'
                    rows={20}
                    className='w-full mt-1 px-3 py-1 border-2 border-transparent outline-Primary font-Popins block rounded'
                    onChange={handleChange}
                    value={formData.method}
                    required
                />
                {errors.method && (
                    <p className='text-red-500'>{errors.method}</p>
                )}
            </div>

            {/* Show mutation result error */}
            {error && <Error message={error} className='w-fit mx-auto' />}

            {/* Submit button */}
            <button
                type='submit'
                className='btn btn-primary mx-auto mt-4 block'
                disabled={loading}
            >
                Submit
            </button>

            {loading && <Spinner />}
        </form>
    );
}
