import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetChefQuery } from '../../../../../features/chef/chefApi';
import { Error } from '../../../../../shared';
import { useBookConsultMutation } from '../../../../../features/consult/consultApi';

export default function ConsultForm() {
    const { _id: userId, name, email } = useSelector((state) => state.user);
    const navigate = useNavigate();

    // local states
    const [formData, setFormData] = useState({
        name: name || '',
        email: email || '',
        chefId: '',
        chefName: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '',
        endTime: '',
    });
    const [error, setError] = useState('');

    const {
        data: chefData,
        isSuccess: chefDataIsSuccess,
        isError: chefDataIsErr,
        error: chefDataErr,
    } = useGetChefQuery(
        {
            chef_id: formData?.chefId,
            include: '_id,name',
        },
        {
            skip: !formData?.chefId,
        }
    );
    const [
        bookConsult,
        {
            isLoading: bookConsultIsLoading,
            isSuccess: bookConsultIsSucc,
            isError: bookConsultIsErr,
            error: bookConsultErr,
        },
    ] = useBookConsultMutation();

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const data = {
            userId,
            username: formData.name,
            userEmail: formData.email,
            chefId: formData.chefId,
            chefName: formData.chefName,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
        };

        bookConsult({ data });
    };

    // Set the chef name
    useEffect(() => {
        if (chefDataIsSuccess) {
            setFormData((prev) => ({
                ...prev,
                chefName: chefData?.data?.name,
            }));
        }
    }, [chefDataIsSuccess, chefData?.data?.name]);

    // Set error message - For chef data process error
    useEffect(() => {
        if (chefDataIsErr) {
            setError(chefDataErr?.data?.message);
        }
    }, [chefDataIsErr, chefDataErr?.data?.message]);

    // Set error message - For booking consult process error
    useEffect(() => {
        if (bookConsultIsErr) {
            setError(bookConsultErr?.data?.message);
        }
    }, [bookConsultIsErr, bookConsultErr?.data?.message]);

    // Handle success case - For booking consult process
    useEffect(() => {
        if (bookConsultIsSucc) {
            navigate('/profile/user/consults/my-consults');
        }
    }, [navigate, bookConsultIsSucc]);

    return (
        <section className='lg:w-4/5 mt-5 xl:mt-10 mx-2 lg:mx-auto py-10 text-slate-500 font-Popins bg-Primary/20 relative rounded overflow-hidden'>
            <h1 className='text-center text-3xl font-semibold'>Consult</h1>

            <form
                className='w-11/12 md:w-2/3 mx-auto'
                onSubmit={handleSubmitForm}
            >
                {/* Name */}
                <>
                    <label
                        htmlFor='name'
                        className='text-xl block mb-1 mt-5 tracking-wide'
                    >
                        Name:
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        className='input w-full'
                        required
                        value={formData.name}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                </>

                {/* Email */}
                <>
                    <label
                        htmlFor='email'
                        className='text-xl block mb-1 mt-5 tracking-wide'
                    >
                        Email:
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='input w-full'
                        required
                        value={formData.email}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                    />
                </>

                {/* Chef Details */}
                <div className='flex items-center gap-x-3'>
                    <div className='w-full'>
                        <label
                            htmlFor='chiefId'
                            className='text-xl block mb-1 mt-5 tracking-wide'
                        >
                            Chief ID:
                        </label>
                        <input
                            type='text'
                            name='chiefId'
                            id='chiefId'
                            required
                            className='input w-full'
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    chefId: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className='w-full'>
                        <label
                            htmlFor='chiefName'
                            className='text-xl block mb-1 mt-5 tracking-wide'
                        >
                            Chief Name:
                        </label>
                        <input
                            type='text'
                            name='chiefName'
                            id='chiefName'
                            className='input w-full disabled'
                            defaultValue={formData.chefName}
                            disabled={!formData.chefId}
                            required
                            readOnly
                        />
                    </div>
                </div>

                {/* Date and Time */}
                <div className='w-full grid grid-cols-4 gap-x-3'>
                    {/* Date */}
                    <div className='col-span-3 xl:col-span-2'>
                        <label
                            htmlFor='date'
                            className='text-xl block mb-1 mt-5 tracking-wide'
                        >
                            Date:
                        </label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            className='input w-full disabled'
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.date}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    date: e.target.value,
                                }))
                            }
                            disabled={!formData.chefId}
                            required
                        />
                    </div>

                    {/* Start Time */}
                    <div className='col-span-2 xl:col-span-1'>
                        <label
                            htmlFor='time'
                            className='text-xl block mb-1 mt-5 tracking-wide'
                        >
                            Start:
                        </label>
                        <input
                            type='time'
                            name='time'
                            id='time'
                            className='input w-full disabled'
                            min='09:00'
                            max='18:00'
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    startTime: e.target.value,
                                }))
                            }
                            disabled={!formData.chefId}
                            required
                        />
                    </div>

                    {/* End Time */}
                    <div className='col-span-2 xl:col-span-1'>
                        <label
                            htmlFor='time'
                            className='text-xl block mb-1 mt-5 tracking-wide'
                        >
                            End:
                        </label>
                        <input
                            type='time'
                            name='time'
                            id='time'
                            className='input w-full disabled'
                            required
                            min='09:00'
                            max='18:00'
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    endTime: e.target.value,
                                }))
                            }
                            disabled={!formData.startTime}
                        />
                    </div>
                </div>

                {error && <Error message={error} />}

                {/* Submit */}
                <button
                    className='btn btn-primary block mt-10 mx-auto'
                    type='submit'
                    disabled={bookConsultIsLoading}
                >
                    Submit
                </button>
            </form>

            {/* blobs */}
            <div className='shape-bg-three h-64 md:h-96 aspect-square bg-Primary/20 md:bg-Primary/30 lg:bg-Primary/20 absolute -top-10 md:-top-16 -right-32 md:-right-28 lg:-right-16 -z-10' />

            <div className='shape-bg-one h-40 md:h-56 aspect-square bg-Primary/20 absolute top-[40%] lg:top-[44%] -left-14 md:-left-28 lg:-left-20 rotate-45 -z-10' />
            <div className='shape-bg-one h-40 md:h-56 aspect-square bg-Primary/20 absolute top-[43%] lg:top-1/2 -left-14 md:-left-28 lg:-left-20 rotate-45 -z-20' />

            <div className='shape-bg-three h-64 md:h-96 aspect-square bg-Primary/20 absolute -right-20 md:-right-24 lg:-right-20 -z-10' />
        </section>
    );
}
