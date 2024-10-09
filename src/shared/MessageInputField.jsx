export default function MessageInputField() {
    return (
        <div className='flex items-center justify-between w-full py-3 pr-3 border-t border-gray-300'>
            <input
                type='text'
                placeholder='Enter your comment here'
                className='block w-full py-2 pl-4 mr-3 bg-gray-100 border-2 border-Primary/40 focus:ring focus:ring-Primary rounded-full outline-none focus:border-transparent focus:text-gray-700'
                name='message'
                required
            />
            <button type='submit'>
                <svg
                    className='size-6 text-gray-500 origin-center transform rotate-90 hover:text-Primary'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                >
                    <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
                </svg>
            </button>
        </div>
    );
}
