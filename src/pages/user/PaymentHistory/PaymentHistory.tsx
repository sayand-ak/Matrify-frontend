import { useEffect, useState } from "react";
import { UserFamily, UserProfession, UserProfile } from "../../../typings/Profile/professionDataType";


export function PaymentHistory ({userData}:{userData:Array<UserProfile & UserFamily & UserProfession> | undefined}) {
    const [activeExpirationDay, setActiveExpirationDay] = useState<number>(0);
    const [activeExpirationType, setActiveExpirationType] = useState<string>("");


    useEffect(() => {
        if (userData?.[0]?.subscription) {
            const lastSubscription = userData[0].subscription.slice(-1)[0];
            if (lastSubscription?.expiresIn) {
                const expiresInDate = new Date(lastSubscription.expiresIn);
                setActiveExpirationDay(Math.ceil((expiresInDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
                setActiveExpirationType(lastSubscription.type)
            }
        }
    }, [userData]);
    

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const paymentData = userData?.[0].subscription?.slice().reverse();

    return (
        <>
        {!userData?.[0].subscribed && (
            <div className="h-[100vh] w-full flex flex-col items-center pt-28">
                <img src="/src/assets/images/11110.jpg" alt="" className="h-[50%] w-[50%]"/>
                <p className="text-4xl font-custom font-bold text-[#817a7a81]">Not Subscribed Yet!</p>
                <a href="/user/payment" className="bg-[#E7C68F] text-white font-bold px-5 py-2 rounded-lg shadow-md mt-10">SUBSCRIBE</a>
            </div>
        )}

        {userData?.[0].subscribed && (
            <div className="w-full relative">
            {
                (activeExpirationDay <= 5 && activeExpirationDay > 0) && 
                <div className="flex bg-red-400 items-center justify-between w-full px-14 min-h-20">
                    <p className="text-[18px] font-semibold text-white">
                        Your {activeExpirationType} subscription expires in {activeExpirationDay} days
                    </p>
                    <a href="/user/payment" className="bg-[#E7C68F] text-white font-bold px-5 py-2 rounded-lg shadow-md">SUBSCRIBE</a>
                </div>
            }
            {
                (activeExpirationDay < 0) && 
                <div className="flex bg-red-400 items-center justify-between w-full px-14 min-h-20">
                    <p className="text-[18px] font-semibold text-white">
                        Your {activeExpirationType} subscription expired {Math.abs(activeExpirationDay)} before
                    </p>
                    <a href="/user/payment" className="bg-[#E7C68F] text-white font-bold px-5 py-2 rounded-lg shadow-md">SUBSCRIBE</a>
                </div>
            }
            <div className="w-full p-12 h-[90vh] overflow-scroll">
                    {paymentData?.map((payment, index) => {
                        const expiresInDate = new Date(payment.expiresIn?.toString() || 0);
                        const isExpired = expiresInDate.getTime() < Date.now();
                        const daysDifference = expiresInDate ? Math.ceil((expiresInDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;
                        const status = isExpired ? "Expired" : "Active";
                        const statusClass = isExpired ? "text-white bg-red-300" : "text-white bg-green-300";
                        const daysLeftText = isExpired ? `${Math.abs(daysDifference || 1)} days ago` : `${daysDifference} days left`;

                        return (
                            <div className="shadow-lg rounded-lg overflow-hidden mb-10" key={index}>
                                <div className={`flex items-center justify-between px-10 font-bold h-14 ${statusClass}`}>
                                    <p>
                                        {status} ({daysLeftText})
                                    </p>
                                    <p>
                                        {payment.pid}
                                    </p>
                                </div>
                                <div className="min-h-24 flex justify-between bg-[#0000000e] px-8 py-4">
                                    <div>
                                        <p className="text-[50px] font-bold text-gray-600">₹{payment.amount}</p>
                                        <p className="font-semibold text-gray-600">{payment.type} Subscription</p>
                                    </div>
                                    <div className="flex flex-col justify-center gap-5">
                                        <p className="font-semibold text-gray-600">Paid At {formatDate(payment.createdAt?.toString() || "")}</p>
                                        <p className="font-semibold text-gray-600">Expires At {formatDate(payment.expiresIn?.toString() || "")}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {/* <table className="w-full overflow-hidden bg-white rounded-lg shadow-md min-h-[5rem] max-h-[20rem]">
        <thead className="bg-gray-200">
            <tr className="text-left">
                <th className="p-2">Payment ID</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Payment Type</th>
                <th className="p-2">Paid At</th>
                <th className="p-2">Expires At</th>
                <th className="p-2">Status</th>
            </tr>
        </thead>
        <tbody className="relative">
            <img src="../src/assets/images/new_891446.png" className="h-10 w-10 absolute right-0 top-0" alt="" />
            {paymentData?.map((payment) => {
                 const expiresInDate = new Date(payment.expiresIn?.toString() || 0);
                 const isExpired = expiresInDate.getTime() < Date.now();
                 const daysDifference = expiresInDate ? Math.ceil((expiresInDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;
                 const status = isExpired ? "Expired" : "Active";
                 const statusClass = isExpired ? "text-red-500" : "text-green-500";
                const daysLeftText = isExpired ? `${Math.abs(daysDifference || 1)} days ago` : `${daysDifference} days left`;


                return(
                    
                    <>
                        <tr key={payment.pid} className="h-[80px]">
                            <td className="p-2">{payment.pid}</td>
                            <td className="p-2">{payment.amount}</td>
                            <td className="p-2">{payment.type}</td>
                            <td className="p-2">{formatDate(payment.createdAt?.toString() || "")}</td>
                            <td className="p-2">{formatDate(payment.expiresIn?.toString() || "")}</td>
                            <td className={`p-2 font-semibold ${statusClass}`}>{status} ({daysLeftText})</td>
                        </tr>
                    </>
                )
            })}
        </tbody>
    </table> */}
            </div>
        </div>
        )}

        </>
    )
}