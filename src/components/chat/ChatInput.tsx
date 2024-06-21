import { useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiGrin } from "react-icons/bs";
import React from "react";
import { useAppSelector } from "../../hooks/useTypedSelectors";
import { IoIosAdd } from "react-icons/io";
import { AudioElement } from "../audioRecorder/AudioRecorder";
import { MessageData } from "../../typings/conversation/message";
import { FaImages } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";
import { IoDocuments } from "react-icons/io5";
import { handleImageChange } from "../../utils/handleImageChange";
import { MdOutlineClose } from "react-icons/md";


interface ChatInputProps {
    handleSendMessage: (data: MessageData, audioFile?: File) => void;
    receiverId: string;
}

export function ChatInput({ handleSendMessage, receiverId }: ChatInputProps) {
    const [inputData, setInputData] = useState<string>("");
    const [emoji, setEmoji] = useState<boolean>(false);
    const messageInputRef = React.useRef<HTMLInputElement>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [blockedUser, setBlockedUser] = useState(false);
    const [showFileOptions, setShowFileOptions] = useState<boolean>(false);
    const [audioFile, setAudioFile] = useState<File | null>(null);   
    const [sendImage, setSendImage] = useState<File | null>(null)
    const [sendImageUrl, setSendImageUrl] = useState<string | null>(null)

    const curUser = useAppSelector(state => state.user.user);

    useEffect(() => {
        curUser?.blockedUsers?.some((data) => data.user === receiverId) ? setBlockedUser(true) : setBlockedUser(false);
    }, [curUser, receiverId]);

    useEffect(() => {
        if (audioFile) {
          handleSendMessage({ type: "audio", file: audioFile });
          setAudioFile(null);
        }
      }, [audioFile, handleSendMessage]);
    
    function handleSendClick() {
        if (sendImage) {
            handleSendMessage({ type: "image", file: sendImage });
            setSendImage(null);
            setSendImageUrl(null);
        } else {
            handleSendMessage({ type: "text", value: inputData });
            setInputData("");
        }
    }

    function handleEmojiClick(emojiObject: { emoji: string; }) {    
        console.log(selectedEmoji);
            
        const { emoji } = emojiObject;
        setInputData((prevInput) => prevInput + emoji);
        setSelectedEmoji(emoji);
        setEmoji(false); 
    }

    function handleAddFilesClick() {
        setShowFileOptions(!showFileOptions);
    }

    return (
        <div className="absolute bottom-0 w-[100%] md:w-[50%] lg:w-[70%] h-24 bg-[#efe3cb] flex gap-4 items-center px-10">

            {/* user selected image preview */}
            {
                sendImage && sendImageUrl && (
                    <div className="send-image-preview w-full absolute top-[-600px] left-0 bg-[#f2ece2] min-h-[600px] flex items-center justify-center">
                        <h1 className="absolute top-10 left-10 font-semibold text-[20px]">Image preview</h1>
                        <button 
                            className="absolute top-5 right-10 font-bold"
                            onClick={() => setSendImage(null)}
                        >
                            <MdOutlineClose className="text-[25px] text-[#0000009e]"/>
                        </button>

                        <img src={sendImageUrl} alt="" className="h-[25rem] w-auto" />
                    </div>
                )
            }


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
                            <div className={`more-options-div text-[23px] text-[#A58964] ${showFileOptions ? 'show-options' : ''}`}>
                                <button>
                                    <input 
                                        type="file" 
                                        className="w-14 h-10 opacity-0 absolute left-0"
                                        onChange={(e) => {
                                                handleImageChange(e, setSendImageUrl, setSendImage )
                                                setShowFileOptions(false);
                                            }
                                        }
                                    />
                                    <FaImages className="hover:text-black"/>
                                </button>

                                <button>
                                    <BiSolidVideos className="hover:text-black"/>
                                </button>

                                <button>
                                    <IoDocuments className="hover:text-black"/>
                                </button>
                            </div>
                        )}

                        <div className={`add-files flex items-center gap-3 text-[#9BA3AF]`}>
                            <button className="pr-2]" onClick={handleAddFilesClick}>
                                <IoIosAdd className={`text-[35px] hover:text-black ${showFileOptions ? 'rotate-90' : 'rotate-0'}`} />
                            </button>
                        </div>

                    </div>
                    {
                        inputData !== "" || sendImage ? (
                            <button onClick={handleSendClick} className="absolute md:right-3 lg:right-10">
                                <IoSendSharp className="text-3xl text-[#A58964]" />
                            </button>

                        ): (
                            <div className={`absolute right-3 lg:right-9 flex`}>
                                {/* recording component */}
                                <AudioElement setAudioFile={setAudioFile}/>
                            </div>
                        )
                    }
                </>
            )}

        </div>
    );
}
