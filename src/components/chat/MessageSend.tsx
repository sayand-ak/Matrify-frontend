import { VscTriangleDown } from "react-icons/vsc";
import "./chat.css";

interface MessageSendProps {
  message: string;
}

export function MessageSend({ message }: MessageSendProps) {
  return (
    <div className="flex flex-col items-end">
      <div
        className={`message-send-message-container px-3 py-2 rounded-md bg-[#a68964f1] relative text-white mr-14 }`} 
      >
        <VscTriangleDown className="absolute text-[30px] top-[-9px] right-[-14px] text-[#a68964f1]" />
        {message}
      </div>
      <p className="text-[10px] pt-2 mr-14">11:30 pm</p>
    </div>
  );
}
