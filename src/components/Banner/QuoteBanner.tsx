import { motion } from "framer-motion";
import "./Banner.css";
import { containerVariants } from "../../utils/animations/animation1";

export function QuoteBanner() {
    return (
        <div className="min-h-[70vh] flex bg-[#ece3d4] flex-col-reverse lg:flex-row flex-wrap">
            <motion.div
                className="banner-quote w-full lg:w-1/2 flex flex-1 flex-col items-center justify-center text-[46px] font-gillroy h-100"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} 
            >
                <h1 className="font-[700] w-3/4 text-center">Let here smile be your wealth</h1>
                <h1 className="text-[#c99948]">SAY NO TO DOWRY</h1>
            </motion.div>

            <div
                className="quote-image w-full flex-1 lg:w-1/2 lg:rounded-l-[60px]"
                style={{backgroundImage: "url(../src/assets/images/banner2.jpg)", backgroundSize: "cover", backgroundPosition: "center"}}
            >
            </div>
        </div>
    )
}
