import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />

      <div className="relative z-10 text-center px-6">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[14vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.9] tracking-tight uppercase text-gradient-orange"
          >
            Areola
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[14vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.9] tracking-tight uppercase text-gradient-orange"
          >
            /Studio
          </motion.h1>
        </div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-sm md:text-base tracking-[0.2em] uppercase text-muted-foreground"
        >
          {t("graphicDesigner")} • {t("brandStrategist")} • {t("videoEditor")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("scrollToExplore")}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-[1px] bg-primary"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
