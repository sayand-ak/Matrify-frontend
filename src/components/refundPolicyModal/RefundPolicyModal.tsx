import React, { SetStateAction } from 'react';
import { CustomModal } from "../modal/CustomModal";

interface RefundPolicyModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    isOpenType: string;
    onRequestClose: () => void;
}

const refundPolicies = {
    weekly: [
        "No refund is allowed if any match interest interaction or other interaction features are used.",
        "A full refund is provided if no features are used."
    ],
    monthly: [
        "A full refund is provided if no features are used.",
        "You can switch to a weekly subscription if any features are used with in a week."
    ],
    yearly: [
        "A full refund is provided if no features are used.",
        "You can switch to a monthly or weekly subscription if any features are used with in a month."
    ]
};

const RefundPolicyModal: React.FC<RefundPolicyModalProps> = ({ isOpen, setIsOpen, isOpenType, onRequestClose }) => {
    const policies = refundPolicies[isOpenType as keyof typeof refundPolicies];

    return (
        <CustomModal isOpen={isOpen} onRequestClose={onRequestClose}>
            <div className="flex flex-col items-center gap-5 py-10">
                <h1 className="font-bold text-2xl">Terms and Policies</h1>
                {
                policies && (
                    <div className="w-3/4 text-left">
                        <h2 className="font-semibold text-xl mb-5">For {isOpenType} subscription</h2>
                        <ol className="list-decimal ml-5 space-y-2">
                            {policies.map((policy, index) => (
                                <li key={index}>{policy}</li>
                            ))}
                        </ol>
                    </div>
                )}
                <button 
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => setIsOpen(false)}
                >
                    Close
                </button>
            </div>
        </CustomModal>
    );
};

export default RefundPolicyModal;
