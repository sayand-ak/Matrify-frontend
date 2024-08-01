import { motion } from 'framer-motion';

import "./Banner.css";
import { textVariants } from '../../utils/animations/animation3';
  

export function Banner() {
  return (
    <div
      className="banner max-w-full flex pt-[10rem] md:pt-0 items-start md:items-center px-16 text-[25px] lg:text-[50px] text-[#4a4a4a]"
    >
      <motion.h1
        className="font-semibold w-1/2"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Discover the path to Love and Unity with Matrify - Where souls connect in Harmony.
      </motion.h1>

      <div className="images w-full md:w-1/2 h-[80%]">
        {/* Add background image or other styles here */}
      </div>
    </div>
  );
}
