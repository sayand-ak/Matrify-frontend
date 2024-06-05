import { useState } from "react";
import { ChatBox } from "../../../components/chat/ChatBox";
import { ChatMenu } from "../../../components/chat/ChatMenu";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { getMessages } from "../../../services/chatAPI";


export function Chat() {
    const [currentChat, setCurrentChat] = useState();

    const dispatch = useAppDispatch();

    async function handleMenuItemClick(conversationId: string){
        const response = await dispatch(getMessages(conversationId));
        setCurrentChat(response.payload.data);        
    }

    return (
        <div className="h-[100vh] w-[100vw] flex overflow-hidden">
            <ChatMenu handleMenuItemClick={handleMenuItemClick}/>
            <ChatBox currentChat={currentChat}/>
        </div>
    );
}