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
    videos?: string[];
  };
  onClose: () => void;
}

const isVideo = (path: string) => /\.(mp4|webm|ogg|mov)$/i.test(path);

const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
  const { t } = useLanguage();
  const hasGallery = (project.images?.length ?? 0) > 0 || (project.videos?.length ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-8 border-b">
        <div>
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <p className="text-muted-foreground">
            {project.category} — {project.code}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        {hasGallery ? (
          <div className="space-y-4 md:space-y-8">
            {/* Main thumbnail — skip if it's a video */}
            {!isVideo(project.image) && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full rounded-xl"
                loading="lazy"
              />
            )}

            {/* Videos */}
            {project.videos
              ?.filter((v) => v.trim() !== "")
              .map((vid, i) => (
                <video
                  key={i}
                  src={vid}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full rounded-xl"
                />
              ))}

            {/* Additional images */}
            {project.images
              ?.filter((img) => img.trim() !== "")
              .map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} ${i + 1}`}
                  className="w-full rounded-xl"
                  loading="lazy"
                />
              ))}
          </div>
        ) : (
          <>
            {project.videos?.[0] ? (
              <video
                src={project.videos[0]}
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto max-h-[80vh] rounded-xl"
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto max-h-[80vh] rounded-xl"
                loading="lazy"
              />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
