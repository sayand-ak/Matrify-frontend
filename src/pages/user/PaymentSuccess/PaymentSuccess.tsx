import { useParams } from "react-router-dom";
import "./paymentSuccess.css";


function PaymentSuccess() {
    const { type } = useParams();

    return (
        <div className="payment-success-container">
            <video autoPlay muted>
                <source src="/videos/Checkmark.mp4"  type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h1>Congrats! {type?.toUpperCase()} subscription added...</h1>
            <p>
                Your subscription is now activated! You can enjoy features like accessing the message feature, using voice calls, and sending match requests.
            </p>
            <a href="/home">Home</a>
        </div>
    );
}

export default PaymentSuccess;
