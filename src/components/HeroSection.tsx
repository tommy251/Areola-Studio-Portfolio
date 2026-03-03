import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Hero media — picked by largest file size (richest images) ──────────────
// Vital HR-25=1.1MB  |  habitat Artboard2=3.7MB  |  latropik-07=9.8MB
// ELCHAY Artboard19=552KB  |  Riah Rare Artboard1=811KB
// Swap any src for a different image number if you prefer another shot
const HERO_MEDIA: { type: "image" | "video"; src: string }[] = [
  { type: "image", src: "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-25.jpg" },
  { type: "image", src: "/images/habitat/Artboard%202.jpg" },
  { type: "image", src: "/images/latropik/la%20tropik-07.jpg" },
  { type: "image", src: "/images/ELCHAY%20Social%20Media/Artboard%2019.jpg" },
  { type: "image", src: "/images/melstar/Artboard%204.jpg" },
  { type: "image", src: "/images/Riah%20Rare/Artboard%201.jpg" },
  { type: "video", src: "/images/Video/elch%20vid%202.mp4" },
  { type: "image", src: "/images/latropik/la%20tropik-04.jpg" },
  { type: "image", src: "/images/habitat/Artboard%201.jpg" },
  { type: "video", src: "/images/Video/Hab%20Intro.mp4" },
  { type: "image", src: "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-23.jpg" },
  { type: "image", src: "/images/Riah%20Rare/Artboard%203.jpg" },
];

// Tile shape alternates for Locatelli-style visual rhythm
const SIZES = [
  { w: 260, h: 190 },
  { w: 215, h: 290 },
  { w: 305, h: 200 },
  { w: 245, h: 245 },
];

const HeroSection = () => {
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const tileRef    = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  // All positions kept in refs — NO setState for movement = no re-render lag
  const cursorPos  = useRef({ x: -999, y: -999 });
  const tilePos    = useRef({ x: -999, y: -999 });
  const rafId      = useRef(0);
  const idleTimer  = useRef<ReturnType<typeof setTimeout>>();
  const cycleTimer = useRef<ReturnType<typeof setInterval>>();

  const [mediaIndex,  setMediaIndex]  = useState(0);
  const [tileVisible, setTileVisible] = useState(false);
  const [insideHero,  setInsideHero]  = useState(false);
  const [sizeIdx,     setSizeIdx]     = useState(0);

  // Pure RAF lerp — tile tracks cursor independently of React render cycle
  const animate = useCallback(() => {
    tilePos.current.x += (cursorPos.current.x - tilePos.current.x) * 0.08;
    tilePos.current.y += (cursorPos.current.y - tilePos.current.y) * 0.08;
    if (tileRef.current) {
      tileRef.current.style.transform =
        `translate(${tilePos.current.x}px,${tilePos.current.y}px) translate(-50%,-50%)`;
    }
    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  // Cycle media ONLY while cursor is inside hero — completely stops elsewhere
  useEffect(() => {
    if (!insideHero) {
      clearInterval(cycleTimer.current);
      return;
    }
    cycleTimer.current = setInterval(() => {
      setMediaIndex(prev => (prev + 1) % HERO_MEDIA.length);
      setSizeIdx(prev    => (prev + 1) % SIZES.length);
    }, 1400);
    return () => clearInterval(cycleTimer.current);
  }, [insideHero]);

  // Auto-play video tiles
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [mediaIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current!.getBoundingClientRect();
    cursorPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setTileVisible(true);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setTileVisible(false), 900);
  };

  const current  = HERO_MEDIA[mediaIndex];
  const tileSize = SIZES[sizeIdx];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setInsideHero(true)}
      onMouseLeave={() => { setInsideHero(false); setTileVisible(false); }}
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden cursor-none"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />

      {/* ── Floating media tile ──────────────────────────────────────────────
          position:absolute inside overflow:hidden section = can NEVER escape
          into the works section below. Completely self-contained.          */}
      <div
        ref={tileRef}
        style={{
          position: "absolute", top: 0, left: 0,
          width: tileSize.w,
          height: tileSize.h,
          pointerEvents: "none",
          zIndex: 20,
          opacity: tileVisible ? 1 : 0,
          transition:
            "opacity 0.35s ease," +
            "width 0.5s cubic-bezier(0.22,1,0.36,1)," +
            "height 0.5s cubic-bezier(0.22,1,0.36,1)",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.75)",
          willChange: "transform",
        }}
      >
        {current.type === "image" ? (
          <img
            key={current.src}
            src={current.src}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <video
            ref={videoRef}
            key={current.src}
            src={current.src}
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}

        {/* Counter pill */}
        <div style={{
          position: "absolute", bottom: 8, right: 10,
          color: "rgba(255,255,255,0.55)",
          fontSize: 10, letterSpacing: "0.12em", fontFamily: "monospace",
        }}>
          {String(mediaIndex + 1).padStart(2, "0")}
          {" / "}
          {String(HERO_MEDIA.length).padStart(2, "0")}
        </div>
      </div>

      {/* ── Hero text — unchanged from original ── */}
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