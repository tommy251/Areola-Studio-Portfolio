import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
// Updated gallery modal - March 2026

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
        <button onClick={onClose} className="p-2">
          <X size={24} />
        </button>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        {hasGallery ? (
          // Scrollable gallery: all images + videos stacked
          <div className="space-y-4 md:space-y-8">
            {/* Main thumbnail as first item */}
            <img src={project.image} alt={project.title} className="w-full rounded-xl" />
            {/* Videos */}
            {project.videos?.map((vid, i) => (
              <video key={i} src={vid} controls className="w-full rounded-xl" />
            ))}
            {/* Additional images */}
            {project.images?.map((img, i) => (
              <img key={i} src={img} alt={`${project.title} ${i + 1}`} className="w-full rounded-xl" />
            ))}
          </div>
        ) : (
          // Full view for single-asset projects
          <>
            {project.videos?.[0] ? (
              <video src={project.videos[0]} controls className="w-full h-auto max-h-[80vh]" />
            ) : (
              <img src={project.image} alt={project.title} className="w-full h-auto max-h-[80vh]" />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDetail;