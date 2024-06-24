import { VscTriangleDown } from "react-icons/vsc";
import { formatReceivedTime } from "../../utils/formateReceivedTime";
import { MessageData } from "../../typings/conversation/message";
import { AudioResult } from "../audioRecorder/AudioResult";

interface MessageReceivedProps {
    message: MessageData;
    createdAt: string;
  }

export function MessageReceived ({ message, createdAt }: MessageReceivedProps) {

    return (
        <div className="">
            {
                message.type=="text" && 
                <div className="message-receive-message-container w-fit px-3 py-2 rounded-md bg-[#ccad77] relative text-white ml-14">
                    <VscTriangleDown className="absolute text-[30px] top-[-9.258px] left-[-14px] text-[#ccad77]"/>
                    {message.type=="text" && message.value}
                </div>
            } 
            {
                message.type == "audio" && 
                <div className="message-receive-message-container w-fit px-1 py-1 rounded-md bg-[#ccad77] relative text-white ml-14">
                    <VscTriangleDown className="absolute text-[30px] top-[-9.258px] left-[-14px] text-[#ccad77]"/>
                    <AudioResult audioUrl={message.file as string}/>
                </div>

            }
            {
                message.type == "image" && 
                <div 
                    className="message-receive-message-container border-t-[19px] border-[5px] border-[#ccad77]  h-[250px] w-[250px] mt-5 px-1 py-1 rounded-md relative text-white ml-14"
                    style={{backgroundImage: `url(${message.file})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}
                >
                    <VscTriangleDown className="absolute text-[30px] top-[-28.3px] left-[-17px] text-[#ccad77]" />
                </div>

            }
            {

            }
            <p className="text-[10px] pl-14 pt-2">{formatReceivedTime(createdAt)}</p>
        </div>
    )
}