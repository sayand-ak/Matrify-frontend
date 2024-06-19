import { useContext, useEffect, useState } from "react";
import { Conversation } from "../../typings/conversation/conversation";
import { UserData } from "../../typings/user/userTypes";
import { formatDate } from "../../utils/formateDate";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { userProfile } from "../../services/userAPI";
import { MdBlock } from "react-icons/md";
import { SocketContext } from "../../context/SocketContext";
import "./chat.css"


interface ChatMenuItemsProps {
    conversation: Conversation;
    userId: string;
}

export function ChatMenuItems({ conversation, userId }: ChatMenuItemsProps) {
    const [user, setUser] = useState<UserData>();
    const dispatch = useAppDispatch();
    const curUser = useAppSelector(state => state.user.user);

    const {usersOnline} = useContext(SocketContext);

    useEffect(() => {
        async function fetchUserData() {
            const friendId = conversation?.members.find((member: string) => member !== userId);
            if (friendId) {
                const response = await dispatch(userProfile(friendId));
                setUser(response.payload.data[0]);
            }
        }
        fetchUserData();
    }, [conversation, userId, dispatch]);

    function isUserOnline(): boolean{
        return usersOnline.some((socketUser) => socketUser.userId === user?._id);
    }

    return (
        <div className="h-20 px-5 my-2 flex items-center gap-5 hover:bg-[#e0e2e5] cursor-pointer">
            <div
                className="h-[4rem] w-[5rem] rounded-full"
                style={{ backgroundImage: `url(${user?.image ? user.image : '../src/assets/images/profile.png'})`, backgroundSize: "cover" }}
            ></div>
            <div className="menu-item flex justify-between w-full items-center h-full">
                <div>
                    <h1 className="text-[15px] font-[500]">{user?.username}</h1>
                    <p>
                        {
                            isUserOnline() ? (
                                <span className="text-gray-500 text-[10px]">
                                    Online
                                </span>
                            ) : (
                                <span className="text-gray-500 text-[10px]">
                                    Offline
                                </span>
                            )
                        }
                        {curUser?.blockedUsers?.some((data) => data.user === user?._id) && (
                            <p className="text-red-500">
                                <MdBlock className="inline-block mr-1" />
                                Blocked
                            </p>
                        )}
                    </p>                </div>
                <p className="text-[13px]">{formatDate(conversation.createdAt || "")}</p>
            </div>
        </div>
    );
}
