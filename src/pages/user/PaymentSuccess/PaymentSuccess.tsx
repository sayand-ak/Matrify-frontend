import { useParams } from "react-router-dom"


function PaymentSuccess(){
    const { type } = useParams();

    const tickSvg = <svg width="26" height="14" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-1.28785e-05 10.4497L7.20947 17.6592L9.03603 15.8326L1.82654 8.62314L-1.28785e-05 10.4497Z" fill="black"/>
        <path d="M22.7001 2.16841L20.8735 0.341797L12.6893 8.53241L14.5159 10.359L22.7001 2.16841Z" fill="black"/>
        <path d="M28.1799 0.341797L14.5095 14.0057L9.12654 8.62275L7.29993 10.4494L14.5095 17.6589L30 2.16841L28.1799 0.341797Z" fill="#D39316"/>
    </svg>
    
    return (
        <div className="h-[100vh] bg-[#F5F2EC] overflow-hidden flex items-center justify-center">
            <div className="h-[70vh] w-[50vw] bg-white flex flex-col items-center justify-center rounded-[50px] shadow-lg gap-5">

                <img src="/src/assets/images/successPayment.png" alt="" className="h-[40%]" />

                <span className="font-semibold text-xl">Congrats {type?.toUpperCase()} subscription added...</span>

                <ul className="flex flex-col gap-3">
                    <h1 className="">Now you will be able to, </h1>
                    <li className="flex gap-2">
                        {tickSvg}
                        <p>Access the message feature </p>
                    </li>
                    <li className="flex gap-2">
                        {tickSvg}
                        <p>Use the voice call feature   </p>
                    </li>
                    <li className="flex gap-2">
                        {tickSvg}
                        <p>Send match request </p>
                    </li>
                </ul>
                
                <a href="/home" className="px-5 py-2 bg-[#e0b76f] text-white font-semibold rounded-lg shadow-sm">Home</a>
            
            </div>
        </div>
    )
}

export default PaymentSuccess;