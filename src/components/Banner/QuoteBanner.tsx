import { motion } from "framer-motion";
import "./Banner.css";
import { containerVariants } from "../../utils/animations/animation1";

export function QuoteBanner() {
    return (
        <div className="h-[65vh] flex bg-[#f4f5f5] flex-col-reverse lg:flex-row flex-wrap">
            <motion.div
                className="banner-quote w-full lg:w-1/2 flex flex-1 flex-col items-center justify-center text-[25px] lg:text-[50px] h-100"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >
                <h1 className="font-[700] w-3/4 text-center text-[#000000cb]">Let here smile be your wealth</h1>
                <h1 className="banner-2-quote text-center">SAY NO TO DOWRY</h1>
            </motion.div>

            <div
                className="quote-image h-full w-full flex-1 lg:w-1/2 flex justify-center items-center"
            >
                <img src="/images/banner2.jpg" alt="" className="object-contain w-[90%] rounded-[40px]" />
            </div>
        </div>
    )
}
