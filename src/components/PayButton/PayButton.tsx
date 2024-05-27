

export function PayButton({handleSubscriptionPayment}: {handleSubscriptionPayment: () => void}) {

    return (
        <button 
            className="bg-[#D2B480] text-lg px-4 py-2 rounded-lg text-white shadow-lg"
            onClick={handleSubscriptionPayment}
        >Choose</button>
    )
}