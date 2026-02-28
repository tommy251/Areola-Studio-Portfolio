import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectDetail from "./ProjectDetail";

interface PortfolioProject {
  id: string;
  title: string;
  code: string;
  category: string;
  image: string; // thumbnail
  images?: string[]; // gallery images
  videos?: string[]; // gallery videos
}

const projects: PortfolioProject[] = [
  {
    id: "vital-hr",
    title: "VITAL HR",
    code: "N0.0001-25",
    category: "Branding",
    image: "/images/vital-hr/Vital HR Brand strategy and Moodboard-25.jpg",
    images: [
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-23.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-24.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-26.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-27.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-28.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-29.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-30.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-31.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-32.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-33.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-34.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-35.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-36.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-37.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-38.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-42.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-43.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-44.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-45.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-46.jpg",
      "/images/vital-hr/Vital HR Brand strategy and Moodboard-47.jpg",
      "/images/vital-hr/vit sm.jpg",
      "/images/vital-hr/vit sm 6.png",
      "/images/vital-hr/vit stationary.jpg",
      "/images/vital-hr/vita val.jpg",
    ],
    videos: [],
  },
  {
    id: "habitat",
    title: "HABITAT",
    code: "N0.0002-25",
    category: "Branding",
    image: "/images/habitat/Habitat Prj-20.jpg",
    images: [
      "/images/habitat/Habitat Prj-21.jpg",
      "/images/habitat/Habitat Prj-22.jpg",
      "/images/habitat/Habitat Prj-23.jpg",
      "/images/habitat/Habitat Prj-24.jpg",
      "/images/habitat/Habitat Prj-25.jpg",
      "/images/habitat/Habitat Prj-26.jpg",
      "/images/habitat/Habitat Prj-27.jpg",
      "/images/habitat/Habitat Prj-28.jpg",
      "/images/habitat/Habitat Prj-29.jpg",
      "/images/habitat/Habitat Prj-30.jpg",
      "/images/habitat/Habitat Prj-31.jpg",
      "/images/habitat/Habitat Prj-32.jpg",
      "/images/habitat/Habitat Prj-33.jpg",
      "/images/habitat/Habitat Prj-34.jpg",
      "/images/habitat/Habitat Prj-35.jpg",
      "/images/habitat/Habitat Prj-36.jpg",
      "/images/habitat/Habitat Prj-37.jpg",
      "/images/habitat/Habitat Prj-38.jpg",
      "/images/habitat/Habitat Prj-39.jpg",
      "/images/habitat/Habitat Prj-40.jpg",
      "/images/habitat/hab letterhead-01.jpg",
      "/images/habitat/hab pen merch.jpg",
      "/images/habitat/hab shirt(best be a round neck).jpg",
      "/images/habitat/pot plant hab.jpg",
      "/images/habitat/tote bag hab.jpg",
      "/images/habitat/hab green.png",
      "/images/habitat/hab grey.png",
      "/images/habitat/hab icon green.png",
      "/images/habitat/hab icon grey.png",
      "/images/habitat/hab icon red.png",
      "/images/habitat/hab sec logo.png",
      "/images/habitat/hab prop 1.png",
      "/images/habitat/hab prop 2.png",
      "/images/habitat/hab prop 3.png",
      "/images/habitat/hab prop 4.png",
      "/images/habitat/hab prop 5.png",
      "/images/habitat/hab prop 6.png",
    ],
    videos: [
      "/images/habitat/Hab Intro.mp4",
      "/images/habitat/Habitat Vid Final.mp4",
    ],
  },
  {
    id: "latropik",
    title: "LATROPIK",
    code: "N0.0003-25",
    category: "Branding",
    image: "/images/latropik/la tropik-01.jpg",
    images: [
      "/images/latropik/la tropik-02.jpg",
      "/images/latropik/la tropik-03.jpg",
      "/images/latropik/la tropik-04.jpg",
      "/images/latropik/la tropik-05.jpg",
      "/images/latropik/la tropik-06.jpg",
      "/images/latropik/la tropik-07.jpg",
      "/images/latropik/la tropik-08.jpg",
      "/images/latropik/la tropik-09.jpg",
      "/images/latropik/la tropik-10.jpg",
      "/images/latropik/la tropik-11.jpg",
      "/images/latropik/la tropik-12.jpg",
      "/images/latropik/la tropik-13.jpg",
      "/images/latropik/la tropik-14.jpg",
      "/images/latropik/la tropik-15.jpg",
      "/images/latropik/la tropik-16.jpg",
      "/images/latropik/la tropik-17.jpg",
      "/images/latropik/la tropik-18.jpg",
      "/images/latropik/la tropik-19.jpg",
      "/images/latropik/la tropik-20.jpg",
      "/images/latropik/la tropik-21.jpg",
      "/images/latropik/la tropik-22.jpg",
      "/images/latropik/la tropik-23.jpg",
      "/images/latropik/la tropik-24.jpg",
      "/images/latropik/biz trop.jpg",
      "/images/latropik/trop ban.jpg",
      "/images/latropik/trop lette.jpg",
      "/images/latropik/tropik.jpg",
      "/images/latropik/tropik 3.jpg",
    ],
    videos: [],
  },
  {
    id: "elchay",
    title: "ELCHAY",
    code: "N0.0004-25",
    category: "Social Media",
    image: "/images/elchay/Artboard 1.jpg",
    images: [],
    videos: ["/images/elchay/elch vid 2.mp4"],
  },
  {
    id: "oyinbo",
    title: "OYINBO",
    code: "N0.0005-25",
    category: "Social Media",
    image: "/images/oyinbo/Artboard 2.jpg",
    images: [],
    videos: ["/images/oyinbo/oyin M.mp4"],
  },
  {
    id: "melstar",
    title: "MELSTAR",
    code: "N0.0006-25",
    category: "Social Media",
    image: "/images/melstar/Artboard 3.jpg",
    images: [],
    videos: [],
  },
  {
    id: "riahrare",
    title: "RIAHRARE",
    code: "N0.0007-25",
    category: "Social Media",
    image: "/images/riahrare/Artboard 4.jpg",
    images: [],
    videos: [],
  },
];

const HorizontalPortfolio = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
      <section
        ref={sectionRef}
        className="relative"
        style={{ height: `${projects.length * 80}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="flex items-center justify-between px-6 md:px-10 pt-8 pb-4">
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("selectedWorks")}
              </h2>
            </div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              ({String(activeIndex + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")})
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex h-[calc(100vh-80px)] items-center gap-6 overflow-x-hidden px-6 md:px-10"
            style={{ scrollbarWidth: "none" }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex-shrink-0"
                style={{ width: "clamp(300px, 42vw, 600px)" }}
                data-cursor-hover
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-sm aspect-[3/4] cursor-pointer">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-background/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-border">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{
                        width: activeIndex === index ? "100%" : "0%",
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium tracking-wide text-foreground">
                      {project.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {project.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      ({project.code})
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex-shrink-0 w-[20vw]" />
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
