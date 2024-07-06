import { RiCloseFill } from "react-icons/ri";
import { GrStripe } from "react-icons/gr";
import { IoWallet } from "react-icons/io5";
import { motion } from "framer-motion";



interface PaymentSelectorProps {
    setShowPaymentOption: (val:boolean) => void;
    setSelectedMethod: (val:string) => void;
    selectedMethod: string;
    submitSelectedPayment: () => void
}


const PaymentSelector = ({setShowPaymentOption, setSelectedMethod, selectedMethod, submitSelectedPayment}: PaymentSelectorProps) => {

    const handleMethodChange = (method:string) => {
        setSelectedMethod(method);
    };

    return (
        <div className="absolute top-0 h-[125vh] w-full bg-[#000000b9] flex justify-center">

            <motion.div 
                className="max-w-md fixed top-0 mx-auto p-6 bg-white rounded-xl shadow-md h-fit mt-[8%]"
                initial={{ y: "100vh" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 50 }}
            >     
                <div>
                    <img src="../src/assets/images/payment_select.jpg" alt="" />
                    <RiCloseFill 
                        className="text-black absolute top-5 right-5 text-[30px]"
                        onClick={() => setShowPaymentOption(false)}
                    />

                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Select Payment Method</h2>
                    <div className="flex flex-col space-y-4">
                        <div
                            className={`flex gap-2 items-center p-4 border rounded-lg cursor-pointer ${selectedMethod === 'online' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                            onClick={() => handleMethodChange('online')}
                        >
                            <GrStripe className="text-[25px]"/>
                            <span className="text-lg font-medium">Online</span>
                        </div>
                        <div
                            className={`flex gap-2 items-center p-4 border rounded-lg cursor-pointer ${selectedMethod === 'wallet' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                            onClick={() => handleMethodChange('wallet')}
                        >
                            <IoWallet className="text-[25px]"/>

                            <span className="text-lg font-medium">Wallet</span>
                        </div>
                    </div>
                    {selectedMethod && (
                        <div className="mt-6">
                            <button 
                                className="w-full bg-[#D2B480] hover:bg-[#a88f64] text-white py-2 rounded-lg font-semibold"
                                onClick={submitSelectedPayment}
                            >
                                Continue with {selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)}
                            </button>
                        </div>
                    )}
                </div>           
            </motion.div>
        </div>
    );
};

export default PaymentSelector;
