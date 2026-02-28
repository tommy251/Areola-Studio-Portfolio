import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-hover]")) {
        setIsHovering(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-hover]")) {
        setIsHovering(false);
      }
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [isVisible]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      animate={{
        x: position.x - (isHovering ? 32 : 6),
        y: position.y - (isHovering ? 32 : 6),
        width: isHovering ? 64 : 12,
        height: isHovering ? 64 : 12,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      style={{
        borderRadius: "50%",
        backgroundColor: "hsl(16, 100%, 50%)",
      }}
    />
  );
};

export default CustomCursor;
