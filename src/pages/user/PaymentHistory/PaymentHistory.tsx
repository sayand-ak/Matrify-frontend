import { useEffect, useState } from "react";
import { UserFamily, UserProfession, UserProfile } from "../../../typings/Profile/professionDataType";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import DraggablePaymentItem from "../../../components/dragablePaymentItem/DragablePaymentItem";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { checkRefundAvailability, refundSubscription } from "../../../services/userAPI";
import { CustomModal } from "../../../components/modal/CustomModal";
import { BsInfoCircle } from "react-icons/bs";
import showToast from "../../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";


interface RefundData {
    balanceAmount: number;
    refundType: string;
}


export function PaymentHistory({ userData }: {
    userData?: {
        profile?: UserProfile;
        family?: UserFamily;
        profession?: UserProfession;
    }
}) {
    const [activeExpirationDay, setActiveExpirationDay] = useState<number>(0);
    const [activeExpirationType, setActiveExpirationType] = useState<string>("");
    const [refundModalOpen, setRefundModalOpen] = useState(false);
    const [refundData, setRefundData] = useState<RefundData | null>(null);
    const [showRefundPolicies, setShowRefundPolicies] = useState(false);
    const [alertDiv, setAlertDiv] = useState(false);

    const dispatch = useAppDispatch();

    const navigate = useNavigate()


    useEffect(() => {
        if (userData?.profile?.subscription) {
            const lastSubscription = userData.profile?.subscription.slice(-1)[0];
            if (lastSubscription?.expiresIn) {
                const expiresInDate = new Date(lastSubscription.expiresIn);
                setActiveExpirationDay(Math.ceil((expiresInDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
                setActiveExpirationType(lastSubscription.type)
            }
        }

    }, [userData]);

    async function handleRefundClick() {
        try {
            const refundData = await dispatch(checkRefundAvailability());
            if (refundData.payload.data) {
                setRefundData(refundData.payload.data);
            } else {
                alert("refund api error")
                window.location.reload();
            }
            setRefundModalOpen(true);
        } catch (error) {
            navigate("/500");
        }
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const handleInfoClick = () => {
        setShowRefundPolicies(prevState => !prevState);
    };

    const handleRefundSubmit = async(pid: string) => {
        try {
            if(refundData?.balanceAmount) {
                const response = await dispatch(refundSubscription({amount: refundData?.balanceAmount,pid: pid}));
                if(response.payload.data) {
                    showToast("success", "Refund Successful", () => {
                        window.location.reload();
                    });
                } else {
                    showToast("error", "Refund Failed", () => {
                        window.location.reload();
                    })
                }
            } 
            
        } catch (error) {
            navigate("/500");
        }
    }

    const paymentData = userData?.profile?.subscription?.slice().reverse();

    return (
        <>

            {userData?.profile?.subscription && userData?.profile?.subscription.length == 0 ? (
                <div className="h-[100vh] w-full flex flex-col items-center pt-28">
                    <img src="/images/11110.jpg" alt="" className="h-[50%] w-[50%]" />
                    <p className="text-4xl font-custom font-bold text-[#817a7a81]">Not Subscribed Yet!</p>
                    <a href="/payment" className="bg-[#E7C68F] text-white font-bold px-5 py-2 rounded-lg shadow-md mt-10">SUBSCRIBE</a>
                </div>
            )
            :
            (
                <div className="w-full relative">
                    
                    {activeExpirationDay <= 0 && (
                        <div className="bg-red-100 border-l-4 border-red-700 text-red-700 p-4 flex items-center justify-between w-full px-14 min-h-20" role="alert">
                            <p className="text-[18px] font-semibold text-red-700 ">
                                {activeExpirationDay === 0
                                    ? `Your ${activeExpirationType} subscription expired today`
                                    : `Your ${activeExpirationType} subscription expired ${Math.abs(activeExpirationDay)} day(s) ago`
                                }
                            </p>
                            <a href="/payment" className="bg-[#c9ac7a] text-white font-bold px-5 py-2 rounded-lg shadow-md">SUBSCRIBE</a>
                        </div>
                    )}

                    {activeExpirationDay > 0 && (
                        <div className="bg-red-100 border-l-4 border-red-700 text-red-700 p-4 flex items-center justify-between w-full px-14 min-h-20" role="alert">
                            <p className="text-[16px] font-semibold">
                                Your {activeExpirationType} subscription expires in {activeExpirationDay} days
                            </p>
                            <a href="/payment" className="bg-[#c9ac7a] text-white font-bold px-5 py-2 rounded-lg shadow-md">SUBSCRIBE</a>
                        </div>
                    )}

                    <div className="w-full p-12 h-[90vh] overflow-scroll no-scrollbar">
                        {paymentData?.map((payment, index) => {
                            const expiresInDate = new Date(payment.expiresIn?.toString() || 0);
                            const isExpired = expiresInDate.getTime() < Date.now();
                            const daysDifference: number | string | null = expiresInDate ? Math.ceil((expiresInDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;
                            const statusClass = isExpired ? "border-b-[1px] bg-[#fff]" : "text-black border-b-[1px] bg-[#fff]";

                            let daysLeftText;

                            if (daysDifference) {
                                daysLeftText = isExpired ? `${Math.abs(daysDifference)} days ago` : `${daysDifference} days left`;
                            } else {
                                daysLeftText = "today";
                            }

                            return (
                                payment.status === "active" ? (

                                    <div key={index}>
                                        <div
                                            className="w-full flex items-center justify-end text-[13px] pr-3 pb-1 font-semibold text-[#b6b5b5] cursor-pointer"
                                        >
                                            <AiOutlineDoubleLeft />
                                            <p>swipe</p>
                                        </div>

                                        <div className="flex mb-10 relative z-50 ring-1 ring-gray-200 bg-[#f65555] rounded-lg overflow-hidden">
                                            <DraggablePaymentItem
                                                key={index}
                                                payment={payment}
                                                index={index}
                                                daysLeftText={daysLeftText}
                                                statusClass={statusClass}
                                                formatDate={formatDate}
                                            />
                                            <button
                                                className="absolute right-0 top-0 h-full w-[100px] -z-10 bg-[#f65555] rounded-r-lg text-white font-semibold font-rubik"
                                                onClick={handleRefundClick}
                                            >
                                                Refund
                                            </button>
                                        </div>

                                        <div className="flex justify-center items-center pb-10 text-[#808080]">
                                            <span className="font-semibold text-[14px]">Credit history</span>
                                            <hr className="flex-grow h-0.5 mx-5" />
                                        </div>


                                        {/* refund modal.... */}
                                        <CustomModal isOpen={refundModalOpen} onRequestClose={() => setRefundModalOpen(false)}>
                                            <div
                                                className="h-[400px] w-full relative"
                                                style={{ backgroundImage: "url(/images/11060.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
                                            >
                                                <button className="absolute right-5 top-5" onClick={handleInfoClick}>
                                                    <BsInfoCircle className="text-[20px]" />
                                                </button>

                                                {showRefundPolicies &&
                                                    <div className="absolute top-[12%] right-5 transform  text-black text-sm px-8 py-4 bg-[#EAF3FA] rounded-lg shadow-lg">
                                                        <h2 className="text-lg font-semibold mb-2">Matrify Refund Policies:</h2>

                                                        <h3 className="text-md font-medium mb-1 underline">Weekly:</h3>
                                                        <ol className="list-decimal list-inside mb-4">
                                                            <li>If match interest interaction or other interaction features are used, no refund is allowed.</li>
                                                            <li>If no feature is used, the full amount is refunded.</li>
                                                        </ol>

                                                        <h3 className="text-md font-medium mb-1 underline">Monthly:</h3>
                                                        <ol className="list-decimal list-inside mb-4">
                                                            <li>If no feature is used, the full amount is refunded.</li>
                                                            <li>If any of the features is used, the subscription can be switched to weekly.</li>
                                                        </ol>

                                                        <h3 className="text-md font-medium mb-1 underline">Yearly:</h3>
                                                        <ol className="list-decimal list-inside">
                                                            <li>If no feature is used, the full amount is refunded.</li>
                                                            <li>If any of the features is used, the subscription can be switched to monthly or weekly.</li>
                                                        </ol>
                                                    </div>

                                                }

                                            </div>

                                            <div className="w-[40vw] min-h-[30vh] flex flex-col items-center gap-5 py-5">
                                                <h1 className="text-[25px] font-bold">Subscription Refund</h1>

                                                {refundData?.refundType === "no refund" && (
                                                    <div className="text-[17px] px-12 flex flex-col items-center gap-5">
                                                        <p>Sorry you are not eligible for refund due to the use of interaction features. Please read the terms and conditions. Contact us for further queries.</p>
                                                        <button className="w-fit border-[1px] rounded-lg px-5 py-2 font-semibold bg-[#C8AC79] text-white" onClick={() => setRefundModalOpen(false)}>Back</button>
                                                    </div>
                                                )}

                                                {refundData?.refundType === "partial refund" && (
                                                    <div className="text-[17px] px-12 flex flex-col items-center gap-5">
                                                        <p>Since you have used interaction features, you are eligible for a partial refund..₹{refundData?.balanceAmount} will be added to your wallet.</p>
                                                        <div className="flex justify-between w-full">
                                                            <button
                                                                className="w-fit border-[1px] rounded-lg px-5 py-2 font-semibold bg-[#C8AC79] text-white"
                                                            // onClick={() => addToWallet()}
                                                            >
                                                                Add to Wallet
                                                            </button>
                                                            <button
                                                                className="w-fit border-[1px] rounded-lg px-5 py-2 font-semibold text-[#C8AC79] border-[#C8AC79]"
                                                                onClick={() => setRefundModalOpen(false)}
                                                            >
                                                                Back
                                                            </button>
                                                        </div>

                                                    </div>
                                                )}

                                                {refundData?.refundType === "full refund" && (
                                                    <div className="text-[17px] px-12 flex flex-col items-center gap-5">
                                                        <p>Since you have not used any interaction features you are eligible for a full refund.₹{refundData?.balanceAmount} will be added to your wallet.</p>
                                                        <div className="flex justify-between w-full">
                                                            <button
                                                                className="w-fit border-[1px] rounded-lg px-5 py-2 font-semibold bg-[#C8AC79] text-white"
                                                                onClick={() => setAlertDiv(true)}
                                                            >
                                                                Add to Wallet
                                                            </button>
                                                            <button
                                                                className="w-fit border-[1px] rounded-lg px-5 py-2 font-semibold text-[#C8AC79] border-[#C8AC79]"
                                                                onClick={() => {
                                                                    setAlertDiv(false)
                                                                    setRefundModalOpen(false)
                                                                }}
                                                            >
                                                                Back
                                                            </button>
                                                        </div>

                                                        {alertDiv && (
                                                            <div className="flex justify-between items-center text-[15px] px-5 w-full bg-amber-100 border-l-4 border-yellow-700 min-h-[60px] shadow-sm mt-6">
                                                                <p className="font-semibold text-yellow-700">
                                                                    Are you sure you want a refund?
                                                                </p>
                                                                <div className="space-x-3">
                                                                    <button 
                                                                        className="border px-4 py-1 rounded-md hover:bg-gray-200 transition duration-300"
                                                                        onClick={() => handleRefundSubmit(payment.pid)}
                                                                    >
                                                                        Yes
                                                                    </button>
                                                                    <button 
                                                                        className="px-4 py-1 rounded-md bg-gray-200 hover:bg-blue-300 transition duration-300 font-medium"
                                                                        onClick={() => {
                                                                            setRefundModalOpen(false)
                                                                            setAlertDiv(false);
                                                                        }}
                                                                    >
                                                                        No
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}

                                                    </div>
                                                )}

                                            </div>
                                        </CustomModal>
                                    </div>

                                ) : (
                                    <div className={`rounded-lg overflow-hidden mb-10 mx-auto ring-1 ring-gray-200 opacity-[0.6]`} key={index}>
                                        <div className={`relative flex flex-col md:flex-row items-center justify-between px-10 font-bold h-14 ${statusClass} text-[#000000bb] bg-[#eeddbc4e]`}>
                                            <p>
                                                {payment.status} ({daysLeftText})
                                            </p>
                                            <p>
                                                {payment.pid}
                                            </p>
                                        </div>
                                        <div className="min-h-24 flex flex-col md:flex-row justify-center items-center md:justify-between text-[#000000bb] bg-[#fff] px-10 py-4">
                                            <div>
                                                <p className="text-[30px] font-bold ">₹{payment.amount}</p>
                                                <p className="font-semibold ">{payment.type} Subscription</p>
                                            </div>
                                            <div className="flex flex-col text-[16px] justify-center gap-5">
                                                <p className="">Paid At {formatDate(payment.createdAt?.toString() || "")}</p>
                                                <p className="">Expires At {formatDate(payment.expiresIn?.toString() || "")}</p>
                                            </div>
                                        </div>

                                    </div>
                                )
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}