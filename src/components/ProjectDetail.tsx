import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectDetailProps {
  project: {
    id: string;
    title: string;
    code: string;
    category: string;
    image: string;
    images?: string[];
    videos?: string[]; // Updated to array for multiple videos
  };
  onClose: () => void;
}

const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
  const { t } = useLanguage();
  const isBranding = project.category === "Branding";
  const hasGallery = (project.images?.length ?? 0) > 0 || (project.videos?.length ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-5 bg-background/80 backdrop-blur-sm">
        <div>
          <h2 className="text-sm font-medium tracking-wide text-foreground uppercase">
            {project.title}
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {project.category} — {project.code}
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
          data-cursor-hover
        >
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 md:px-10 pb-20">
        <div className="w-full max-w-5xl mx-auto">
          {isBranding && hasGallery ? (
            // Scrollable gallery for Branding: all images + videos stacked
            <div className="space-y-6">
              {/* Main thumbnail as first item */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full rounded-sm object-contain"
                style={{ maxHeight: "80vh" }}
              />
              {/* Videos */}
              {project.videos?.map((vid, i) => (
                <video
                  key={`vid-${i}`}
                  src={vid}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full rounded-sm"
                  style={{ maxHeight: "80vh" }}
                />
              ))}
              {/* Additional images */}
              {project.images?.map((img, i) => (
                <img
                  key={`img-${i}`}
                  src={img}
                  alt={`${project.title} ${i + 1}`}
                  className="w-full rounded-sm object-contain"
                  style={{ maxHeight: "80vh" }}
                />
              ))}
            </div>
          ) : (
            // Full view for Social Media or single-asset projects
            <>
              {project.videos?.[0] ? (
                <video
                  src={project.videos[0]}
                  controls
                  autoPlay
                  className="w-full rounded-sm"
                  style={{ maxHeight: "80vh" }}
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full rounded-sm"
                  style={{ maxHeight: "80vh" }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;