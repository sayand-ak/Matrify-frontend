import "./Table.css";
import { CiCircleMore } from "react-icons/ci";
import { Offer, PaymentHistory, Subscription, UserData, Users } from "../../typings/user/userTypes";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Loader } from "../loader/Loader";
import { CustomModal } from "../modal/CustomModal";
import { useState } from "react";
import { ReportUserType } from "../../typings/reportUser/reportUser";
import { FeedbackResponse } from "../../typings/feedback/feedback";
import { formatDate } from "../../utils/formateDate";
import { useAppDispatch } from "../../hooks/useTypedSelectors";
import { blockUser } from "../../services/adminAPI";
import showToast from "../Toast/Toast";
import { ToastContainer } from "react-toastify";



interface TableProps {
    headers: string[];
    data: (Users | Subscription | Offer | PaymentHistory | ReportUserType | FeedbackResponse | UserData)[];
    isLoading: boolean;
    handlePagination: (direction: string) => void;
    paginationCount: number;
    totalItemsCount: number;
    handleItemCheck?: (feedbackId: string) => void;
    type: string;
    handleUpdateReportStatus?: ((reportId: string) => void)
}

export function Table(
    { headers, 
        data,
        isLoading, 
        handlePagination, 
        paginationCount, 
        totalItemsCount, 
        handleItemCheck,
        type, 
        handleUpdateReportStatus
    }: TableProps
) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [userData, setUserData] = useState<UserData | null>(null);

    const dispatch = useAppDispatch();


    const handleModalOpen = (user: UserData) => {
        setUserData(user)
        setIsModalOpen(true);
    }

    const handleBlockUser = async (userId: string) => {
        const response = await dispatch(blockUser(userId));
        console.log(response);
        
        if(response.payload.success){
            showToast("success", response.payload.message, () => {
                setUserData(response.payload.data);
            });
        } else {
            showToast("error", response.payload.message);
        }
    }
    

    return (
        <div className="flex flex-col justify-between w-full items-center">
            {isLoading ?
                <Loader dimension={70} />
                :
                <table className="bg-[#ffffff]">
                    <thead>
                        <tr className="text-center h-[57px]">
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>

                    {
                        type == "user" &&
                        <tbody>
                            {data.length > 0 && data.map((user, index) => (
                                <tr className="text-center h-[60px]" key={index}>
                                    <td key={index}>{index}</td>
                                    <td>{"username" in user && user.username}</td>
                                    <th className="flex justify-center">

                                        <a href={"image" in user && user.image || "#"} target="_parent">
                                            <img
                                                src={"image" in user && user.image ? user.image : "../../src/assets/images/profile.png"}
                                                alt=""
                                                className="h-16 w-16 rounded-full"
                                            />
                                        </a>
                                    </th>
                                    <td>{"phone" in user && user.phone ? user.phone : "nill"}</td>
                                    <td>{"email" in user && user.email ? user.email : "nill"}</td>
                                    <td>{new Date("createdAt" in user && user.createdAt || "").toISOString().split('T')[0]}</td>
                                    <td>{"otpVerified" in user && user.otpVerified ? "verified" : "not verified"}</td>
                                    <td>
                                        <button onClick={() => { handleModalOpen(user as UserData) }}>
                                            <CiCircleMore className="text-2xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {
                                data.length == 0 && (<p className="h-10 font-semibold flex items-center justify-center">No offers added Yet!</p>)
                            }
                        </tbody>
                    }


                    {
                        type == "subscription" &&
                        <tbody>
                            {data.length > 0 && data.map((data, index) => (
                                <tr className="text-center h-[60px]" key={index}>

                                    <td key={index}>{index}</td>

                                    <td>{new Date("createdAt" in data && data.createdAt || "").toISOString().split('T')[0]}</td>

                                    <td>{"amount" in data && data.amount?.weekly}</td>
                                    <td>{"amount" in data && data.amount?.monthly}</td>
                                    <td>{"amount" in data && data.amount?.yearly}</td>

                                    <td>{"status" in data && data.status}</td>
                                </tr>
                            ))}
                            {
                                data.length == 0 && (<p className="h-10 font-semibold flex items-center justify-center">No offers added Yet!</p>)
                            }
                        </tbody>
                    }

                    {type === "offer" && (
                        <tbody>
                            {data.length > 0 && data.map((offer, index) => (
                                <tr className="text-center h-[60px]" key={index}>
                                    <td className="truncate max-w-20">{"offerId" in offer && offer?.offerId}</td>
                                    <td>{"title" in offer && offer?.title}</td>
                                    <td className="max-w-20 truncate">{"description" in offer && offer?.description}</td>
                                    <td>{"offerPercentage" in offer && offer.offerPercentage}</td>
                                    <td>{"status" in offer && offer.status}</td>
                                    <td>{new Date("startsAt" in offer && offer.startsAt || "").toISOString().split('T')[0]}</td>
                                    <td>{new Date("endsAt" in offer && offer.endsAt || "").toISOString().split('T')[0]}</td>
                                </tr>
                            ))}
                            {
                                data.length == 0 && (<p className="h-10 font-semibold flex items-center justify-center">No offers added Yet!</p>)
                            }
                        </tbody>
                    )}

                    {type === "history" && (
                        <tbody>{
                            data.map((paymentHistory, index) => (
                                "subscription" in paymentHistory && paymentHistory.subscription.map((subscription, subIndex) => (
                                    <tr className="text-center h-[60px]" key={`${index}-${subIndex}`}>
                                        <td className="truncate max-w-20 py-2 border-b">{subscription.pid}</td>
                                        <td className="py-2 px-4 border-b">{paymentHistory.username}</td>
                                        <td className="py-2 px-4 border-b">{subscription.amount}</td>
                                        <td className="py-2 px-4 border-b">
                                            {subscription.createdAt ? new Date(subscription.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className={`py-2 px-4 border-b`}>
                                            {subscription.expiresIn ? new Date(subscription.expiresIn).toLocaleDateString() : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            ))
                        }
                            {
                                data.length == 0 && (<p className="h-10 font-semibold flex items-center justify-center">No offers added Yet!</p>)
                            }
                        </tbody>
                    )}

                    {
                        type === "report-user" && (
                            <tbody>{
                                data.map((reportData, index) => (
                                    <tr className="text-center h-[60px]" key={`${index}`}>
                                        <td className="py-2 px-4 border-b">{"reportingUserId" in reportData && reportData.reportingUserId}</td>
                                        <td className="py-2 px-4 border-b">{"reportedUserId" in reportData && reportData.reportedUserId}</td>
                                        <td className="py-2 px-4 border-b">{"reason" in reportData && reportData.reason}</td>
                                        <td className="py-2 px-4 border-b">{"narrative" in reportData && reportData.narrative}</td>

                                        <td className="py-2 px-4 border-b">
                                            <a href={`${"screenshot" in reportData && reportData.screenshot}`} className="gap-1 h-full text-[17px] italic text-blue-600">
                                                view
                                            </a>
                                        </td>

                                        <td className="py-2 px-4 border-b">
                                            {"reportingUserId" in reportData && reportData.createdAt ? new Date(reportData.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                className={`font-bold border-[1px] p-2 rounded-lg ${"access" in reportData && reportData.access === "blocked" ? "text-red-700" : "text-green-700"}`}
                                                onClick={() => {handleUpdateReportStatus && handleUpdateReportStatus("_id" in reportData && reportData._id || "")}}
                                            >
                                                {"access" in reportData && reportData.access}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                                {
                                    data.length == 0 && (<p className="h-10 font-semibold flex items-center justify-center">No offers added Yet!</p>)
                                }
                            </tbody>
                        )
                    }

                    {
                        type === "feedback" && (
                            <tbody>
                                {(data as FeedbackResponse[]).length > 0 && data.map((feedback, index) => (
                                    <tr className="text-center h-[60px]" key={index}>
                                        <td >  
                                        <input 
                                            type="checkbox" 
                                            className="h-4 w-4" 
                                            onChange={() => handleItemCheck && handleItemCheck("_id" in feedback && feedback._id || "")}
                                        />
                                        </td>
                                        <td>{"userId" in feedback && feedback.userId.username}</td>
                                        <td>{"partnerId" in feedback && feedback.partnerId.username}</td>
                                        <td className="truncate max-w-52">{"story" in feedback && feedback.story}</td>
                                        <td>
                                            <div
                                                className="w-16 h-16 rounded-full bg-cover bg-center bg-no-repeat"
                                                style={{ backgroundImage: `url(${"image" in feedback && feedback.image})` }}
                                            />
                                        </td>
                                        <td>{formatDate("createdAt" in feedback && feedback.createdAt ? feedback.createdAt.toString() : "")}</td>
                                    </tr>
                                ))}
                                {data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="h-10 font-semibold flex items-center justify-center">No feedbacks added yet!</td>
                                    </tr>
                                )}
                            </tbody>
                        )
                    }


                </table>
            }
            <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <div className="min-h-[75vh] min-w-[50vw] flex flex-col justify-around">
                    <h1 className="text-[30px] font-semibold pb-5 text-center">User Info</h1>
                    <div className="flex w-full items-center justify-around">
                        <div
                            className="h-[15rem] w-[15rem] rounded-full bg-red-400"
                            style={{ backgroundImage: `url(${userData?.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        />
                        <div className="flex flex-col gap-5">
                            {[
                                ["Username", userData?.username],
                                ["Email", userData?.email],
                                ["Phone", userData?.phone],
                                ["Gender", userData?.gender],
                                ["Height", userData?.height],
                                ["Place", `${userData?.state}, ${userData?.district}`],
                                ["Subscribed", userData?.subscribed ? "Yes" : "No"],
                                ["Account status", userData?.deleted ? "Deleted" : "Active"]
                            ].map(([label, value], index) => (
                                <div className="flex w-full items-center" key={index}>
                                    <p className="text-[18px] w-[140px]">{label}</p>
                                    <p className="text-[18px] font-semibold">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mx-auto">
                        <button 
                            className={`${userData?.isBlocked ? "bg-green-600" : "bg-red-600"} text-white rounded-lg px-4 py-2`}
                            onClick={() => handleBlockUser(userData?._id as string)}
                        >
                            {userData?.isBlocked ? "Unblock" :"Block"}
                        </button>
                    </div>
                </div>
                <ToastContainer/>
            </CustomModal>


            <div className="w-full flex items-center justify-end gap-5 py-4 px-5 bg-[#f2eade] rounded-b-lg">
                <p className="border px-3 rounded-md text-[18px] bg-white">{paginationCount}</p>
                <p className="text-[15px] font-semibold"> of {Math.ceil(totalItemsCount / 6)} pages</p>
                <IoIosArrowBack className="text-[18px] w-8 h-8 text-[#000] bg-white rounded-md border" onClick={() => handlePagination("left")} />
                <IoIosArrowForward className="text-[18px] w-8 h-8 text-[#000] bg-white rounded-md border" onClick={() => handlePagination("right")} />
            </div>
        </div>
    )
}


