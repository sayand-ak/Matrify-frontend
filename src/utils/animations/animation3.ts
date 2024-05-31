export const textVariants = {
    hidden: {
      transform: `translateX(-100%)`, 
    },
    visible: {
      opacity: 1,
      transform: `translateX(0)`,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1], 
      },
    },
  };