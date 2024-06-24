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
import { changeCallStatus } from "../../../services/videoCallApi";

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

    const curUser = useAppSelector(state => state.user.user);

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

        socket.on('notify-receiver', async(data) => {
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

    useEffect(() => {
        socket.on("joined-room", ({ roomId }) => {
           navigate(`/room/${roomId}`);
        });
        
        return () => {
            socket.off("joined-room");
        }
    }, [navigate, socket]);
    
    

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


    async function handleAcceptCall(){
        if(roomId) {
            const response = await dispatch(changeCallStatus({roomId: roomId, status: "accepted"}));
            if(response.payload?.success) {
                socket.emit('join-room', {callerId: userId , receiverId:  callingUser._id, roomId: roomId});
            } else {
                alert("Failed to accept call");
            }
        } else {
            alert("Failed to join room");
        }
    }  

    async function handleRejectCall() {
        if(roomId) {
            const response = await dispatch(changeCallStatus({roomId: roomId, status: "rejected"}));
            if(response.payload?.success) {
                setShowCallNotifier(false);
            } else {
                alert("Failed to reject call");
            }
        } else {
            alert("Failed to leave room");
        }
    }

    if (curUser && !curUser.subscribed) {
        return (
            <div className="h-[100vh] w-[100vw] flex items-center justify-center">
                <div className="max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">Subscribe to unlock chat features</h1>
                    <p className="text-lg mb-4">Subscribe now to enjoy unlimited chatting and more features!</p>
                    <div className="flex justify-between">
                        <a href="/payment" className="bg-[#C2A170] hover:bg-[#b38641] text-white font-bold py-2 px-4 rounded">
                            Subscribe Now
                        </a>
                        <a href={`/profile/${curUser._id}`} className="border-[1px] border-[#C2A170]  text-[#C2A170] font-bold py-2 px-4 rounded">
                            Back
                        </a>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className={`h-[100vh] w-[100vw] flex overflow-hidden`}>
            <ChatMenu 
                handleMenuItemClick={handleMenuItemClick}
                conversations={conversations}
                isChatSelected={isChatSelected}
            />
            <ChatBox 
                currentChat={currentChat} 
                isChatSelected={isChatSelected} 
                setIsChatSelected={setIsChatSelected}
                handleSendMessage={handleSendMessage}
                conversations={conversations.find(conversation => conversation._id === activeConversationId)|| {} as Conversation}
            />
            {
                showCallNotifier && (
                    <>
                        <div className={`call-notifier w-[80%] md:w-[50%] lg:w-[40%] flex items-center justify-between px-12 ${showCallNotifier ? 'show' : ''}`}>
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
                                <button 
                                    className="bg-red-500 rounded-full h-12 w-12 flex items-center justify-center"
                                    onClick={() => handleRejectCall()}
                                >
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
