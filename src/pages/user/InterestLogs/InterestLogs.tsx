import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { updateInterestStatus, userProfile } from "../../../services/userAPI";
import { UserProfile } from "../../../typings/Profile/professionDataType";
import { formatDate } from "../../../utils/formateDate";
import { LuSendHorizonal } from "react-icons/lu";
import showToast from "../../../components/Toast/Toast";
import { startConversation } from "../../../services/chatAPI";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./interestLogs.css";

interface InterestSend {
    sendTo: string;
    sendOn: Date;
    status: string;
    viewed?: boolean
}

interface InterestReceived {
    sendBy: string;
    receivedOn: Date;
    status: string;
}

interface InterestListProps {
    interestSend: InterestSend[];
    interestReceived: InterestReceived[];
}

export default function InterestLogs(interestData: InterestListProps) {
    const [selectedTab, setSelectedTab] = useState<string>("interestSend");
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [userData, setUserData] = useState<{ interestSend: UserProfile[]; interestReceived: UserProfile[] }>({
        interestSend: [],
        interestReceived: [],
    });

    const userId = useAppSelector(state => state.user.user?._id);
    const user = useAppSelector(state => state.user.user);

    useEffect(() => {
        async function fetchData() {
            try {
                if (selectedTab === "interestSend" && interestData.interestSend.length > 0) {
                    const users = await Promise.all(
                        interestData.interestSend.map(async (interest) => {
                            const response = await dispatch(userProfile(interest.sendTo));
                            return response.payload.data[0];
                        })
                    );
                    setUserData((prevState) => ({ ...prevState, interestSend: users }));
                } else if (selectedTab === "interestReceived" && interestData.interestReceived.length > 0) {
                    const users = await Promise.all(
                        interestData.interestReceived.map(async (interest) => {
                            const response = await dispatch(userProfile(interest.sendBy));
                            return response.payload.data[0];
                        })
                    );
                    setUserData((prevState) => ({ ...prevState, interestReceived: users }));
                }
                
            } catch (error) {
                navigate("/500");
            }
        }
        fetchData();
    }, [selectedTab, interestData, dispatch]);

    async function handleStatusChange(userId: string, status: string) {
        try {
            if(user?.subscribed){
                const response = await dispatch(updateInterestStatus({targetUserId: userId.toString(), status: status}));
                if (response.payload.success) {
                    showToast("success", "Interest status updated successfully");
                }else{
                    showToast("error", "Interest status updating failed");
                }
            } else {
                showToast("error", "Please subscribe to use this feature")
            }
            
        } catch (error) {
            navigate("/500");
        }
    }

    async function handleStartChat(senderId: string, receiverId: string) {
        try {
            const response = await dispatch(startConversation({senderId: senderId, receiverId: receiverId}));
            if (response.payload.success) {
                navigate("/chat");
            }else{
                showToast("error", "Chat starting failed");
            }
            
        } catch (error) {
            navigate("/500");
        }
    }
    

    return (
        <div className="w-full flex flex-col items-center max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex justify-around items-center border-b-[1px] border-b-[#dfdfdf] text-[18px] min-h-[80px] w-full">
                <div className="h-full flex-1 flex justify-center hover:bg-[#f4f4f4]">
                    <button
                        className={`opacity-50 h-full flex items-center ${selectedTab === "interestSend" ? "font-semibold border-b-[5px] border-[#E7C68F] opacity-100" : ""}`}
                        onClick={() => setSelectedTab("interestSend")}
                    >
                        Interest Sent
                    </button>
                </div>
                <div className="h-full flex-1 flex justify-center hover:bg-[#f4f4f4]">
                    <button
                        className={`opacity-50 h-full flex items-center ${selectedTab === "interestReceived" ? "font-semibold border-b-[5px] border-[#E7C68F] opacity-100" : ""}`}
                        onClick={() => setSelectedTab("interestReceived")}
                    >
                        Interest Received
                    </button>
                </div>
            </div>

            <div className="interest-logs w-[65%] rounded-lg p-4">
                {selectedTab === "interestSend" ? (
                    <>
                        {userData.interestSend.length > 0 ? (
                            userData.interestSend.map((data, index) => (
                                <div key={index} className="flex items-center gap-6 mb-4 px-5 py-4 border-b-[1px]">
                                    <div className="flex items-center gap-5 w-full">
                                        <div className="relative">
                                                {isLoading && (
                                                    <div className="loader"></div>
                                                )}
                                                <img
                                                    src={data.image}
                                                    alt="Profile"
                                                    className="h-20 w-20 rounded-full object-cover"
                                                    onLoad={() => setIsLoading(false)}
                                                    style={{ display: isLoading ? 'none' : 'block', backgroundColor: "#FFF5E1" }}
                                                />
                                            </div>

                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold text-[18px]">{data.username} ({new Date().getFullYear() - new Date(data.dob).getFullYear()})</p>
                                            <p className="text-sm text-gray-400">{`Sent on: ${formatDate(interestData.interestSend[index].sendOn.toString())}`}</p>
                                            <p className="text-[#E7C68F] font-semibold text-[15px]">{interestData.interestSend[index].status.toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {interestData.interestSend[index].status === "accepted" && (
                                            <button 
                                                className="text-[#E7C68F] font-semibold flex items-center gap-2 cursor-pointer"
                                                onClick={() => handleStartChat(userId || "", data._id)}
                                            >
                                                Chat 
                                                <LuSendHorizonal className="text-xl" /> 
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div 
                                className="h-[500px] opacity-75 flex justify-center items-end" 
                                style={{backgroundImage: `url("/images/5225086.jpg")`, backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat"}}
                            >
                                <p className="font-semibold text-2xl font-custom text-[#9c9994b9]">No interest requests sent yet!</p>
                            </div>
                        )}
                    </>
                ) : (

                    <>
                        {userData.interestReceived.length > 0 ? (
                            userData.interestReceived.map((data, index) => (
                                <div key={index} className="flex items-center gap-6 mb-4 px-5 py-4 border-b-[1px]">
                                    <div className="flex items-center gap-5 w-full">
                                        <div
                                            className="h-20 w-20 rounded-full bg-cover bg-center"
                                            style={{ backgroundImage: `url(${data.image})` }}
                                        ></div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold text-[22px]">{data.username} ({new Date().getFullYear() - new Date(data.dob).getFullYear()})</p>
                                            <p className="text-sm text-gray-400">{`Received on: ${formatDate(interestData.interestReceived[index].receivedOn.toString())}`}</p>
                                            <p className="text-[#E7C68F] font-semibold text-[15px]">{interestData.interestReceived[index].status.toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {interestData.interestReceived[index].status === "accepted" && (
                                            <p 
                                                className="text-[#E7C68F] font-semibold flex items-center gap-2"
                                                onClick={() => handleStartChat(userId || "", data._id)}
                                            >
                                                Chat 
                                                <LuSendHorizonal className="text-xl" /> 
                                            </p>
                                        )}
                                        {interestData.interestReceived[index].status === "pending" && (
                                            <div className="flex gap-4">
                                                <a 
                                                    className="bg-[#E7C68F] text-white font-semibold flex items-center gap-2 rounded-2xl px-4 py-1 cursor-pointer"
                                                    onClick={() => handleStatusChange(data._id, "accepted")}
                                                    >
                                                    Accept
                                                </a>
                                                <a 
                                                    className="text-[#E7C68F] border-[#E7C68F] font-semibold flex items-center gap-2 border rounded-2xl px-4 py-1 cursor-pointer"
                                                    onClick={() => handleStatusChange(data._id, "rejected")}
                                                >
                                                    Reject
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div 
                                className="h-[500px] opacity-75 flex justify-center items-end" 
                                style={{backgroundImage: `url("/images/5225086.jpg")`, backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat"}}
                            >
                                <p className="font-semibold text-2xl font-custom text-[#9c9994b9]">No interest requests received yet!</p>
                            </div>
                        )}
                    </>
                )}
            </div>
            <ToastContainer/>
        </div>
    );
}
