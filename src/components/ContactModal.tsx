import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal = ({ onClose }: ContactModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-lg px-6"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-medium text-foreground">Contact</h3>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary placeholder:text-muted-foreground/40"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary placeholder:text-muted-foreground/40"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
              Tell us about your project
            </label>
            <textarea
              placeholder="Message"
              rows={3}
              className="w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary placeholder:text-muted-foreground/40 resize-none"
            />
          </div>
          <button
            type="submit"
            className="group flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:glow-orange"
          >
            <span>Send</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-foreground transition-transform group-hover:scale-150" />
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;
