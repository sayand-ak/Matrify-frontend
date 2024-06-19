import { VscTriangleDown } from "react-icons/vsc";
import "./chat.css";
import { formatReceivedTime } from "../../utils/formateReceivedTime";
import { MessageData } from "../../typings/conversation/message";
import { AudioResult } from "../audioRecorder/AudioResult";

interface MessageSendProps {
    message: MessageData;
    createdAt: string;
}

export function MessageSend({ message, createdAt }: MessageSendProps) {
    
    return (
        <div className="flex flex-col items-end">
            {
                message.type == "text" &&
                <div
                    className={`message-send-message-container px-3 py-2 rounded-md bg-[#a68964] relative text-white mr-14 }`}
                >
                    <VscTriangleDown className="absolute text-[30px] top-[-9.3px] right-[-13px] text-[#a68964]" />
                    {message.type == "text" && message.value}
                </div>
            }

            {
                message.type == "audio" &&
                <div
                    className={`message-send-message-container px-1 py-1 rounded-md bg-[#a68964] relative text-white mr-14 }`}
                >
                    <VscTriangleDown className="absolute text-[30px] top-[-9.3px] right-[-13px] text-[#a68964]" />
                    <AudioResult audioUrl={message.file as string}/>
                </div>
            }
            {
                message.type == "image" && 
                <div 
                    className="message-send-message-container border-t-[19px] border-[5px] border-[#a68964] min-h-[250px] min-w-[250px] mt-5 px-1 py-1 rounded-md relative text-white mr-14"
                    style={{backgroundImage: `url(${message.file as string})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}
                >
                    <VscTriangleDown className="absolute text-[30px] top-[-28.3px] right-[-17px] text-[#a68964]" />
                </div>

            }
            <p className="text-[10px] pt-2 mr-14">{formatReceivedTime(createdAt)}</p>
        </div>
    );
}
