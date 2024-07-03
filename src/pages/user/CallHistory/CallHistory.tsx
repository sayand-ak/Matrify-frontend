import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { VideoCallData } from "../../../typings/videoCall/videoCall";
import { getCallHistory } from "../../../services/videoCallApi";
import { userProfile } from "../../../services/userAPI";
import { ImArrowUpRight2 } from "react-icons/im";
import { ImArrowDownLeft2 } from "react-icons/im";
import { formatDate } from "../../../utils/formateDate";
import { formatReceivedTime } from "../../../utils/formateReceivedTime";

interface CallHistoryData extends VideoCallData {
    otherUserName: string;
    otherUserImage: string;
}

export const CallHistory = () => {
    const [callHistory, setCallHistory] = useState<CallHistoryData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.user.user?._id);


    const fetchUserDetails = async (userId: string) => {
        try {
            const response = await dispatch(userProfile(userId));
            if (response.payload.success) {
                const userData = response.payload.data[0];
                return { userName: userData.username, userImage: userData.image };
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
        return { userName: "Unknown", userImage: "" };
    };

    const handleFetchCallHistory = useCallback(async () => {
        try {
            const response = await dispatch(getCallHistory(userId || ""));
            if (response.payload.success) {
                const calls = response.payload.data;
                const callsWithUserDetails = await Promise.all(
                    calls.map(async (call: VideoCallData) => {
                        if (call.caller === userId) {
                            const { userName: otherUserName, userImage: otherUserImage } = await fetchUserDetails(call.receiver);
                            return {
                                ...call,
                                otherUserName,
                                otherUserImage
                            };
                        } else if (call.receiver === userId) {
                            const { userName: otherUserName, userImage: otherUserImage } = await fetchUserDetails(call.caller);
                            return {
                                ...call,
                                otherUserName,
                                otherUserImage
                            };
                        }
                    })
                );
                setCallHistory(callsWithUserDetails.filter(Boolean) as CallHistoryData[]);
            } else {
                alert("Call history error");
            }
        } catch (error) {
            console.error("Error fetching call history:", error);
        }
    }, [dispatch, userId]);

    useEffect(() => {
        handleFetchCallHistory();
    }, [handleFetchCallHistory]);

    return (
        <div className="w-full flex flex-col gap-5 items-center my-10 h-[95vh] overflow-scroll no-scrollbar">
            {callHistory.reverse().map((call, index) => (
                <div key={index} className="w-[80%] min-h-[110px] rounded-lg bg-[#f4f4f4] p-4">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            {isLoading && (
                                <div className="loader"></div>
                            )}
                            <img
                                src={call.otherUserImage}
                                alt="Profile"
                                className="h-20 w-20 rounded-full object-cover"
                                onLoad={() => setIsLoading(false)}
                                style={{ display: isLoading ? 'none' : 'block', backgroundColor: "#FFF5E1" }}
                            />
                        </div>                        <div>
                            <div>
                                {call.caller === userId ? (
                                    <p>
                                        <span className="flex items-center gap-2">
                                            <ImArrowUpRight2 className="text-green-500"/> 
                                            {call.otherUserName}
                                        </span>

                                        <span className="text-[12px]">
                                            {formatReceivedTime(call.createdAt?.toString() || "")}

                                        </span>
                                    </p>
                                ) : (
                                    <p>
                                        <span className="flex items-center gap-2">
                                            <ImArrowDownLeft2 className="text-[#e5b25b] font-bold"/> 
                                            {call.otherUserName} 
                                        </span>

                                        <span className="text-[12px]">
                                            {formatDate(call.createdAt?.toString() || "")}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
