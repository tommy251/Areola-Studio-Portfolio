import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState("");

  // Lagging ring position (RAF-based for smoothness)
  const ringPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      ringPos.current.x += (dotPos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (dotPos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        const size = isHovering ? 56 : 36;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [isHovering]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotPos.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest("[data-cursor-hover]");
      if (hoverEl) {
        setIsHovering(true);
        setLabel((hoverEl as HTMLElement).dataset.cursorLabel ?? "");
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-hover]")) {
        setIsHovering(false);
        setLabel("");
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

  const ringSize = isHovering ? 56 : 36;

  return (
    <>
      {/* ── Dot — snaps instantly ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.3 }}
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "hsl(16, 100%, 50%)",
          mixBlendMode: "difference",
        }}
      />

      {/* ── Ring — lags behind (RAF), expands on hover ── */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: "1.5px solid hsl(16, 100%, 50%)",
          opacity: isVisible ? (isHovering ? 0.9 : 0.5) : 0,
          transition: "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease",
          mixBlendMode: "difference",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Inner label that appears on hover */}
        {isHovering && label && (
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "hsl(16, 100%, 50%)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              mixBlendMode: "normal",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
