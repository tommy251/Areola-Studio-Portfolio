import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectDetail from "./ProjectDetail";
// Force fresh build - 02 Mar 2026

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
    image: "/images/Vital HR/Vital HR Brand strategy and Moodboard-25.jpg",
    images: [
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-23.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-24.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-26.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-27.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-28.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-29.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-30.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-31.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-32.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-33.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-34.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-35.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-36.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-37.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-38.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-42.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-43.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-44.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-45.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-46.jpg",
      "/images/Vital HR/Vital HR Brand strategy and Moodboard-47.jpg",
      "/images/Vital HR SM Banner/vit sm.png",
      "/images/Vital HR SM Banner/vit sm 6.png",
      "/images/Vital HR SM Banner/Artboard 1.jpg",
      "/images/Vital HR SM Banner/vital.jpg",
      "/images/Vital HR SM Banner/A long time ago.jpg",
      "/images/Vital HR SM Banner/Artboard 25.jpg",
      "/images/Vital HR SM Banner/Artboard 7.jpg",
      "/images/Vital HR SM Banner/vers5.jpg",
    ],
    videos: [],
  },
  {
    id: "habitat",
    title: "HABITAT",
    code: "N0.0002-25",
    category: "Branding",
    image: "/images/Habitat/Habitat Prj-20.jpg",
    images: [
      "/images/Habitat/Habitat Prj-21.jpg",
      "/images/Habitat/Habitat Prj-22.jpg",
      "/images/Habitat/Habitat Prj-23.jpg",
      "/images/Habitat/Habitat Prj-24.jpg",
      "/images/Habitat/Habitat Prj-25.jpg",
      "/images/Habitat/Habitat Prj-26.jpg",
      "/images/Habitat/Habitat Prj-27.jpg",
      "/images/Habitat/Habitat Prj-28.jpg",
      "/images/Habitat/Habitat Prj-29.jpg",
      "/images/Habitat/Habitat Prj-30.jpg",
      "/images/Habitat/Habitat Prj-31.jpg",
      "/images/Habitat/Habitat Prj-32.jpg",
      "/images/Habitat/Habitat Prj-33.jpg",
      "/images/Habitat/Habitat Prj-34.jpg",
      "/images/Habitat/Habitat Prj-35.jpg",
      "/images/Habitat/Habitat Prj-36.jpg",
      "/images/Habitat/Habitat Prj-37.jpg",
      "/images/Habitat/Habitat Prj-38.jpg",
      "/images/Habitat/Habitat Prj-39.jpg",
      "/images/Habitat/Habitat Prj-40.jpg",
      "/images/Habitat/hab green.png",
      "/images/Habitat/hab grey.png",
      "/images/Habitat/hab icon green.png",
      "/images/Habitat/hab icon grey.png",
      "/images/Habitat/hab icon red.png",
      "/images/Habitat/pot plant hab.jpg",
      "/images/Habitat/hab sec logo.png",
      "/images/Habitat/broch mock.jpg",
      "/images/Habitat/Artboard 1.jpg",
      "/images/Habitat/Artboard 2.jpg",
      "/images/Habitat/IG profile pic full name.jpg",
      "/images/Habitat/IG profile pic 4.jpg",
      "/images/Habitat/IG profile pic 2.jpg",
      "/images/Habitat/IG profile pic 3.jpg",
      "/images/Habitat/IG profile pic.jpg",
    ],
    videos: [
      "/images/Video/Hab Intro.mp4",
      "/images/Habitat/Habitat Vid Final.mp4",
    ],
  },
  {
    id: "latropik",
    title: "LATROPIK",
    code: "N0.0003-25",
    category: "Branding",
    image: "/images/Latropik/la tropik-01.jpg",
    images: [
      "/images/Latropik/la tropik-02.jpg",
      "/images/Latropik/la tropik-03.jpg",
      "/images/Latropik/la tropik-04.jpg",
      "/images/Latropik/la tropik-05.jpg",
      "/images/Latropik/la tropik-06.jpg",
      "/images/Latropik/la tropik-07.jpg",
      "/images/Latropik/la tropik-08.jpg",
      "/images/Latropik/la tropik-09.jpg",
      "/images/Latropik/la tropik-10.jpg",
      "/images/Latropik/la tropik-11.jpg",
      "/images/Latropik/la tropik-12.jpg",
      "/images/Latropik/la tropik-13.jpg",
      "/images/Latropik/la tropik-14.jpg",
      "/images/Latropik/la tropik-15.jpg",
      "/images/Latropik/la tropik-16.jpg",
      "/images/Latropik/la tropik-17.jpg",
      "/images/Latropik/la tropik-18.jpg",
      "/images/Latropik/la tropik-19.jpg",
      "/images/Latropik/la tropik-20.jpg",
      "/images/Latropik/la tropik-21.jpg",
      "/images/Latropik/la tropik-22.jpg",
      "/images/Latropik/la tropik-23.jpg",
      "/images/Latropik/la tropik-24.jpg",
      "/images/Latropik/biz trop.jpg",
      "/images/Latropik/trop ban.jpg",
      "/images/Latropik/trop lette.jpg",
    ],
    videos: [],
  },
  {
    id: "elchay",
    title: "ELCHAY",
    code: "N0.0004-25",
    category: "Social Media",
    image: "/images/ELCHAY Social Media/Artboard 1.jpg",
    images: [
      "/images/ELCHAY Social Media/Artboard 2.jpg",
      "/images/ELCHAY Social Media/Artboard 3.jpg",
      "/images/ELCHAY Social Media/Artboard 4.jpg",
      "/images/ELCHAY Social Media/Artboard 5.jpg",
      "/images/ELCHAY Social Media/Artboard 6.jpg",
      "/images/ELCHAY Social Media/Artboard 7.jpg",
      "/images/ELCHAY Social Media/Artboard 11.jpg",
      "/images/ELCHAY Social Media/Artboard 12.jpg",
      "/images/ELCHAY Social Media/Artboard 14.jpg",
      "/images/ELCHAY Social Media/Artboard 15.jpg",
      "/images/ELCHAY Social Media/Artboard 16.jpg",
      "/images/ELCHAY Social Media/Artboard 17.jpg",
      "/images/ELCHAY Social Media/Artboard 18.jpg",
      "/images/ELCHAY Social Media/Artboard 19.jpg",
      "/images/ELCHAY Social Media/Artboard 20.jpg",
      "/images/ELCHAY Social Media/Artboard 21.jpg",
      "/images/ELCHAY Social Media/Last month.jpg",
      "/images/ELCHAY Social Media/Earlier this year.jpg",
    ],
    videos: ["/images/Video/elch vid 2.mp4"],
  },
  {
    id: "melstar",
    title: "MELSTAR",
    code: "N0.0005-25",
    category: "Social Media",
    image: "/images/Melstar/Artboard 3.jpg",
    images: [
      "/images/Melstar/Artboard 1.jpg",
      "/images/Melstar/Artboard 2.jpg",
      "/images/Melstar/Artboard 4.jpg",
      "/images/Melstar/Artboard 5.jpg",
      "/images/Melstar/Artboard 6.jpg",
      "/images/Melstar/Artboard 7.jpg",
      "/images/Melstar/Artboard 8.jpg",
      "/images/Melstar/Artboard 9.jpg",
      "/images/Melstar/Artboard 10.jpg",
      "/images/Melstar/A long time ago.jpg",
    ],
    videos: [],
  },
  {
    id: "riahrare",
    title: "RIAHRARE",
    code: "N0.0006-25",
    category: "Social Media",
    image: "/images/Riah Rare/A long time ago.jpg",
    images: [
      "/images/Riah Rare/Artboard 1.jpg",
      "/images/Riah Rare/Artboard 2.jpg",
      "/images/Riah Rare/Artboard 3.jpg",
      "/images/Riah Rare/Artboard 5.jpg",
      "/images/Riah Rare/Artboard 6.jpg",
      "/images/Riah Rare/Artboard 7.jpg",
    ],
    videos: [],
  },
];

const HorizontalPortfolio = () => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
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
      <section ref={sectionRef} className="relative h-[300vh] bg-background">
        <div className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">{t("selectedWorks")}</h2>
            <span className="text-xl md:text-2xl">
              ({String(activeIndex + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")})
            </span>
          </div>
          <div ref={scrollRef} className="flex overflow-x-hidden space-x-4 md:space-x-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="flex-shrink-0 w-[90vw] md:w-[40vw] cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[4/3] mb-4 overflow-hidden rounded-xl">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
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