import { useEffect, useState } from "react";
import { SearchBox } from "../searchbox/searchBox";
import { ChatMenuItems } from "./ChatMenuItems";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { getConversations } from "../../services/chatAPI";
import { Conversation } from "../../typings/conversation/conversation";

interface ChatMenuProps {
    handleMenuItemClick: (conversationId: string) => void;
}

export function ChatMenu({handleMenuItemClick}: ChatMenuProps) {
    const [search, setSearch] = useState("");
    
    const [conversation, setConversation] = useState<Conversation[]>([]);

    const userId = useAppSelector(state => state.user.user?._id);
    const dispatch = useAppDispatch();

    useEffect(() => {
        //calling get conversation API
        async function fetchConversations(){
            const response = await dispatch(getConversations(userId? userId: ""));
            if(response.payload?.success) {
                setConversation(response.payload.data);
            }else{
                alert("Chat conversation api error!!!!!")
            }
            
        }
        fetchConversations();
    },[dispatch, userId]);

    function handleSearch(){

    }
    
    return (
        <div className="chat-list w-[30%] bg-[#F5F2EC] overflow-scroll no-scrollbar">
            <div className="sticky top-0 bg-[#F5F2EC] pb-5">
                <h2 className="text-[25px] pl-10 font-bold py-5">Chat</h2>
                <div className="w-full flex justify-center">
                    <SearchBox handleSearch={handleSearch} search={search} setSearch={setSearch}/>  
                </div>
            </div>

            <div className="pt-5 flex flex-col gap-0 mb-40">
                {
                    conversation.length > 0 ? (conversation.map((conversation, index) => (
                        <div 
                        onClick={() => handleMenuItemClick(conversation._id || "")}
                            key={index}
                        >
                            <ChatMenuItems conversation={conversation} userId={userId || ""}/>
                        </div>
                    ))) : (
                        <div className="w-full flex items-center justify-center text-[13px] text-gray-400">No Chat yet !</div>
                    )
                }
            </div>
        </div>
    );
}