import "./Landing.css";
import Navbar from "../../../components/navbar/Navbar";
import { Footer } from "../../../components/footer/Footer";
import { LandingCard } from "../../../components/landingCard/LandingCard";
import { LandingCardProps } from "../../../typings/landing/LandingCardTypes";
import { FaPhoneAlt } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { IoIosVideocam } from "react-icons/io";
import { motion } from 'framer-motion';
import { containerVariants } from "../../../utils/animations/animation1";
import { FeedbackSlider } from "../../../components/FeedbackSlider/FeedbackSlider";


function Landing(){
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

    const quoteBannerText = "Join hearts, weave destinies - where love find its forever.".split("");

    return(
        <div className="-z-0">
            <Navbar page="landing"/>
            <div className="banner-landing h-[fit-content] flex flex-col-reverse rounded-none md:flex-row bg-[#fff] font-rubik -z-0 border-[#ccc]">
                <div className="quotes flex-1 flex flex-col items-center py-10 md:pt-28">
                    <div className="pl-5 md:px-[70px] min-h-[50vh]">
                        
                        <h1 className="main-quote leading-tight text-[40px] md:text-[66px] text-[#4a4949]">Find your perfect partner and perfect family with 
                            <span className="font-semibold text-gradient"> MATRIFY </span>
                        </h1>
                        

                        <div className="flex w-[62%] justify-between">
                            <motion.button 
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }} 
                                className="bg-[#B691C2] text-[#fff] w-[fit-content] py-3 px-5 rounded-3xl mt-10 hover:bg-[#fff] hover:text-[#B691C2] hover:border-[#B691C2] border-[1px]"
                                onClick={() => {

                                    window.location.href = "/register";
                                }}
                            >
                                Create Account
                            </motion.button>

                            <motion.button 
                                whileTap={{ scale: 0.9 }} 
                                transition={{ duration: 0.2 }} 
                                className="border-[#EC3079] border-[1px] text-[#EC3079] w-[fit-content] py-3 px-5 rounded-3xl mt-10 hover:bg-[#EC3079] hover:text-[#fff] hover:border-[#fff]"
                                onClick={() => {
                                    window.location.href = "/login";
                                }}
                            >
                                Have an Account ?
                            </motion.button>

                        </div>
                    </div>
                </div>
                <div className="images flex-1 rounded-b-[60px] md:rounded-l-[50px] md:rounded-none"></div>
            </div>

            <div className="features-cards">
                <div className="feature-card-heading flex justify-center items-center mx-auto h-[13vh] w-3/4 rounded-b-[40px] md:w-1/4">
                    <h1 className="text-3xl md:text-4xl font-rubik" >Why  MATRIFY ?</h1>
                </div>

                <div className="flex items-center justify-center">
                    <div className="md:w-full lg:w-[80%] min-h-[60vh] flex flex-col gap-8 items-center  md:flex-row justify-around pt-5">
                    {images.map((image, index) => (
                        <LandingCard key={image.img} img={image.img} caption={image.caption} index={index} /> 
                        ))}
                    </div>
                </div>

            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >
                <div className="banner1 flex flex-col md:flex-row min-h-[70vh] mt-10">
                    <div className="banner1_img flex-1 min-h-[40vh] rounded-r-[50px] overflow-hidden"></div>

                    <div className="banner1_content text-[#4a4949] flex-1 flex flex-col items-center justify-center font-quote py-10 font-rubik">
                        <div className="w-[90%] md:w-[90%] flex flex-col gap-8">
                            <h1 className="text-[35px] md:text-[50px] font-quote font-semibold leading-tight">Choose by interest, location and other relevant features</h1>
                            <p className="text-[18px] md:text-xl">Customize your partner search with filter like hobbies, location and more.Find your suitable match.</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >
                <div className="banner2 flex flex-col-reverse md:flex-row min-h-[70vh] font-rubik">

                    <div className="banner2_content flex-1 flex flex-col items-center justify-center py-10">
                        <div className="px-5 w-full md:w-[85%] text-[#4a4949]">
                            <h1 className="text-[35px] md:text-[45px] font-quote font-semibold leading-tight">Interact with matches the way you like</h1>
                            <ul className="flex flex-col gap-10 pt-10">
                                <li className="flex gap-5 items-center">
                                    <FaPhoneAlt className="text-2xl"/>
                                    <p className="text-xl">Talk to matches directly through voice call</p>
                                </li>
                                <li className="flex gap-5 items-center">
                                    <LuMessagesSquare className="text-3xl"/>
                                    <p className="text-xl">Interact to matches with messages</p>
                                </li>
                                <li className="flex gap-5 items-center">
                                    <IoIosVideocam className="text-3xl"/>
                                    <p className="text-xl">Meet your match virtually through video call</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="banner2_img flex-1 min-h-[40vh] rounded-[50px] md:rounded-none overflow-hidden"></div>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >
                <div className="banner3 flex flex-col md:flex-row min-h-[70vh] font-rubik">

                    <div className="banner3_img flex-1 min-h-[40vh] rounded-[50px] md:rounded-r-[50px] md:rounded-none overflow-hidden"></div>

                    <div className="banner3_content flex-1 flex flex-col items-center justify-center py-10">
                        <div className="px-5 w-full md:w-[90%] text-[#4a4949]">
                            <h1 className="text-[35px] md:text-[50px] font-quote font-semibold leading-tight">Advance match recommendation system</h1>
                            <p className="text-[18px] md:text-xl pt-5">Our advanced recommendation system gives profile suggestions based on your preferences. Explore compatible matches from these.</p>
                        </div>
                    </div>
                    
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >

                <FeedbackSlider/>
            </motion.div>
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="banner4-div font-quote flex items-center pl-16 h-[50vh] md:h-[90vh] font-rubik"
                viewport={{ once: true }}
                >
                <div className="font-semibold w-[50%] text-[#0000009d] text-[25px] left-20 md:text-[45px]">
                    {quoteBannerText.map((el, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                        duration: 0.25,
                        delay: i / 10,
                        }}
                    >
                            {el}{""}
                        
                    </motion.span>
                    ))}
                </div>
            </motion.div>

                
            <Footer/>

        </div>
    )
}

export default Landing;