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
import { CustomModal } from "../../../components/modal/CustomModal";
import { useAppSelector } from "../../../hooks/useTypedSelectors";

export function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0)
  
    const userData = useAppSelector(state => state.user.user);

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

    useEffect(() => {
        if (!userData?.subscribed && !localStorage.getItem("subscriptionAlertDismissed")) {
          setIsModalOpen(true);
        }
      }, [userData]);
    
      const handleModalClose = () => {
        setIsModalOpen(false);
        localStorage.setItem("subscriptionAlertDismissed", "true");
      };

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
                    opacity: showNavbar ? '1' : '0',
                    transition: 'background-color 0.5s ease-in-out',
                }}
            >
                <Navbar page="home" />
            </motion.nav>

            <div className="h-[89vh]">
                <Banner />
            </div>

            <Carousal matchBase="profession" matchKey="education" matchData="Bachelor's Degree" />
            <Carousal matchBase="profile" matchKey="motherTongue" matchData="Malayalam" />

            <QuoteBanner />

            <Carousal matchBase="family" matchKey="martialStatus" matchData="Single" />
            <Carousal matchBase="profile" matchKey="state" matchData="Kerala" />

            <Footer />

            {/* <button onClick={handleLogout}>logout</button> */}

        <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <div 
                className="min-h-[50vh] w-[40vw] bg-[#e4e0d8] py-10 "
            >
                <div className=" h-full flex flex-col items-center ">
                    <h1 className="subscription-alert-heading text-[30px] text-[#0000009f] font-bold">Subscription Alert!!!</h1>
                    <img src="../src/assets/images/credit-card-concept-landing-page.png" className="h-[300px] w-auto" />
                    <p className="px-12 text-[18px]">You are not subscribed. Please subscribe to access our advance contact and matching features.</p>
                    <div className="flex w-full justify-around pt-10">
                        <a 
                        href="/payment"
                            className="bg-[#deba72] p-2 rounded-lg text-white font-semibold cursor-pointer shadow-sm"
                        >Subscribe</a>
                        <a 
                            className="border border[2px] border-[#deba72] text-[#deba72] font-semibold px-4 py-2 rounded-lg cursor-pointer"
                            onClick={handleModalClose}
                        >Cancel</a>
                    </div>
                </div>
            </div>

        </CustomModal>
        </div>
    )
}