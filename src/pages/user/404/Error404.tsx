import { useNavigate } from "react-router-dom"

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <>
            <div
                className="flex flex-col justify-end items-center h-[80vh]"
                style={{ backgroundImage: "url(/images/404-img.png)", backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
            >
                <div className="bg-white bg-opacity-75 rounded-lg text-center">
                    <p className="text-lg mb-4">The page you are trying to reach doesn't exist. It might have been moved or deleted. Please check the URL or go back to the homepage.</p>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        onClick={() => navigate(-1)}
                    >
                    Go back
                    </button>
                </div>
            </div>
        </>
    )
}

export default Error404
