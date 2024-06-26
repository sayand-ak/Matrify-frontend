import { useState } from "react";
import { SearchBox } from "../searchbox/searchBox";
import { ChatMenuItems } from "./ChatMenuItem";
import { Conversation } from "../../typings/conversation/conversation";
import { useAppSelector } from "../../hooks/useTypedSelectors";
import { IoArrowBack } from "react-icons/io5";
import "./chat.css"


interface ChatMenuProps {
    handleMenuItemClick: (conversationId: string) => void;
    conversations: Conversation[];
    isChatSelected: boolean;
    chatMap: Map<string, number>
}

function ChatMenu({ handleMenuItemClick, conversations, isChatSelected, chatMap}: ChatMenuProps) {
    const [search, setSearch] = useState("");
    

    const userId = useAppSelector(state => state.user.user?._id);

    function handleSearch() {
        // Implement search functionality if needed
    }

    return (
            <div className={`chat-list bg-[#efcf9718] overflow-scroll no-scrollbar ${isChatSelected ? 'hidden sm:block' : 'w-full'} md:w-[50%] lg:w-[30%]`}>            
            <div className="chat-menu-header pb-5 bg-[#EFCE97]">
                <div className="flex items-center px-5 text-[#000000]">
                    <a href={`/profile/${userId}`}>
                        <IoArrowBack className="text-2xl"/>
                    </a>
                    <h2 className="text-[25px] pl-4 font-bold py-5">Chat</h2>
                </div>
                <div className="w-full flex justify-center">
                    <SearchBox handleSearch={handleSearch} search={search} setSearch={setSearch} />
                </div>
            </div>
            <div className="pt-5 flex flex-col gap-0 mb-40">
                {conversations.length > 0 ? (
                    conversations.map((conversation, index) => (
                        <div
                            onClick={() => {
                                handleMenuItemClick(conversation._id || "");
                            }}
                            key={index}
                        >
                            <ChatMenuItems
                                conversation={conversation}
                                userId={userId || ""}
                                notificationCount={
                                    chatMap.get(
                                        (conversation.members.find((member) => member !== userId))as string
                                    ) || 0
                                }
                            />
                            
                        </div>
                    ))
                ) : (
                    <div className="w-full flex items-center justify-center text-[13px] text-gray-400">No Chat yet!</div>
                )}
            </div>
        </div>
    );
}

export default ChatMenu;
