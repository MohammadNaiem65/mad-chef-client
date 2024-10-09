import { MessageInputField } from '../../shared';

export default function CommentSection() {
    return (
        <section className='mt-2 border-t-2 border-slate-300 text-slate-700'>
            <MessageInputField />

            {[1, 2, 3, 4, 5, 6].map((el) => (
                <div key={el} className='flex justify-start mt-5 mr-12'>
                    <img
                        src='https://res.cloudinary.com/dy0h8pfb1/image/upload/v1728393454/mad-chef/profile-pictures/67038f5aa5072fe2fb4f9081.jpg'
                        className='size-12 object-cover rounded-full'
                        alt=''
                    />
                    <div className='ml-2 py-3 px-4 bg-Primary/40 rounded-b-3xl rounded-tr-3xl'>
                        <div className='flex items-center gap-x-2'>
                            <h3 className='font-semibold'>John Doe</h3>
                            <span className='size-1 bg-black rounded-full' />
                            <h3 className='font-semibold'>Admin</h3>
                        </div>

                        <p>
                            Welcome to group everyone ! Lorem ipsum dolor sit,
                            amet consectetur adipisicing elit. Delectus dolor
                            natus aut ab totam, a, tempore qui voluptatum maxime
                            voluptatibus repellendus pariatur omnis aperiam
                            velit incidunt. Quo ipsum odit animi?
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
}
