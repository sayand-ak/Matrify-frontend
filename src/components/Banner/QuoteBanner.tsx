import { motion } from "framer-motion";
import "./Banner.css";
import { containerVariants } from "../../utils/animations/animation1";

export function QuoteBanner() {
    return (
        <div className="min-h-[70vh] flex bg-[#ece3d4] flex-col-reverse lg:flex-row flex-wrap">
            <motion.div
                className="banner-quote w-full lg:w-1/2 flex flex-1 flex-col items-center justify-center text-[25px] lg:text-[50px] h-100"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >
                <h1 className="font-[700] w-3/4 text-center">Let here smile be your wealth</h1>
                <h1 className="text-[#c99948] text-center">SAY NO TO DOWRY</h1>
            </motion.div>

            <div
                className="quote-image min-h-[20rem] w-full flex-1 lg:w-1/2 lg:rounded-l-[60px]"
                style={{backgroundImage: "url(/images/banner2.jpg)", backgroundSize: "cover", backgroundPosition: "center"}}
            >
            </div>
        </div>
    )
}
