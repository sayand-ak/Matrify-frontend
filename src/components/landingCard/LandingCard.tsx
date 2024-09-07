import "./LandingCard.css";
import { LandingCardProps } from "../../typings/landing/LandingCardTypes";
import { motion } from "framer-motion"

export function LandingCard({img, caption, index = 1}: LandingCardProps) {
    return (
    <motion.div
        className="card"
        initial={{
            opacity: 0,
            x: 100
        }}
        whileInView={{
            opacity: 1,
            x: 0, 
            transition: {
            duration: 1,
            delay: 0.5 * index 
            }
      }}
      viewport={{ once: true }}>
        <div className="landing-card flex flex-col justify-around min-h-[45vh]  w-[90vw] md:w-[30vw] lg:w-[20vw] overflow-hidden py-2 hover:scale-105 transition-all duration-500 ease-in-out bg-white rounded-2xl shadow-lg shadow-gray-500/50">
            <div className="card-image-div flex items-center justify-center flex-2 py-3">
                <img src={img} alt="" className="card-img h-[10rem] md:h-[10rem]"/>
            </div>
            <div className="caption font-quote text-lg flex items-center justify-center flex-1 font-rubik">
                <h1 className="px-6 text-center py-4">{caption}</h1>
            </div>
        </div>
        </motion.div>
    );
}
