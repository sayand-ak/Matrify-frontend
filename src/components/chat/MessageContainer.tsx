import { useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/useTypedSelectors";
import { Message } from "../../typings/conversation/message";
import { MessageReceived } from "./MessageReceive";
import { MessageSend } from "./MessageSend";
import "./chat.css";

interface MessageContainerProps {
    currentChat: Message[];
}

export function MessageContainer({ currentChat }: MessageContainerProps) {
    const userId = useAppSelector(state => state.user.user?._id);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [currentChat]);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.style.scrollBehavior = "smooth"
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    return (
        <div className="message-container py-20 no-scrollbar" ref={messageContainerRef}>
            <div className="message-content flex flex-col gap-7 pt-20">
                {currentChat.map((message, index) => (
                    message.sender === userId ? (
                        <div key={index}>
                            <MessageSend 
                                message={message.data} 
                                createdAt={message.createdAt?.toString() || ""} 
                            />
                        </div>
                    ) : (
                        <div key={index}><MessageReceived message={message.data} createdAt={message.createdAt?.toString() || ""} /></div>
                    )
                ))}
            </div>
        </div>
    );
}
