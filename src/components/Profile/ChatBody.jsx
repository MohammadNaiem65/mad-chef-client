import ChatBubble from './ChatBubble';

export default function ChatBody() {
    return (
        <div className='relative w-full h-[25rem] p-6 overflow-y-auto flex flex-col-reverse'>
            <ul className='space-y-2'>
                <ChatBubble
                    justify={'end'}
                    color={'text-gray-700'}
                    message={
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ipsum illo quis beatae excepturi quos sapiente cum in. Sit quidem doloribus facere ratione dolorem distinctio alias, enim blanditiis perferendis autem!'
                    }
                />
            </ul>
        </div>
    );
}
