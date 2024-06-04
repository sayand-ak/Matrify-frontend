// import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
// import { useAppDispatch } from "../../../hooks/useTypedSelectors";
// import { userLogout } from "../../../redux/slices/userSlices";
import { Banner } from "../../../components/Banner/Banner";
import { Carousal } from "../../../components/Carousal/Carousal";
import { Footer } from "../../../components/footer/Footer";
import "./Home.css";
import { QuoteBanner } from "../../../components/Banner/QuoteBanner";
import { motion } from "framer-motion";
import { navVariants } from "../../../utils/animations/animation2";
import { useEffect, useState } from "react";

export function Home(){
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0)
    // const dispatch = useAppDispatch();
    // const navigate = useNavigate()
    // function handleLogout() {
    //     dispatch(userLogout());
    //     navigate("/user/login");
    // }

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollY = window.scrollY;
    
          if (currentScrollY < 90) {
            setShowNavbar(true);
          } else {
            setShowNavbar(false);
          }
    
          setLastScrollY(currentScrollY);
        };
    
        window.addEventListener("scroll", handleScroll);
        // Cleanup function
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [lastScrollY]);

    return ( 
        <div className="home-container">

            <motion.nav
                variants={navVariants}
                initial="hidden"
                animate={"visible"}
                style={{
                    position: 'sticky',  
                    top: 0,
                    width: '100%',
                    zIndex: 1000, 
                    opacity: showNavbar ? '1': '0',
                    transition: 'background-color 0.5s ease-in-out',
                }}
            >
                <Navbar page="home"/>
            </motion.nav>
            
            <div className="h-[89vh]">
                <Banner/>
            </div>
            
            <Carousal matchBase="profession" matchKey="education" matchData="Bachelor's Degree"/>
            <Carousal matchBase="profile" matchKey="motherTongue" matchData="Malayalam"/>

            <QuoteBanner/>
            
            <Carousal matchBase="family" matchKey="martialStatus" matchData="Single"/>
            <Carousal matchBase="profile" matchKey="state" matchData="Kerala"/>

            <Footer/>

            {/* <button onClick={handleLogout}>logout</button> */}
        </div>
    )
}