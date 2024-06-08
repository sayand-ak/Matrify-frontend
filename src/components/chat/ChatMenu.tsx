import { useState } from "react";
import { SearchBox } from "../searchbox/searchBox";
import { ChatMenuItems } from "./ChatMenuItem";
import { Conversation } from "../../typings/conversation/conversation";
import { useAppSelector } from "../../hooks/useTypedSelectors";

interface ChatMenuProps {
    handleMenuItemClick: (conversationId: string) => void;
    conversations: Conversation[];
}

export function ChatMenu({ handleMenuItemClick, conversations }: ChatMenuProps) {
    const [search, setSearch] = useState("");
    

    const userId = useAppSelector(state => state.user.user?._id);

    function handleSearch() {
        // Implement search functionality if needed
    }

    return (
        <div className="chat-list w-full md:w-[30%] bg-[#efe1ca4f] overflow-scroll no-scrollbar">
            <div className="sticky top-0 bg-[#efe1ca8e] pb-5 shadow-sm">
                <h2 className="text-[25px] pl-10 font-bold py-5">Chat</h2>
                <div className="w-full flex justify-center">
                    <SearchBox handleSearch={handleSearch} search={search} setSearch={setSearch} />
                </div>
            </div>
            <div className="pt-5 flex flex-col gap-0 mb-40">
                {conversations.length > 0 ? (
                    conversations.map((conversation, index) => (
                        <div
                            onClick={() => handleMenuItemClick(conversation._id || "")}
                            key={index}
                        >
                            <ChatMenuItems conversation={conversation} userId={userId || ""} />
                        </div>
                    ))
                ) : (
                    <div className="w-full flex items-center justify-center text-[13px] text-gray-400">No Chat yet!</div>
                )}
            </div>
        </div>
    );
}
