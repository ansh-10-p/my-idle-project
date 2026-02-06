import { motion } from 'framer-motion';
import clsx from 'clsx';

// "Premium" easing curve: starts fast, lands soft.
const transitionCurve = [0.25, 1, 0.5, 1];

const variants = {
  initial: { 
    opacity: 0, 
    y: 16, 
    scale: 0.99 
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.45, 
      ease: transitionCurve,
      staggerChildren: 0.1 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -16, 
    scale: 0.99,
    transition: { 
      duration: 0.3, 
      ease: "easeInOut" 
    } 
  },
};

const PageWrapper = ({ children, className }) => {
  return (
    <motion.main
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={clsx(
        "min-h-screen w-full bg-[#0B1121]", // Default background matches theme
        className
      )}
    >
      {children}
    </motion.main>
  );
};

export default PageWrapper;