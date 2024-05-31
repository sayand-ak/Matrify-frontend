import { motion } from 'framer-motion';

import "./Banner.css";
import { textVariants } from '../../utils/animations/animation3';
  

export function Banner() {
  return (
    <div
      className="banner max-w-full flex pt-[14rem] md:pt-0 items-start md:items-center px-16 font-gillroy text-[47px] lg:text-[50px] text-[#ffffff9f]"
    >
      <motion.h1
        className="w-full md:w-3/4 lg:w-1/2 font-semibold"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Discover the path to Love and Unity with Matrify - Where souls connect in Harmony.
      </motion.h1>
    </div>
  );
}
