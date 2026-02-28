import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const FooterSection = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative px-6 md:px-10 py-20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gradient-orange mb-4"
            >
              Areola/Studio
            </motion.h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("graphicDesigner")} • {t("brandStrategist")} • {t("videoEditor")}
              <br />
              {t("basedIn")}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {t("services")}
            </h4>
            <ul className="space-y-2">
              {["brandIdentity", "graphicDesignService", "videoEditing", "socialMediaDesign", "brandStrategy"].map(
                (key) => (
                  <li key={key} className="text-sm text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                    {t(key)}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {t("connect")}
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Instagram", href: "#" },
                { label: "Twitter / X", href: "#" },
                { label: "Behance", href: "#" },
                { label: "Email", href: "mailto:jidjydo96@gmail.com" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/80 hover:text-primary transition-colors"
                    data-cursor-hover
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            © 2025 Areola/Studio. {t("allRightsReserved")}.
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Areola/Studio
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
