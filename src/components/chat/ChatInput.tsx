import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiGrin } from "react-icons/bs";
import React from "react";



interface ChatInputProps {
    handleSendMessage: (value: string) => void;
}

export function ChatInput({ handleSendMessage }: ChatInputProps) {
    const [inputData, setInputData] = useState<string>("");
    const [emoji, setEmoji] = useState<boolean>(false);
    const messageInputRef = React.useRef<HTMLInputElement>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

    function handleSendClick() {
        handleSendMessage(inputData);
        setInputData("");
    }

    function handleEmojiClick(emojiObject: { emoji: string; }) {
        console.log(emojiObject, "emojiObject");
        
        const { emoji } = emojiObject;
        console.log(selectedEmoji);
        
        setInputData((prevInput) => prevInput + emoji);
        setSelectedEmoji(emoji);
        setEmoji(false); 
    }

    return (
        <div className="absolute bottom-0 w-[70%] h-24 bg-[#efe3cb] flex gap-4 items-center px-10">
            {
                emoji &&
                <div className="absolute bottom-[75px] transition-transform duration-300 ease-in-out transform ">
                    <EmojiPicker onEmojiClick={handleEmojiClick}/>
                </div>
            }
            <div className="w-full flex items-center bg-white px-4 rounded-md">
                <  BsEmojiGrin 
                    className="text-[25px] text-[#9BA3AF]"
                    onClick={() => setEmoji(!emoji)}
                />

                <input 
                    type="text" 
                    className="h-12 px-5 w-[98%] rounded-md outline-none text-[20px]"
                    placeholder="Message..."
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    ref={messageInputRef}
                />
            </div>
            <button onClick={handleSendClick}>
                <IoSendSharp className="text-3xl text-[#121211]" />
            </button>
        </div>
    );
}
