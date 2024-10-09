import { useSelector } from 'react-redux';
import { Rating } from '../../shared';

export default function MessageField() {
    const { _id, name, img } = useSelector((state) => state.user);

    console.log(img);

    return (
        <section className='mt-2 border-t-2 border-slate-300'>
            <div className='mt-5 mx-12 p-3 bg-Primary/35 flex justify-start items-start rounded'>
                <img
                    src={
                        'https://res.cloudinary.com/dy0h8pfb1/image/upload/v1728289438/mad-chef/profile-pictures/670397f6a5072fe2fb4f9094.jpg'
                    }
                    className='size-20 object-fill rounded-full bg-red-300'
                    alt=''
                />
                <div className='w-full px-4 rounded-b-3xl rounded-tr-3xl'>
                    <div className='mb-2 flex items-center gap-x-2'>
                        <h3 className='font-semibold'>John Doe</h3>
                        <span className='size-1 bg-black rounded-full' />
                        <h3 className='font-semibold'>Admin</h3>
                        <span className='size-1 bg-black rounded-full' />
                        <div className='flex text-xl text-yellow-400'>
                            <Rating />
                        </div>
                    </div>

                    <textarea className='w-full h-20 p-2 bg-slate-100 text-slate-900 outline-Primary resize-none rounded-b-3xl rounded-tr-3xl' />

                    <button className='mt-1 ml-auto block px-6 py-1 bg-Primary/50 text-white cursor-pointer  rounded'>Post</button>
                </div>
            </div>
        </section>
    );
}
