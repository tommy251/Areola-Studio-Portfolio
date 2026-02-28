import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface IntroLoaderProps {
  onComplete: () => void;
}

const IntroLoader = ({ onComplete }: IntroLoaderProps) => {
  const [phase, setPhase] = useState<"text" | "exit">("text");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("exit"), 2000);
    const timer2 = setTimeout(() => onComplete(), 2600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
      >
        <div className="text-center overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-[8vw] md:text-[5vw] font-bold tracking-tight text-gradient-orange uppercase">
              Areola/Studio
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="mt-3 text-xs uppercase tracking-[0.4em] text-muted-foreground"
          >
            Creative Studio
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroLoader;
