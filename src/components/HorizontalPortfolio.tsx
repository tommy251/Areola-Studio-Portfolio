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

const projects: PortfolioProject[] = [
  {
    id: "vital-hr",
    title: "VITAL HR",
    code: "N0.0001-25",
    category: "Branding",
    image: "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-45.jpg",
    images: [
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-23.jpg",
      "/images/Vital%20HR/Vital%20HR%20Brand%20strategy%20and%20Moodboard-24.jpg",
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
      "/images/Vital%20HR%20SM%20Banner/vit%20sm.jpg",
      "/images/Vital%20HR%20SM%20Banner/vit%20sm%206.png",
      "/images/Vital%20HR%20SM%20Banner/Artboard%201.jpg",
      "/images/Vital%20HR%20SM%20Banner/Artboard%2025.jpg",
      "/images/Vital%20HR%20SM%20Banner/Artboard%207.jpg",
      "/images/Vital%20HR%20SM%20Banner/ver5.jpg",
    ],
    videos: [],
  },
  {
    id: "habitat",
    title: "HABITAT",
    code: "N0.0002-25",
    category: "Branding",
    image: "/images/Habitat/Habitat%20Prj-20.jpg",
    images: [
      "/images/Habitat/Habitat%20Prj-21.jpg",
      "/images/Habitat/Habitat%20Prj-22.jpg",
      "/images/Habitat/Habitat%20Prj-23.jpg",
      "/images/Habitat/Habitat%20Prj-24.jpg",
      "/images/Habitat/Habitat%20Prj-25.jpg",
      "/images/Habitat/Habitat%20Prj-26.jpg",
      "/images/Habitat/Habitat%20Prj-27.jpg",
      "/images/Habitat/Habitat%20Prj-28.jpg",
      "/images/Habitat/Habitat%20Prj-29.jpg",
      "/images/Habitat/Habitat%20Prj-30.jpg",
      "/images/Habitat/Habitat%20Prj-31.jpg",
      "/images/Habitat/Habitat%20Prj-32.jpg",
      "/images/Habitat/Habitat%20Prj-33.jpg",
      "/images/Habitat/Habitat%20Prj-34.jpg",
      "/images/Habitat/Habitat%20Prj-35.jpg",
      "/images/Habitat/Habitat%20Prj-36.jpg",
      "/images/Habitat/Habitat%20Prj-37.jpg",
      "/images/Habitat/Habitat%20Prj-38.jpg",
      "/images/Habitat/Habitat%20Prj-39.jpg",
      "/images/Habitat/Habitat%20Prj-40.jpg",
      "/images/Habitat/hab%20green.png",
      "/images/Habitat/hab%20grey.png",
      "/images/Habitat/hab%20icon%20green.png",
      "/images/Habitat/hab%20icon%20grey.png",
      "/images/Habitat/hab%20icon%20red.png",
      "/images/Habitat/pot%20plant%20hab.jpg",
      "/images/Habitat/hab%20sec%20logo.png",
      "/images/Habitat/broch%20mock.jpg",
      "/images/Habitat/Artboard%201.jpg",
      "/images/Habitat/Artboard%202.jpg",
      "/images/Habitat/IG%20prifile%20pic%204.jpg",
      "/images/Habitat/IG%20profile%20pic%203.jpg",
      "/images/Habitat/IG%20Profic%20pic%20full%20name.jpg",
      "/images/Habitat/IG%20profile%20pic%202.jpg",
      "/images/Habitat/IG%20profile%20pic.jpg",
    ],
    videos: [],
  },
  {
    id: "latropik",
    title: "LATROPIK",
    code: "N0.0003-25",
    category: "Branding",
    image: "/images/Latropik/la%20tropik-01.jpg",
    images: [
      "/images/Latropik/la%20tropik-02.jpg",
      "/images/Latropik/la%20tropik-03.jpg",
      "/images/Latropik/la%20tropik-04.jpg",
      "/images/Latropik/la%20tropik-05.jpg",
      "/images/Latropik/la%20tropik-06.jpg",
      "/images/Latropik/la%20tropik-07.jpg",
      "/images/Latropik/la%20tropik-08.jpg",
      "/images/Latropik/la%20tropik-09.jpg",
      "/images/Latropik/la%20tropik-10.jpg",
      "/images/Latropik/la%20tropik-11.jpg",
      "/images/Latropik/la%20tropik-12.jpg",
      "/images/Latropik/la%20tropik-13.jpg",
      "/images/Latropik/la%20tropik-14.jpg",
      "/images/Latropik/la%20tropik-15.jpg",
      "/images/Latropik/la%20tropik-16.jpg",
      "/images/Latropik/la%20tropik-17.jpg",
      "/images/Latropik/la%20tropik-18.jpg",
      "/images/Latropik/la%20tropik-19.jpg",
      "/images/Latropik/la%20tropik-20.jpg",
      "/images/Latropik/la%20tropik-21.jpg",
      "/images/Latropik/la%20tropik-22.jpg",
      "/images/Latropik/la%20tropik-23.jpg",
      "/images/Latropik/la%20tropik-24.jpg",
      "/images/Latropik/biz%20trop.jpg",
      "/images/Latropik/trop%20ban.jpg",
      "/images/Latropik/trop%20lette.jpg",
    ],
    videos: [],
  },
  {
    id: "elchay",
    title: "ELCHAY",
    code: "N0.0004-25",
    category: "Social Media",
    image: "/images/ELCHAY%20Social%20Media/Artboard%201.jpg",
    images: [
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
    // Folder on disk is "Melstar" (capital M, no space) — confirmed
    image: "/images/Melstar/Artboard%201.jpg",
    images: [
      "/images/Melstar/Artboard%202.jpg",
      "/images/Melstar/Artboard%204.jpg",
      "/images/Melstar/Artboard%205.jpg",
      "/images/Melstar/Artboard%206.jpg",
      "/images/Melstar/Artboard%207.jpg",
      "/images/Melstar/Artboard%208.jpg",
      "/images/Melstar/Artboard%209.jpg",
      "/images/Melstar/Artboard%2010.jpg",
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
      "/images/Riah%20Rare/Artboard%202.jpg",
      "/images/Riah%20Rare/Artboard%203.jpg",
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
    // No image thumbnail exists — using a still from another project as placeholder
    image: "/images/Melstar/Artboard%201.jpg",
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

const isVideo = (path: string) => /\.(mp4|webm|ogg|mov)$/i.test(path);

const HorizontalPortfolio = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollRef.current;
    if (!section || !scrollContainer) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = -rect.top;
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, sectionTop / sectionHeight));
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      scrollContainer.scrollLeft = progress * maxScroll;

      const cardWidth = scrollContainer.clientWidth * 0.42;
      const newActive = Math.round(scrollContainer.scrollLeft / cardWidth);
      setActiveIndex(Math.min(newActive, projects.length - 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative h-[300vh] bg-background">
        <div className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">{t("selectedWorks")}</h2>
            <span className="text-xl md:text-2xl">
              ({String(activeIndex + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")})
            </span>
          </div>
          <div ref={scrollRef} className="flex overflow-x-hidden space-x-4 md:space-x-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="flex-shrink-0 w-[90vw] md:w-[40vw] cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-muted">
                  {isVideo(project.image) ? (
                    <video
                      src={project.image}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-muted-foreground">
                    {project.category}
                    <span className="ml-2">({project.code})</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default HorizontalPortfolio;
