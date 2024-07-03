import { motion } from "framer-motion";
import { StripeReqDataType } from "../../typings/Profile/professionDataType";



interface DraggablePaymentItemProps {
    payment: StripeReqDataType;
    index: number;
    daysLeftText: string;
    statusClass: string;
    formatDate: (dateString: string) => string;
    status: string;
}

const DraggablePaymentItem = ({ payment, index, daysLeftText, statusClass, formatDate, status }: DraggablePaymentItemProps) => {
    return (
        <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            drag="x" 
            dragConstraints={{ left: 0, right: -100}} 
            dragElastic={2} 
            className={`rounded-lg overflow-hidden w-full mx-auto ring-1 ring-gray-200`}
        >
            <div className={`relative flex flex-col md:flex-row items-center justify-between px-10 font-bold h-14 ${statusClass} bg-[#ebdbbd]`}>
                <p>
                    {status} ({daysLeftText})
                </p>
                <p>
                    {payment.pid}
                </p>
            </div>
            <div className="min-h-24 flex flex-col md:flex-row justify-center items-center md:justify-between text-[#000000bb] bg-[#fff] px-10 py-4">
                <div>
                    <p className="text-[35px] font-bold ">₹{payment.amount}</p>
                    <p className="font-semibold ">{payment.type} Subscription</p>
                </div>
                <div className="flex flex-col justify-center gap-5">
                    <p className="">Paid At {formatDate(payment.createdAt?.toString() || "")}</p>
                    <p className="">Expires At {formatDate(payment.expiresIn?.toString() || "")}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default DraggablePaymentItem;
