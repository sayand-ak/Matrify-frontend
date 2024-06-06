import { useEffect, useState } from "react";
import { ChatBox } from "../../../components/chat/ChatBox";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { getMessages, getConversations, sendMessages } from "../../../services/chatAPI";
import { Message } from "../../../typings/conversation/message";
import { ChatMenu } from "../../../components/chat/ChatMenu";
import { Conversation } from "../../../typings/conversation/conversation";
import { socket } from "../../../services/socket";

export function Chat() {
    const [currentChat, setCurrentChat] = useState<Message[]>([]);
    const [isChatSelected, setIsChatSelected] = useState(false);
    const [conversationId, setConversationId] = useState<string>("");
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [arrivalMessage, setArrivalMessage] = useState<Message>({} as Message);


    const userId = useAppSelector(state => state.user.user?._id);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchConversations() {
            const response = await dispatch(getConversations(userId || ""));
            if (response.payload?.success) {
                setConversations(response.payload.data);
            } else {
                alert("Chat conversation API error!");
            }
        }
        fetchConversations();


        // Listen for incoming messages
        socket?.on("getMessage", (data: Message) => {
            
            setArrivalMessage({
                conversationId: "",
                sender: data.sender,
                text: data.text,
                createdAt: data.createdAt
            });
            setCurrentChat(prev => [...prev, data])

        });
        // Clean up the socket event listener on component unmount
        return () => {
            socket?.off("getMessage");
        };
    }, [conversationId, userId, dispatch]);

    console.log(arrivalMessage);
    

    async function handleMenuItemClick(conversationId: string) {
        const response = await dispatch(getMessages(conversationId));
        if (response.payload?.success) {
            setCurrentChat(response.payload.data);
            setIsChatSelected(true);
            setConversationId(conversationId);
        } else {
            alert("Failed to load messages");
        }
    }

    async function handleSendMessage(value: string) {
        if (!value.trim()) {
            return;
        }

        const newMessage: Message = {
            conversationId: conversationId,
            sender: userId || "",
            text: value
        };

        const receiverId = conversations.find(
            conversation => conversation._id === conversationId
        )?.members.find(
            member => member !== userId
        );

        const response = await dispatch(sendMessages({ messageData: newMessage }));
        if (response.payload?.success) {
            const sentMessage = response.payload.data;
            setCurrentChat([...currentChat, sentMessage]);

            socket?.emit("sendMessage", {
                senderId: userId || "",
                receiverId: receiverId,
                text: value
            });
        } else {
            alert("Failed to send message");
        }
    }

    return (
        <div className="h-[100vh] w-[100vw] flex overflow-hidden">
            <ChatMenu 
                handleMenuItemClick={handleMenuItemClick}
                conversations={conversations}
            />
            <ChatBox 
                currentChat={currentChat} 
                isChatSelected={isChatSelected} 
                handleSendMessage={handleSendMessage}
            />
        </div>
    );
}
