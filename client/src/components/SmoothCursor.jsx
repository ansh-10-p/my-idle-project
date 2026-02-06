import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

const SmoothCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth "spring" physics for the follower ring
  // Stiffness = tension (higher is tighter)
  // Damping = friction (higher is less bouncy)
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 1. Track Mouse Movement
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // 2. Detect Hover States automatically
    // This checks if the target is clickable (button, input, a, or custom class)
    const checkHover = (e) => {
      const target = e.target;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("button") || // Handle icons inside buttons
        target.closest("a") ||
        target.classList.contains("cursor-pointer");

      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-difference">
      {/* The "Follower" Ring 
        - Lags behind smoothly (Spring physics)
        - Scales UP when hovering (Getting Big)
      */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1, // Gets BIG on hover
          opacity: isVisible ? 1 : 0,
          borderWidth: isHovering ? "0px" : "1.5px", // Solid fill on hover, outline otherwise
          backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "transparent",
        }}
        className="absolute h-8 w-8 rounded-full border border-white"
      />

      {/* The "Dot" Cursor 
        - Follows instantly (No lag)
        - Disappears inside the big circle on hover
      */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1, // Hides when hovering
          opacity: isVisible ? 1 : 0,
        }}
        className="absolute h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
      />
    </div>
  );
};

export default SmoothCursor;