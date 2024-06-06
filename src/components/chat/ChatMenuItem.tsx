import { useEffect, useState } from "react";
import { Conversation } from "../../typings/conversation/conversation";
import { UserData } from "../../typings/user/userTypes";
import { formatDate } from "../../utils/formateDate";
import { useAppDispatch } from "../../hooks/useTypedSelectors";
import { userProfile } from "../../services/userAPI";

interface ChatMenuItemsProps {
    conversation: Conversation;
    userId: string;
}

export function ChatMenuItems({ conversation, userId }: ChatMenuItemsProps) {
    const [user, setUser] = useState<UserData>();
    const dispatch = useAppDispatch();

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

    return (
        <div className="h-20 px-5 my-2 flex items-center gap-5 hover:bg-[#e0e2e5] cursor-pointer">
            <div
                className="h-[4rem] w-[5rem] rounded-full"
                style={{ backgroundImage: `url(${user?.image ? user.image : '../src/assets/images/profile.png'})`, backgroundSize: "cover" }}
            ></div>
            <div className="flex justify-between w-full items-center border-b-[1px] h-full">
                <div>
                    <h1 className="text-[15px] font-[500]">{user?.username}</h1>
                    <p className="text-[14px]">status</p>
                </div>
                <p className="text-[13px]">{formatDate(conversation.createdAt || "")}</p>
            </div>
        </div>
    );
}
