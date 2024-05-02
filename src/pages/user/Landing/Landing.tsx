import "./Landing.css";
import Navbar from "../../../components/navbar/Navbar";
import { Footer } from "../../../components/footer/Footer";
import { LandingCard } from "../../../components/landingCard/LandingCard";
import { LandingCardProps } from "../../../typings/landing/LandingCardTypes";
import { FaPhoneAlt } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { IoIosVideocam } from "react-icons/io";
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' }}
  };

export function Landing(){
    const verifyImg: LandingCardProps = {
        img: "../src/assets/images/shield_1161388.png",
        caption: "100% Verified Profiles"
    };
    const securityImg: LandingCardProps = {
        img: "../src/assets/images/security_11632064.png",
        caption: "Enhanced Privacy Settings"
    };
    const matchImg: LandingCardProps = {
        img: "../src/assets/images/circuit_677389.png",
        caption: "Intelligent Matchmaking System"
    };
  
    const images:LandingCardProps[] = [ verifyImg, securityImg, matchImg ]; 

    return(
        <>
            <Navbar/>
            <div className="banner h-[fit-content] flex flex-col-reverse rounded-none md:flex-row bg-[#f4f4f490]">
                <div className="quotes flex-1 flex flex-col justify-center items-center">
                    <div className="px-5 md:px-16 min-h-[50vh]">
                        <h1 className="leading-tight pt-10 text-[40px] md:text-[60px]">Find your perfect partner and perfect family with 
                            <span className="font-semibold text-[#5B0E12]"> MATRIFY </span>
                        </h1>
                        <button 
                            className="bg-[#EDF0F2] text-[#454545] font-semibold w-[fit-content] py-4 px-5 rounded-[30px] mt-10"
                            onClick={() => {
                                window.location.href = "/user/login";
                            }}
                        >CREATE ACCOUNT</button>
                    </div>
                </div>
                <div className="images flex-1 rounded-b-[60px] md:rounded-l-[50px] md:rounded-none"></div>
            </div>

            <div className="features-cards">
                <div className="feature-card-heading flex justify-center items-center mx-auto h-[13vh] w-3/4 rounded-b-[40px] md:w-1/4">
                    <h1 className="text-3xl md:text-4xl" >Why  MATRIFY ?</h1>
                </div>

                <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
                >
                    <div className="feature-card-items min-h-[60vh] flex flex-col gap-8 justify-center items-center pt-20 md:flex-row md:gap-[8rem]">
                    {images.map((image) => (
                        <LandingCard key={image.img} img={image.img} caption={image.caption} /> 
                        ))}
                    </div>
                </motion.div>

            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >
                <div className="banner1 flex flex-col md:flex-row min-h-[70vh] bg-[#f4f4f490] mt-10">
                    <div className="banner1_img flex-1 min-h-[40vh] rounded-r-[50px] overflow-hidden"></div>

                    <div className="banner1_content flex-1 flex flex-col items-center justify-center font-quote py-10">
                        <div className="px-5 w-full md:w-3/4">
                            <h1 className="text-[35px] md:text-[50px] font-quote font-semibold leading-tight">Choose by interest, location and other relevant features</h1>
                            <p className="text-[18px] md:text-xl pt-5">Customize your partner search with filter like hobbies, location and more.Find your suitable match.</p>
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
                <div className="banner2 flex flex-col-reverse md:flex-row min-h-[70vh] bg-[#f4f4f490] font-quote">

                    <div className="banner2_content flex-1 flex flex-col items-center justify-center py-10">
                        <div className="px-5 w-full md:w-3/4">
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
                    
                    <div className="banner2_img flex-1 min-h-[40vh] rounded-l-[50px] overflow-hidden"></div>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >
                <div className="banner3 flex flex-col md:flex-row min-h-[70vh] bg-[#f4f4f490] font-quote">

                    <div className="banner3_img flex-1 min-h-[40vh] rounded-r-[50px] overflow-hidden"></div>

                    <div className="banner3_content flex-1 flex flex-col items-center justify-center py-10">
                        <div className="px-5 w-full md:w-3/4">
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
                <div className="banner4-div font-quote relative h-[50vh] md:h-[90vh]">
                    <p className="font-semibold w-[50%] text-[#d2d0d0] text-[15px] absolute top-[50%] right-[10px] md:text-4xl">Join hearts, weave destinies - where love find its forever.</p>
                </div>
            </motion.div>
                
            <Footer/>

        </>
    )
}