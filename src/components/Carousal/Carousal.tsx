import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { CarousalItems } from "../CarousalItems/CarousalItems";
import "./Carousal.css";
import { useRef, useState, useEffect, useCallback } from "react";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { UserData } from "../../typings/user/userTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { getMatches } from "../../services/userAPI";
import { ContentLoader } from "../loader/ContentLoader";
import { motion } from "framer-motion";
import { containerVariants } from "../../utils/animations/animation1";
import { UserProfile } from "../../typings/Profile/professionDataType";


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
    const curUser = useAppSelector(state => state.user.user);
    


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
        if (!isLoaded) {
            try {
                const response = await dispatch(getMatches({matchBase, matchKey, matchData}));
                const allData = response.payload.data;
                const filteredData = allData.filter((user: UserProfile) => 
                    !curUser?.blockedUsers?.some(blockedUser => blockedUser.user === user._id)
                );
                setData(filteredData);
                setIsLoaded(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    }, [dispatch, matchBase, matchData, matchKey, isLoaded, curUser]);
    

    
    const ref = useIntersectionObserver(fetchData, { threshold: 0.5 });

    return (
        <div 
            className="flex flex-col justify-center gap-5 min-h-[25rem] relative bg-[#F5F2EC] w-full overflow-hidden"
            ref={ref}
        >
            <div className="flex w-full items-center justify-between px-[5rem] h-10">
                <h1 className="h-fit text-[20px] font-semibold">{matchKey.toUpperCase()}</h1>
                <a href="#" className="flex items-center gap-2 text-[18px] font-semibold">
                    view all <MdKeyboardDoubleArrowRight />
                </a>
            </div>
            {
                isLoaded ? (
                    <div
                        className="carousal-container flex gap-10 w-fit pl-20"
                        style={{
                            transition: "transform 1s",
                            transform: `translateX(${translateValue}%)`,
                        }}
                        ref={carousalRef}
                    >
                        {
                            data.map((user) => (
                                
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }} 
                                >   
                                    <CarousalItems data={user}/>
                                </motion.div>
                                
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
