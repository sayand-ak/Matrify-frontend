import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { CarousalItems } from "../CarousalItems/CarousalItems";
import "./Carousal.css";
import { useRef, useState, useEffect, useCallback } from "react";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { UserData } from "../../typings/user/userTypes";
import { useAppDispatch } from "../../hooks/useTypedSelectors";
import { getMatches } from "../../services/userAPI";
import { ContentLoader } from "../loader/ContentLoader";


interface HomeProp {
    matchBase: string;
    matchKey: string;
    matchData: string
}

export function Carousal({ matchBase, matchKey, matchData }: HomeProp) {
    const carousalRef = useRef<HTMLDivElement>(null);
    const [translateValue, setTranslateValue] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    const [data, setData] = useState<UserData[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useAppDispatch();
    


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

    const fetchData = useCallback(async () => {
        //change here
        if (!isLoaded) {
            try {
                
                const response = await dispatch(getMatches({matchBase, matchKey, matchData}));
                if(response.payload.data.length > 0) {
                    const data = response.payload.data;
                    console.log(data);
                    
                    
                    setData(data);
                    setIsLoaded(true);
                } else {
                    setData([])
                }
            } catch (error) {
                console.log("error")
            }
        }
    }, [dispatch, matchBase, matchData, matchKey, isLoaded]);
    

    
    const ref = useIntersectionObserver(fetchData);

    
    
    if (data.length <= 0 && !isLoaded) {
        return (
            <div className="skeleton-container ">
                <div className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-sub-text"></div>
                </div>
                <div className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-sub-text"></div>
                </div>
                <div className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-sub-text"></div>
                </div>
                <div className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-sub-text"></div>
                </div>
                <div className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-sub-text"></div>
                </div>
            </div>
        ); // Return null to render nothing when data is empty and loaded
    }

    return (
        <div 
            className={`carousal-container-child ${data.length > 0 ? "h-[25rem]" : "h-0"} relative w-full overflow-hidden flex flex-col justify-center gap-5`}
            ref={ref}
        >
            <div className="flex w-full items-center justify-between px-5 md:px-[5rem] h-10">
                <h1 className="h-fit text-[20px] font-semibold">{matchKey.toUpperCase()}</h1>
                <a href={`/viewAllMatches/${matchBase}/${matchKey}/${matchData}`} className="flex items-center gap-2 text-[18px] font-semibold">
                    view all <MdKeyboardDoubleArrowRight />
                </a>
            </div>

            {
                data.length > 0 && (
                    isLoaded ? (
                        <div
                            className="carousal-container w-fit pl-20"
                            style={{
                                transition: "transform 0.5s",
                                transform: `translateX(${translateValue}%)`,
                            }}
                            ref={carousalRef}
                        >
                            {
                                data.slice(0, 5).map((user, index) => (
                                    
                                    <CarousalItems data={user} index={index}/>  
                                ))
                            }
                        </div>
                    ) : (
                        <div
                        className="carousal-container flex gap-10 w-fit pl-20"
                        >
                            <ContentLoader/>
                            <ContentLoader/>
                            <ContentLoader/>
                            <ContentLoader/>
                            <ContentLoader/>
                        </div>
                    )
                ) 
            }
           

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
