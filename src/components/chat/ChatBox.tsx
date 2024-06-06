import { useContext, useEffect, useState } from "react";
import { ChatInput } from "./ChatInput";
import { MessageContainer } from "./MessageContainer";
import { Message } from "../../typings/conversation/message";
import { IoShieldCheckmark } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { UserData } from "../../typings/user/userTypes";
import { formatReceivedTime } from "../../utils/formateReceivedTime";
import { userProfile } from "../../services/userAPI";
import { SocketContext } from "../../context/socketContext";

// interface SocketUserType {
//     userId: string;
//     socketId: string;
// }


interface ChatBoxProps {
    currentChat: Message[],
    isChatSelected: boolean,
    handleSendMessage: (value: string) => void,
}


export function ChatBox({ currentChat, isChatSelected, handleSendMessage }: ChatBoxProps) {
    const [message, setMessage] = useState<string[]>([]);
    const [friendId, setFriendId] = useState<string | null>(null);
    const [lastReceivedTime, setLastReceivedTime] = useState("first chat");
    const [user, setUser] = useState<UserData | null>(null);

    const userId = useAppSelector(state => state.user.user?._id);
    const dispatch = useAppDispatch();

    const { usersOnline } = useContext(SocketContext);
    

    useEffect(() => {
        const id = currentChat.find(msg => msg.sender !== userId);
        setFriendId(id?.sender || "");

        if (currentChat.length > 0) {
            const lastReceivedMessage = currentChat[currentChat.length - 1];
            const receivedTime = formatReceivedTime(lastReceivedMessage.createdAt?.toString() || "");
            setLastReceivedTime(receivedTime);
        }
    }, [currentChat, userId]);


    useEffect(() => {
        async function fetchUserData(friendId: string) {
            if (friendId) {
                const response = await dispatch(userProfile(friendId));
                setUser(response.payload.data[0]);
            }
        }
        if (friendId) {
            fetchUserData(friendId);
        }

    }, [friendId, dispatch]);
    



    async function handleSendMessageAndSetMessage(value: string) {
        handleSendMessage(value);
        setMessage([...message, value]);
    }

    function isUserOnline(): boolean{
        return usersOnline.some((user) => user.userId === friendId);
    }
    


    return (
        <div className="chat-box w-[70%]">
            {isChatSelected ? (
                <div className="chat-box-header">
                    <div className="border-b-[1px] px-5 py-[5px] flex items-center gap-5 bg-[#EFE2CB]">
                        <div
                            className="h-[4rem] w-[4rem] rounded-full"
                            style={{ backgroundImage: `url(${user?.image ? user.image : "../src/assets/images/businesswoman-posing.jpg"})`, backgroundSize: "cover" }}
                        ></div>
                        <div>
                            <h1 className="text-[20px] font-semibold">{user?.username}</h1>
                            <p className="text-[10px]">{lastReceivedTime}</p>
                            <p className="text-[10px]">{isUserOnline() ? "Online" : "Offline"}</p>
                        </div>
                    </div>
                    <div className="w-full min-h-[70vh] overflow-hidden">
                        <MessageContainer currentChat={currentChat} />
                    </div>
                    <ChatInput handleSendMessage={handleSendMessageAndSetMessage} />
                </div>
            ) : (
                <div
                    className="h-full opacity-80 flex flex-col justify-end pb-[3rem] gap-4 items-center"
                    style={{ backgroundImage: "url('../src/assets/images/2193.jpg')", backgroundSize: "contain", backgroundPosition: 'center', boxShadow: "" }}
                >
                    <p className="text-4xl items-center font-gillroy text-[#000000b2]">Know each other, and love each other</p>
                    <p className="text-[#0000007e] text-lg flex items-center gap-2">
                        <IoShieldCheckmark className="text-shadow" />
                        Your chat will be safe with us
                    </p>
                </div>
            )}
        </div>
    );
}
