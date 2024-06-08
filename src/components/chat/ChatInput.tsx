import { useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiGrin } from "react-icons/bs";
import React from "react";
import { useAppSelector } from "../../hooks/useTypedSelectors";
import { IoIosAdd } from "react-icons/io";
import { AudioElement } from "../audioRecorder/AudioRecorder";
import { CiImageOn } from "react-icons/ci";
import { PiVideo } from "react-icons/pi";
import { BsFileEarmarkText } from "react-icons/bs";



interface ChatInputProps {
    handleSendMessage: (value: string) => void;
    receiverId: string;
}

export function ChatInput({ handleSendMessage, receiverId }: ChatInputProps) {
    const [inputData, setInputData] = useState<string>("");
    const [emoji, setEmoji] = useState<boolean>(false);
    const messageInputRef = React.useRef<HTMLInputElement>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [blockedUser, setBlockedUser] = useState(false);
    const [showFileOptions, setShowFileOptions] = useState<boolean>(false);


    // const [isRecording, setIsRecording] = useState(false);

    const curUser = useAppSelector(state => state.user.user);

    useEffect(() => {
        curUser?.blockedUsers?.some((data) => data.user === receiverId) ? setBlockedUser(true) : setBlockedUser(false);
    }, [curUser, receiverId])
    
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

    function handleAddFilesClick() {
        setShowFileOptions(!showFileOptions);
    }


    return (
        <div className="absolute bottom-0 w-[70%] h-24 bg-[#efe3cb] flex gap-4 items-center px-10">
           {blockedUser ? (
                <div className="w-full flex items-center h-full rounded-md">
                    <p 
                        className="text-[16px]"
                    >
                        You have blocked this user. 
                        <a href={`/profile/${receiverId}`} className="font-semibold text-blue-500 px-1">Tap</a> 
                        unblock to continue chat.

                    </p>
                </div>
            ) : (
                <>
                    {emoji && (
                        <div className="absolute bottom-[75px] transition-transform duration-300 ease-in-out transform">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                    <div className="message-input w-[94%] flex items-center bg-[#F0F3F4] px-4 rounded-md">
                        <BsEmojiGrin 
                            className="fixed text-[24px] text-[#9BA3AF]"
                            onClick={() => setEmoji(!emoji)}
                        />

                        <input 
                            type="text" 
                            className="h-11 ml-5 px-5 w-[98%] rounded-md outline-none bg-[#F0F3F4] text-[16px]"
                            placeholder="Message..."
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            ref={messageInputRef}
                        />

                        {/* file image video and file input */}
                        {showFileOptions && (
                            <div className="h-[150px] flex flex-col justify-around items-center text-[20px] w-10 bg-[#F0F3F4] absolute right-28 top-[-130px] rounded-t-md">
                                <CiImageOn />
                                <PiVideo />
                                <BsFileEarmarkText />
                            </div>
                        )}

                        <div className={`add-files flex items-center gap-3 text-[#9BA3AF]`}>
                            <button className="pr-2]" onClick={handleAddFilesClick}>
                                <IoIosAdd className="text-[35px] hover:text-black"/>
                            </button>
                        </div>

                    </div>
                    {
                        inputData != "" ? (
                            <button onClick={handleSendClick} className="absolute right-10">
                                <IoSendSharp className="text-3xl text-[#A58964]" />
                            </button>

                        ): (
                            <div className={`absolute right-9 flex`}>
                                {/* recording component */}
                                <AudioElement/>
                            </div>
                        )
                    }

                </>
            )}
        </div>
    );
}
