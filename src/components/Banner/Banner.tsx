import { motion } from 'framer-motion';

import "./Banner.css";
import { textVariants } from '../../utils/animations/animation3';
  

export function Banner() {
  return (
    <div
      className="banner max-w-full flex pt-[10rem] md:pt-0 items-start md:items-center px-16 text-[25px] lg:text-[50px] text-[#000000]"
    >
      <motion.h1
        className="font-semibold"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Discover the path to Love and Unity with Matrify - Where souls connect in Harmony.
      </motion.h1>
      <div className="images flex-1 rounded-b-[60px] md:rounded-l-[50px] md:rounded-none"></div>
    </div>
  );
}
