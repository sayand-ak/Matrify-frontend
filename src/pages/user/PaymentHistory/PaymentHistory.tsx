import { useEffect, useState } from "react";
import { UserFamily, UserProfession, UserProfile } from "../../../typings/Profile/professionDataType";


export function PaymentHistory ({userData}:{userData?: {
    profile?: UserProfile;
    family?: UserFamily;
    profession?: UserProfession;
}}) {
    const [activeExpirationDay, setActiveExpirationDay] = useState<number>(0);
    const [activeExpirationType, setActiveExpirationType] = useState<string>("");


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
    

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const paymentData = userData?.profile?.subscription?.slice().reverse();

    return (
        <>
        
        {!userData?.profile?.subscribed && (
            <div className="h-[100vh] w-full flex flex-col items-center pt-28">
                <img src="/src/assets/images/11110.jpg" alt="" className="h-[50%] w-[50%]"/>
                <p className="text-4xl font-custom font-bold text-[#817a7a81]">Not Subscribed Yet!</p>
                <a href="/user/payment" className="bg-[#E7C68F] text-white font-bold px-5 py-2 rounded-lg shadow-md mt-10">SUBSCRIBE</a>
            </div>
        )}

        {userData?.profile?.subscribed && (
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
                        const daysDifference : number|string|null = expiresInDate ? Math.ceil((expiresInDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;
                        const status = isExpired ? "Expired" : "Active";
                        const statusClass = isExpired ? "text-white bg-[#F6DCAC]" : "text-white bg-[#E7C68F]";
                        
                        let daysLeftText;

                        if(daysDifference){
                            daysLeftText = isExpired ? `${Math.abs(daysDifference)} days ago` : `${daysDifference} days left`;
                        }else{
                            daysLeftText = "today";
                        }

                        return (
                            <div className={`rounded-lg overflow-hidden mb-10 mx-auto ${status === "Expired" ?  "opacity-[0.6]" : ""}`} key={index}>
                                <div className={`relative flex flex-col md:flex-row items-center justify-between px-10 font-bold h-14 ${statusClass}`}>
                                   {
                                       status == "Active" && <img src="../src/assets/images/new_891446.png" alt="" className="absolute top-0 right-0 h-10 w-10"/>
                                   } 
                                    <p>
                                        {status} ({daysLeftText})
                                    </p>
                                    <p>
                                        {payment.pid}
                                    </p>
                                </div>
                                <div className="min-h-24 flex flex-col md:flex-row justify-center items-center md:justify-between bg-[#0000000e] px-10 py-4">
                                    <div>
                                        <p className="text-[40px] font-bold text-gray-600">₹{payment.amount}</p>
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
            </div>
        </div>
        )}

        </>
    )
}