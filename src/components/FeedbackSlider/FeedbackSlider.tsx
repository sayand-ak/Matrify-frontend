import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks/useTypedSelectors";
import { getAllFeedback } from "../../services/feedbackAPI";
import { FeedbackResponse } from "../../typings/feedback/feedback";
import "./Feedback.css";

export function FeedbackSlider() {
    const [feedbackList, setFeedbackList] = useState<FeedbackResponse[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
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

    useEffect(() => {
        const handleScroll = () => {
            if (sliderRef.current) {
                const itemWidth = sliderRef.current.scrollWidth / feedbackList.length;
                const middleIndex = Math.floor(feedbackList.length / 2);
                const middleScrollLeft = middleIndex * itemWidth;

                sliderRef.current.scrollTo({
                    left: middleScrollLeft,
                    behavior: "smooth",
                });
            }
        };

        handleScroll();
    }, [feedbackList]);

    const handleScrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: -sliderRef.current.clientWidth,
                behavior: "smooth",
            });
        }
    };

    const handleScrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: sliderRef.current.clientWidth,
                behavior: "smooth",
            });
        }
    };

    const handleScrollPosition = () => {
        if (sliderRef.current) {
            const itemWidth = sliderRef.current.clientWidth / feedbackList.length;
            const scrollLeft = sliderRef.current.scrollLeft;
            const newIndex = Math.round(scrollLeft / itemWidth);
            setCurrentIndex(newIndex);
        }
    };

    useEffect(() => {
        const scrollElement = sliderRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScrollPosition);
            return () => {
                scrollElement.removeEventListener('scroll', handleScrollPosition);
            };
        }
    }, [feedbackList]);

    return (
        <div className="w-full mx-auto relative overflow-hidden">
            {feedbackList.length > 0 && (
                <div>
                    <h1 className="h-20 flex items-center justify-center font-bold text-[30px] font-custom">Our Success Stories</h1>
                    <div className="flex items-center min-h-[35rem] overflow-x-auto shadow-md" ref={sliderRef}>
                        <button className="scroll-button" onClick={handleScrollLeft}>{"<"}</button>
                        <div className="flex gap-10 w-full">
                            {feedbackList.map((feedback, index) => (
                                <div
                                    key={index}
                                    className={`feedbackCard max-w-sm px-4 py-10 bg-white rounded-lg text-center flex flex-col justify-center items-center transition-transform duration-300 ease-in-out ${index === currentIndex ? 'transform scale-110' : ''}`}
                                    style={{ backgroundImage: `url(${feedback.image})`, backgroundSize: 'cover' }}
                                >
                                    <p className="text-gray-600 mt-2">{feedback.story}</p>
                                </div>
                            ))}
                        </div>
                        <button className="scroll-button" onClick={handleScrollRight}>{">"}</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeedbackSlider;
