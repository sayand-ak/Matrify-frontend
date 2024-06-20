import { useEffect, useState } from "react";
import { ChatBox } from "../../../components/chat/ChatBox";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { getMessages, getConversations, sendMessages } from "../../../services/chatAPI";
import { Message, MessageData } from "../../../typings/conversation/message";
import { ChatMenu } from "../../../components/chat/ChatMenu";
import { Conversation } from "../../../typings/conversation/conversation";
import { socket } from "../../../services/socket";
import { IoMdCall } from "react-icons/io";
import { HiPhoneMissedCall } from "react-icons/hi";
import "./Chat.css"
import { userProfile } from "../../../services/userAPI";
import { UserData } from "../../../typings/user/userTypes";
import { useNavigate } from "react-router-dom";

export function Chat() {
    const [currentChat, setCurrentChat] = useState<Message[]>([]);
    const [isChatSelected, setIsChatSelected] = useState(false);
    const [conversationId, setConversationId] = useState<string>("");
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string>("");
    const [showCallNotifier, setShowCallNotifier] = useState(false);
    const [callingUser, setCallingUser] = useState<UserData>({} as UserData);
    const [roomId, setRoomId] = useState<string>("");

    const userId = useAppSelector(state => state.user.user?._id);
    const dispatch = useAppDispatch();
    
    const navigate = useNavigate();

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
            setCurrentChat(prev => [...prev, data])

        });

        socket?.on('notify-receiver', async(data) => {
            if (data.receiverId == userId) {
                
                const userData = await dispatch(userProfile(data.callerId));
                if(userData.payload?.success){
                    setCallingUser(userData.payload.data[0]);
                   
                    setShowCallNotifier(true);

                    setRoomId(data.roomId);

                    setTimeout(() => {
                        setShowCallNotifier(false);
                    }, 40000);

                } else {
                    alert("Failed to load user profile");
                }
            }
        });

        // Clean up the socket event listener on component unmount
        return () => {
            socket?.off("getMessage");
            socket?.off("notify-receiver'");
        };
    }, [conversationId, userId, dispatch]);        

    async function handleMenuItemClick(conversationId: string) {
        setActiveConversationId(conversationId)
        const response = await dispatch(getMessages(conversationId));
        if (response.payload?.success) {
            setCurrentChat(response.payload.data);
            setIsChatSelected(true);
            setConversationId(conversationId);
        } else {
            alert("Failed to load messages");
        }
    }
    
    async function handleSendMessage(data: MessageData) {
        const formData = new FormData();
        console.log(data);
        
    
        // Add common fields to FormData
        formData.append('conversationId', conversationId);
        formData.append('sender', userId || "");
    
        if ('value' in data) {
            // Regular text message
            formData.append('type', 'text');
            formData.append('value', data.value);
        } else if ('file' in data && data.type == "audio") {
            // Audio or file message
            formData.append('type', 'audio');
            formData.append('file', data.file);
        } else if ('file' in data && data.type == "image") {
            formData.append("type", "image");
            formData.append("file", data.file);
        }

        const response = await dispatch(sendMessages(formData));
        if (response.payload?.success) {
            const sentMessage = response.payload.data;
            setCurrentChat([...currentChat, sentMessage]);
    
            // Emit socket message if necessary
            const receiverId = conversations.find(
                conversation => conversation._id === conversationId
            )?.members.find(
                member => member !== userId
            );
            socket?.emit("sendMessage", {
                senderId: userId || "",
                receiverId: receiverId,
                data: data, 
            });
        } else {
            alert("Failed to send message");
        }
    }

    function handleAcceptCall(){
        if(roomId) {
            navigate(`/room/${roomId}`);
        } else {
            alert("Failed to join room");
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
                conversations={conversations.find(conversation => conversation._id === activeConversationId)|| {} as Conversation}
            />
            {
                showCallNotifier && (
                    <>
                        <div className={`call-notifier flex items-center justify-between px-12 ${showCallNotifier ? 'show' : ''}`}>
                            <div className="flex gap-3 items-center">
                                <div 
                                    className="h-14 w-14 rounded-full bg-blue-700"
                                    style={{backgroundImage: `url(${callingUser.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                                ></div>
                                <div>
                                    <h1>{callingUser.username}</h1>
                                    <p className="text-[12px]">calling...</p>
                                </div>
                            </div>
                            <div className=" flex gap-10">
                                <button 
                                    className="bounce2 bg-green-500 rounded-full h-12 w-12 flex items-center justify-center"
                                    onClick={() => handleAcceptCall()}
                                >
                                    <IoMdCall className="text-[25px]"/>
                                </button>
                                <button className="bg-red-500 rounded-full h-12 w-12 flex items-center justify-center">
                                    <HiPhoneMissedCall className="text-[25px]"/>
                                </button>
                            </div>
                        </div>
                        <audio src="/src/assets/audio/racing_into_the_night.mp3" autoPlay={true}></audio>
                    </>
                )
            }
            
        </div>
    );
}
