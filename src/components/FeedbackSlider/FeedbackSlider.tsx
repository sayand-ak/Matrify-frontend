import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks/useTypedSelectors";
import { getAllFeedback } from "../../services/feedbackAPI";
import { FeedbackResponse } from "../../typings/feedback/feedback";
import "./Feedback.css";

export function FeedbackSlider() {
    const [feedbackList, setFeedbackList] = useState<FeedbackResponse[]>([]);
    const dispatch = useAppDispatch();
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await dispatch(getAllFeedback());
                if (response.payload.success) {
                    setFeedbackList(response.payload.data);
                }
                
            } catch (error) {
                console.log("Error in feedback slider: ", error);
                
            }
        };

        fetchFeedback();
    }, [dispatch]);

    const handleScroll = () => {
        if (sliderRef.current) {
            const itemWidth = sliderRef.current.clientWidth;
            const middleIndex = Math.floor(feedbackList.length / 2);
            const middleScrollLeft = middleIndex * itemWidth;
            sliderRef.current.scrollTo({
                left: middleScrollLeft,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full mx-auto relative overflow-hidden">
            {feedbackList.length > 0 && (
                <div>
                    <h1 className="h-20 flex items-center justify-center font-bold text-[30px] font-custom">Our Success Stories</h1>
                    <div className="flex justify-center items-center min-h-[30rem] overflow-x-auto shadow-md" ref={sliderRef}>
                        <div className="flex gap-10 w-fit-content" onClick={handleScroll}>
                            {feedbackList.map((feedback, index) => (
                                <div key={index} className={`feedbackCard max-w-sm px-4 py-10 bg-white rounded-lg text-center flex flex-col justify-center items-center hover:scale-110 transition-transform duration-300 ease-in-out`}>
                                    <div className="w-40 h-40 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${feedback.image})` }}></div>
                                    <p className="text-gray-600 mt-2">{feedback.story}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeedbackSlider;
