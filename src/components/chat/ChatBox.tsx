import { useCallback, useContext, useEffect, useState } from "react";
import { ChatInput } from "./ChatInput";
import { MessageContainer } from "./MessageContainer";
import { Message, MessageData } from "../../typings/conversation/message";
import { IoShieldCheckmark } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { UserData } from "../../typings/user/userTypes";
import { formatReceivedTime } from "../../utils/formateReceivedTime";
import { userProfile } from "../../services/userAPI";
import { Conversation } from "../../typings/conversation/conversation";
import { IoVideocamOutline } from "react-icons/io5";
import { VideoCallData } from "../../typings/videoCall/videoCall";
import { newCall } from "../../services/videoCallApi";
import { socket } from "../../services/socket";
import { IoMdArrowBack } from "react-icons/io";
import { SocketContext } from "../../context/socketContext";
import { useNavigate } from "react-router-dom";
import showToast from "../Toast/Toast";
import { ToastContainer } from "react-toastify";


interface ChatBoxProps {
    currentChat: Message[],
    isChatSelected: boolean,
    setIsChatSelected: (isChatSelected: boolean) => void,
    handleSendMessage: (data: MessageData) => void;
    conversations: Conversation;
}


export function ChatBox({ currentChat, isChatSelected, setIsChatSelected, handleSendMessage, conversations }: ChatBoxProps) {
    const [message, setMessage] = useState<string[]>([]);
    const [lastReceivedTime, setLastReceivedTime] = useState("first chat");
    const [user, setUser] = useState<UserData | null>(null);    

    const dispatch = useAppDispatch();
    const { usersOnline } = useContext(SocketContext);
    
    const curUser = useAppSelector(state => state.user.user);

    const navigate = useNavigate();

    // const navigate = useNavigate();
    
      //formatting the last received date
      const getLastReceivedTime = useCallback(() => {
        if (currentChat.length > 0) {
          const lastReceivedMessage = currentChat[currentChat.length - 1];
          return formatReceivedTime(lastReceivedMessage.createdAt?.toString() || "");
        }
        return "first chat";
    }, [currentChat]);
    
    // Fetching user data
    const fetchUserData = useCallback(async (friendId: string) => {
        try {
            if (friendId) {
              const response = await dispatch(userProfile(friendId));
              setUser(response.payload.data[0]);
            }
        } catch (error) {
            navigate("/500");
        }
    }, [dispatch]);

    const findUserDataFromConversation = useCallback(() => {
        if (conversations && conversations.members) {
            const friendId = conversations.members.find(member => member !== curUser?._id);
            if (friendId) {
                fetchUserData(friendId);
            }
        }
    }, [conversations, curUser?._id, fetchUserData]);
      
    useEffect(() => {
        const receivedTime = getLastReceivedTime();
        setLastReceivedTime(receivedTime);
        findUserDataFromConversation();
        
    }, [getLastReceivedTime, conversations, currentChat, findUserDataFromConversation]);


    
    async function handleSendMessageAndSetMessage(data: MessageData) {       
        if(data.type == "text") {
            handleSendMessage({type: "text", value: data.value});
        } else if(data.type == "audio") {
            handleSendMessage({type: "audio", file: data.file});
        } else if(data.type == "image") {
            handleSendMessage({type: "image", file: data.file});
        }
        setMessage([...message, 'value' in data ? data.value : '']);
    }

    function isUserOnline(): boolean {
        return usersOnline.some((user) => user.userId === conversations.members.find(member => member !== curUser?._id));
    }

    async function handleVideoCall () {
        try {
            if (curUser?._id && user?._id) {
                const videoCallData: VideoCallData = {
                    caller: curUser?._id,
                    receiver: user?._id,
                }
                const newVideoCall = await dispatch(newCall(videoCallData));
                if(newVideoCall.payload.success) {
                    const callData = newVideoCall.payload.data;
                    socket.emit('join-room', {callerId: callData.caller, receiverId: callData.receiver, roomId: callData.roomId});
                    
                } else {
                    showToast("error","video call backend error...")
                }
            } else {
                showToast ("error", "sender or receiver not found....")
            }
        } catch (error) {
            navigate("/500");
        }
    }

    return (
        <div className={`chat-box md:w-[50%] lg:w-[70%] ${isChatSelected ? "w-full md:block" : "hidden md:block"}`}>
            {isChatSelected ? (
                <div className="chat-box-header">
                    <div className="relative flex justify-between bg-[#EFE2CB] px-5 md:px-10">
                        <div className="border-b-[1px] py-[10px] flex items-center gap-5">
                            <IoMdArrowBack 
                                className="text-[20px] block md:hidden"
                                onClick={() => setIsChatSelected(false)}
                            />

                            <div
                                className="h-[4rem] w-[4rem] rounded-full"
                                style={{ backgroundImage: `url(${user?.image ? user.image : "/images/businesswoman-posing.jpg"})`, backgroundSize: "cover" }}
                            ></div>
                            <div>
                                <h1 className="text-[20px] font-semibold">{user?.username}</h1>
                                <p className="text-[10px]">{lastReceivedTime}</p>
                                <p className="text-[10px]">{isUserOnline() ? "Online" : "Offline"}</p>
                            </div>
                        </div>

                        {/* video call button */}
                        <div className="flex items-center">
                            <button onClick={handleVideoCall}>
                                <IoVideocamOutline className="text-[26px]"/>
                            </button>
                        </div>

                    </div>

                    <div className="w-full min-h-[70vh] overflow-hidden">
                        <MessageContainer 
                            currentChat={currentChat} 
                        />
                    </div>

                    <ChatInput 
                        handleSendMessage={handleSendMessageAndSetMessage} 
                        receiverId={user?._id || ""} 
                    />

                </div>
            ) : (
                <div
                    className="h-full opacity-80 flex-col justify-end md:pb-[5rem] lg:pb-[3rem] gap-4 items-center hidden md:flex bg-[#f0ece5]"
                    style={{ backgroundImage: "url('/images/2193-removebg.png')", backgroundSize: "contain", backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
                >
                    <p className="text-2xl lg:text-4xl items-center font-gillroy text-[#000000b2]">Know each other, and love each other</p>
                    <p className="text-[#0000007e] text-lg flex items-center gap-2">
                        <IoShieldCheckmark className="text-shadow" />
                        Your chat will be safe with us
                    </p>
                </div>
            )}
            <ToastContainer/>
        </div>
    );
}
