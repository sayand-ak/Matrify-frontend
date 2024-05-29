import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { CarousalItems } from "../CarousalItems/CarousalItems";
import "./Carousal.css";
import { useRef, useState, useEffect } from "react";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";

export function Carousal() {
    const carousalRef = useRef<HTMLDivElement>(null);
    const [translateValue, setTranslateValue] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    

    const handleArrowClick = (direction: string) => {
        const maxTranslate = isSmallScreen ? -75 : -20;
        const step = 25

        if (direction === "left" && translateValue < 0) {
            setTranslateValue((prev) => prev + step);
        } else if (direction === "right" && translateValue > maxTranslate) {
            setTranslateValue((prev) => prev - step);
        }
    };

    return (
        <div className="flex flex-col justify-center gap-5 min-h-[25rem] relative bg-[#F5F2EC] w-full">
            <div className="flex w-full items-center justify-between px-[5rem] h-10">
                <h1 className="h-fit text-[20px] font-semibold">Category</h1>
                <a href="#" className="flex items-center gap-2 text-[18px] font-semibold">
                    view all <MdKeyboardDoubleArrowRight />
                </a>
            </div>
            <div
                className="carousal-container flex gap-10 w-fit pl-20"
                style={{
                    transition: "transform 1s",
                    transform: `translateX(${translateValue}%)`,
                }}
                ref={carousalRef}
            >
                <CarousalItems />
                <CarousalItems />
                <CarousalItems />
                <CarousalItems />
                <CarousalItems />
                <CarousalItems />
            </div>

            <div className="absolute top-[50%] px-10 flex justify-between w-full">
                <button 
                    onClick={() => handleArrowClick("left")}
                >
                    <IoMdArrowDropleftCircle className="text-[5rem] text-transparent hover:text-[#00000043]" />
                </button>
                <button onClick={() => handleArrowClick("right")}>
                    <IoMdArrowDroprightCircle className="text-[5rem] text-transparent hover:text-[#00000043]" />
                </button>
            </div>
        </div>
    );
}
