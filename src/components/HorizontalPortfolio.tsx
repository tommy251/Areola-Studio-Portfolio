import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectDetail from "./ProjectDetail";

interface PortfolioProject {
  id: string;
  title: string;
  code: string;
  category: string;
  image: string;
  images?: string[];
  videos?: string[];
}

// ─── Best thumbnail images per project ─────────────────────────────────────
// Picked by largest file size = richest, most detailed image
// Vital HR: -25(1.1MB), -23(901KB), -26(715KB)
// habitat:  Artboard2(3.7MB), Artboard1(2.6MB), broch mock(2.2MB)
// latropik: -07(9.8MB), -04(9.2MB), -03(7.9MB), -06(2.2MB)
// melstar:  Artboard4(316KB), Artboard1(293KB), Artboard6(245KB)
// elchay:   Artboard19(552KB), Artboard14(451KB), Artboard1(428KB)
// riahrare: Artboard1(811KB), Artboard3(662KB), Artboard2(618KB)
const THUMBS: Record<string, string[]> = {
  "vital-hr": [
    "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-25.jpg",
    "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-23.jpg",
    "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-26.jpg",
    "/images/Vital%20HR%20SM%20Banner/Artboard%201.jpg",
  ],
  "habitat": [
    "/images/habitat/Artboard%202.jpg",
    "/images/habitat/Artboard%201.jpg",
    "/images/habitat/broch%20mock.jpg",
  ],
  "latropik": [
    "/images/latropik/la%20tropik-07.jpg",
    "/images/latropik/la%20tropik-04.jpg",
    "/images/latropik/la%20tropik-03.jpg",
    "/images/latropik/la%20tropik-06.jpg",
  ],
  "elchay": [
    "/images/ELCHAY%20Social%20Media/Artboard%2019.jpg",
    "/images/ELCHAY%20Social%20Media/Artboard%2014.jpg",
    "/images/ELCHAY%20Social%20Media/Artboard%201.jpg",
    "/images/ELCHAY%20Social%20Media/Artboard%2011.jpg",
  ],
  "melstar": [
    "/images/melstar/Artboard%204.jpg",
    "/images/melstar/Artboard%201.jpg",
    "/images/melstar/Artboard%206.jpg",
    "/images/melstar/Artboard%207.jpg",
  ],
  "riahrare": [
    "/images/Riah%20Rare/Artboard%201.jpg",
    "/images/Riah%20Rare/Artboard%203.jpg",
    "/images/Riah%20Rare/Artboard%202.jpg",
    "/images/Riah%20Rare/Artboard%206.jpg",
  ],
  "video-editing": [
    "/images/melstar/Artboard%201.jpg",
    "/images/ELCHAY%20Social%20Media/Artboard%201.jpg",
    "/images/habitat/Artboard%201.jpg",
  ],
};

const projects: PortfolioProject[] = [
  {
    id: "vital-hr",
    title: "VITAL HR",
    code: "N0.0001-25",
    category: "Branding",
    image: "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-25.jpg",
    images: [
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-23.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-24.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-25.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-26.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-27.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-28.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-29.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-30.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-31.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-32.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-33.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-34.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-35.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-36.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-37.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-38.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-42.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-43.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-44.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-45.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-46.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-47.jpg",
      "/images/Vital%20HR%20SM%20Banner/Artboard%201.jpg",
      "/images/Vital%20HR%20SM%20Banner/Artboard%2025.jpg",
      "/images/Vital%20HR%20SM%20Banner/Artboard%207.jpg",
      "/images/Vital%20HR%20SM%20Banner/ver5.jpg",
      "/images/Vital%20HR%20SM%20Banner/vit%20sm%206.png",
      "/images/Vital%20HR%20SM%20Banner/vit%20sm.jpg",
    ],
    videos: [],
  },
  {
    id: "habitat",
    title: "HABITAT",
    code: "N0.0002-25",
    category: "Branding",
    image: "/images/habitat/Artboard%202.jpg",
    images: [
      "/images/habitat/Artboard%201.jpg",
      "/images/habitat/Artboard%202.jpg",
      "/images/habitat/broch%20mock.jpg",
      "/images/habitat/Habitat%20Prj-21.jpg",
      "/images/habitat/Habitat%20Prj-22.jpg",
      "/images/habitat/Habitat%20Prj-23.jpg",
      "/images/habitat/Habitat%20Prj-24.jpg",
      "/images/habitat/Habitat%20Prj-25.jpg",
      "/images/habitat/Habitat%20Prj-26.jpg",
      "/images/habitat/Habitat%20Prj-27.jpg",
      "/images/habitat/Habitat%20Prj-28.jpg",
      "/images/habitat/Habitat%20Prj-29.jpg",
      "/images/habitat/Habitat%20Prj-30.jpg",
      "/images/habitat/Habitat%20Prj-31.jpg",
      "/images/habitat/Habitat%20Prj-32.jpg",
      "/images/habitat/Habitat%20Prj-33.jpg",
      "/images/habitat/Habitat%20Prj-34.jpg",
      "/images/habitat/Habitat%20Prj-35.jpg",
      "/images/habitat/Habitat%20Prj-36.jpg",
      "/images/habitat/Habitat%20Prj-37.jpg",
      "/images/habitat/Habitat%20Prj-38.jpg",
      "/images/habitat/Habitat%20Prj-39.jpg",
      "/images/habitat/Habitat%20Prj-40.jpg",
      "/images/habitat/hab%20green.png",
      "/images/habitat/hab%20grey.png",
      "/images/habitat/IG%20Profic%20pic%20full%20name.jpg",
      "/images/habitat/IG%20prifile%20pic%204.jpg",
      "/images/habitat/IG%20profile%20pic%202.jpg",
      "/images/habitat/IG%20profile%20pic%203.jpg",
      "/images/habitat/IG%20profile%20pic.jpg",
    ],
    videos: [],
  },
  {
    id: "latropik",
    title: "LATROPIK",
    code: "N0.0003-25",
    category: "Branding",
    image: "/images/latropik/la%20tropik-07.jpg",
    images: [
      "/images/latropik/la%20tropik-02.jpg",
      "/images/latropik/la%20tropik-03.jpg",
      "/images/latropik/la%20tropik-04.jpg",
      "/images/latropik/la%20tropik-05.jpg",
      "/images/latropik/la%20tropik-06.jpg",
      "/images/latropik/la%20tropik-07.jpg",
      "/images/latropik/la%20tropik-08.jpg",
      "/images/latropik/la%20tropik-09.jpg",
      "/images/latropik/la%20tropik-10.jpg",
      "/images/latropik/la%20tropik-11.jpg",
      "/images/latropik/la%20tropik-12.jpg",
      "/images/latropik/la%20tropik-13.jpg",
      "/images/latropik/la%20tropik-14.jpg",
      "/images/latropik/la%20tropik-15.jpg",
      "/images/latropik/la%20tropik-16.jpg",
      "/images/latropik/la%20tropik-17.jpg",
      "/images/latropik/la%20tropik-18.jpg",
      "/images/latropik/la%20tropik-19.jpg",
      "/images/latropik/la%20tropik-20.jpg",
      "/images/latropik/la%20tropik-21.jpg",
      "/images/latropik/la%20tropik-22.jpg",
      "/images/latropik/la%20tropik-23.jpg",
      "/images/latropik/la%20tropik-24.jpg",
      "/images/latropik/biz%20trop.jpg",
      "/images/latropik/trop%20ban.jpg",
      "/images/latropik/trop%20lette.jpg",
    ],
    videos: [],
  },
  {
    id: "elchay",
    title: "ELCHAY",
    code: "N0.0004-25",
    category: "Social Media",
    image: "/images/ELCHAY%20Social%20Media/Artboard%2019.jpg",
    images: [
      "/images/ELCHAY%20Social%20Media/Artboard%201.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%202.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%203.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%204.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%205.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%206.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%207.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%2011.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%2012.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%2014.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%2015.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%2016.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%2017.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%2018.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%2019.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%2020.jpg",
      "/images/ELCHAY%20Social%20Media/Artboard%2021.jpg",
    ],
    videos: [],
  },
  {
    id: "melstar",
    title: "MELSTAR",
    code: "N0.0005-25",
    category: "Social Media",
    image: "/images/melstar/Artboard%204.jpg",
    images: [
      "/images/melstar/Artboard%201.jpg",
      "/images/melstar/Artboard%202.jpg",
      "/images/melstar/Artboard%203.jpg",
      "/images/melstar/Artboard%204.jpg",
      "/images/melstar/Artboard%205.jpg",
      "/images/melstar/Artboard%206.jpg",
      "/images/melstar/Artboard%207.jpg",
      "/images/melstar/Artboard%208.jpg",
      "/images/melstar/Artboard%209.jpg",
      "/images/melstar/Artboard%2010.jpg",
    ],
    videos: [],
  },
  {
    id: "riahrare",
    title: "RIAHRARE",
    code: "N0.0006-25",
    category: "Social Media",
    image: "/images/Riah%20Rare/Artboard%201.jpg",
    images: [
      "/images/Riah%20Rare/Artboard%201.jpg",
      "/images/Riah%20Rare/Artboard%202.jpg",
      "/images/Riah%20Rare/Artboard%203.jpg",
      "/images/Riah%20Rare/Artboard%204.jpg",
      "/images/Riah%20Rare/Artboard%205.jpg",
      "/images/Riah%20Rare/Artboard%206.jpg",
      "/images/Riah%20Rare/Artboard%207.jpg",
    ],
    videos: [],
  },
  {
    id: "video-editing",
    title: "VIDEO EDITING",
    code: "N0.0007-25",
    category: "Video Editing",
    image: "/images/melstar/Artboard%201.jpg",
    images: [],
    videos: [
      "/images/Video/elch%20vid%202.mp4",
      "/images/Video/Hab%20Intro.mp4",
      "/images/Video/oyin%20M.mp4",
      "/images/Video/stack%206.mp4",
      "/images/Video/zero%20vid%20ad.mp4",
      "/images/Video/stack%202%20final.mp4",
    ],
  },
];

// ─── Single project card with auto-scrolling thumbnail + lean toward cursor ─
interface CardProps {
  project: PortfolioProject;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: CardProps) => {
  const thumbs      = THUMBS[project.id] ?? [project.image];
  const [idx, setIdx]       = useState(0);
  const [hovered, setHovered] = useState(false);
  const [mouseX, setMouseX]   = useState(0.5);
  const cardRef    = useRef<HTMLDivElement>(null);
  const interval   = useRef<ReturnType<typeof setInterval>>();

  // Auto-scroll thumbnail images — pauses on hover
  useEffect(() => {
    if (hovered || thumbs.length <= 1) {
      clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(() => {
      setIdx(prev => (prev + 1) % thumbs.length);
    }, 1700);
    return () => clearInterval(interval.current);
  }, [hovered, thumbs.length]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setMouseX((e.clientX - r.left) / r.width);
  };

  // Lean toward cursor side
  const leanX   = hovered ? (mouseX - 0.5) * 24 : 0;
  const leanRot = hovered ? (mouseX - 0.5) * 5  : 0;
  const scale   = hovered ? 1.045 : 1;

  return (
    <div
      className="flex-shrink-0 w-[90vw] md:w-[40vw] cursor-pointer select-none"
      data-cursor-hover
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouseX(0.5); }}
      onMouseMove={onMouseMove}
    >
      {/* Image wrapper — lean transform applied here */}
      <div
        ref={cardRef}
        style={{
          transform: `translateX(${leanX}px) rotate(${leanRot}deg) scale(${scale})`,
          transition: hovered
            ? "transform 0.15s cubic-bezier(0.22,1,0.36,1)"
            : "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
        }}
        className="aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-muted relative"
      >
        {/* Crossfading thumbnail images */}
        {thumbs.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${project.title} ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === idx ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
            loading="lazy"
          />
        ))}

        {/* Orange dot progress indicators */}
        <div style={{
          position: "absolute", bottom: 12, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", gap: 5, zIndex: 10,
        }}>
          {thumbs.map((_, i) => (
            <div key={i} style={{
              width: i === idx ? 20 : 5,
              height: 4, borderRadius: 3,
              background: i === idx
                ? "hsl(16,100%,50%)"
                : "rgba(255,255,255,0.3)",
              transition: "all 0.4s ease",
            }} />
          ))}
        </div>

        {/* Hover gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }} />

        {/* "View Project" label */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
          color: "#fff", fontSize: 11,
          letterSpacing: "0.2em", textTransform: "uppercase",
          fontWeight: 600, whiteSpace: "nowrap",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          pointerEvents: "none",
        }}>
          View Project →
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <h3
          className="text-xl font-semibold transition-colors duration-300"
          style={{ color: hovered ? "hsl(16,100%,50%)" : undefined }}
        >
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm">
          {project.category}
          <span className="ml-2 opacity-60">({project.code})</span>
        </p>
      </div>
    </div>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────
const HorizontalPortfolio = () => {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex]           = useState(0);
  const [selectedProject, setSelectedProject]   = useState<PortfolioProject | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  useEffect(() => {
    const section   = sectionRef.current;
    const container = scrollRef.current;
    if (!section || !container) return;

    const onScroll = () => {
      const rect        = section.getBoundingClientRect();
      const sectionTop  = -rect.top;
      const maxHeight   = section.offsetHeight - window.innerHeight;
      const progress    = Math.max(0, Math.min(1, sectionTop / maxHeight));
      const maxScroll   = container.scrollWidth - container.clientWidth;
      container.scrollLeft = progress * maxScroll;
      const cardW       = container.clientWidth * 0.42;
      setActiveIndex(Math.min(Math.round(container.scrollLeft / cardW), projects.length - 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative h-[300vh] bg-background">
        <div className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-16">

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">{t("selectedWorks")}</h2>
            <span className="text-xl md:text-2xl opacity-60">
              ({String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")})
            </span>
          </div>

          {/* Horizontal scroll row — no pointer reel here, only cursor ring */}
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden space-x-4 md:space-x-8"
          >
            {projects.map(p => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={() => setSelectedProject(p)}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HorizontalPortfolio;