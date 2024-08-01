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
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { userProfile } from "../../../services/userAPI";
import { UserFamily, UserProfession, UserProfile } from "../../../typings/Profile/professionDataType";
import { useNavigate } from "react-router-dom";
import { LandingCard } from "../../../components/landingCard/LandingCard";
import { LandingCardProps } from "../../../typings/landing/LandingCardTypes";

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [user, setUser] = useState<{ profile?: UserProfile; family?: UserFamily; profession?: UserProfession }>();
    const navigate = useNavigate()

    const dispatch = useAppDispatch();

    const userData = useAppSelector(state => state.user.user);

    const verifyImg: LandingCardProps = {
        img: "/images/shield_1161388.png",
        caption: "100% Verified Profiles"
    };
    const securityImg: LandingCardProps = {
        img: "/images/security_11632064.png",
        caption: "Enhanced Privacy Settings"
    };
    const matchImg: LandingCardProps = {
        img: "/images/circuit_677389.png",
        caption: "Intelligent Matchmaking System"
    };

    const images:LandingCardProps[] = [ verifyImg, securityImg, matchImg ]; 

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

      useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userData?._id) {
                    const response = await dispatch(userProfile(userData?._id || ""));
    
                    if (response.payload.success) {
                        const data = response.payload.data;
    
                        setUser({
                            profile: data[0],
                            profession: data[1],
                            family: data[2],
                        })
    
                    } else {
                        alert("profile api calling error")
                    }
                }
            } catch (error) {
                navigate("/500");
            }
        }
        fetchUserData();

    }, [userData?._id, dispatch, userData, user?.profile?._id]);

    return (
        <div className="home-container font-rubik">

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
                    transition: 'background-color 0.5s ease-in',
                }}
            >
                <Navbar page="home" />
            </motion.nav>

            <div className="h-[89vh]">
                <Banner />
            </div>

            <div className="features-cards">
                <div className="feature-card-heading flex justify-center items-center mx-auto h-[13vh] rounded-b-[40px] md:w-1/4 bg-[#EFECE6]">
                    <h1 className="text-3xl md:text-4xl font-rubik">Why  MATRIFY ?</h1>
                </div>

                <div className="flex items-center justify-center">
                    <div className="md:w-full lg:w-[80%] min-h-[60vh] flex flex-col gap-8 items-center  md:flex-row justify-around py-10">
                    {images.map((image, index) => (
                        <LandingCard key={image.img} img={image.img} caption={image.caption} index={index} /> 
                        ))}
                    </div>
                </div>

            </div>

            <Carousal matchBase="random" matchKey="random" matchData="random"/>

            <Carousal matchBase="profession" matchKey="education" matchData={`${user?.profession?.education}`} />
            <Carousal matchBase="profession" matchKey="occupation" matchData={`${user?.profession?.occupation}`} />
            <Carousal matchBase="profession" matchKey="empStatus" matchData={`${user?.profession?.empStatus}`} />

            <Carousal matchBase="profile" matchKey="motherTongue" matchData={`${user?.profile?.motherTongue}`} />

            <QuoteBanner />

            <Carousal matchBase="family" matchKey="martialStatus" matchData={`${user?.family?.martialStatus}`} />
            <Carousal matchBase="family" matchKey="religion" matchData={`${user?.family?.religion}`} />
            <Carousal matchBase="family" matchKey="familyValue" matchData={`${user?.family?.familyValue}`} />

            <Carousal matchBase="profile" matchKey="state" matchData={`${user?.profile?.state}`} />
            <Carousal matchBase="profile" matchKey="district" matchData={`${user?.profile?.district}`} />

            <Footer />

        <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <div 
                className="min-h-[50vh] w-[40vw] bg-[#e4e0d8] py-10 "
            >
                <div className=" h-full flex flex-col items-center ">
                    <h1 className="subscription-alert-heading text-[30px] text-[#0000009f] font-bold">Subscription Alert!!!</h1>
                    <img src="/credit-card-concept-landing-page.png" className="h-[300px] w-auto" />
                    <p className="px-12 text-[18px]">You are not subscribed. Please subscribe to access our advance contact and matching features.</p>
                    <div className="flex w-full justify-around pt-10">
                        <a 
                            href="/payment"
                            className="bg-[#deba72] p-2 rounded-lg text-white font-semibold cursor-pointer shadow-sm"
                        >
                            Subscribe
                        </a>
                        <a 
                            className="border border[2px] border-[#deba72] text-[#deba72] font-semibold px-4 py-2 rounded-lg cursor-pointer"
                            onClick={handleModalClose}
                        >
                            Cancel
                        </a>
                    </div>
                </div>
            </div>

        </CustomModal>

        
        </div>
    )
}


export default Home;

