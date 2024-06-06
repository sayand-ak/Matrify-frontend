import { VscTriangleDown } from "react-icons/vsc";
import "./chat.css";
import { formatReceivedTime } from "../../utils/formateReceivedTime";

interface MessageSendProps {
  message: string;
  createdAt: string;
}

export function MessageSend({ message, createdAt }: MessageSendProps) {
  return (
    <div className="flex flex-col items-end">
      <div
        className={`message-send-message-container px-3 py-2 rounded-md bg-[#a68964] relative text-white mr-14 }`} 
      >
        <VscTriangleDown className="absolute text-[30px] top-[-9.3px] right-[-13px] text-[#a68964]" />
        {message}
      </div>
      <p className="text-[10px] pt-2 mr-14">{formatReceivedTime(createdAt)}</p>
    </div>
  );
}
