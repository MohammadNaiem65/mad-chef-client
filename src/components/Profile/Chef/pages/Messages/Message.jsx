import ChatBody from '../../../ChatBody';
import ChatHead from '../../../ChatHead';
import MessageInput from '../../../MessageInput';

export default function Message() {
    return (
        <section>
            <ChatHead />
            <ChatBody />
            <MessageInput />
        </section>
    );
}
