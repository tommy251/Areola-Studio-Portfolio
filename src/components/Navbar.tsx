import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-10">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          <span>{t("graphicDesigner")}</span>
          <br />
          <span>{t("brandStrategist")}</span>
        </div>

        <div className="text-center">
          <span className="text-sm font-medium tracking-[0.3em] uppercase text-foreground">
            Areola/Studio
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Language switcher */}
          <div className="hidden md:flex items-center gap-1 text-[10px] uppercase tracking-widest">
            {(["en", "pt", "es"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-1.5 py-0.5 transition-colors ${
                  language === lang
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-cursor-hover
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="text-xs uppercase tracking-widest text-muted-foreground text-right hidden md:block">
            <span>LAG — NG</span>
          </div>

          <a
            href="mailto:jidjydo96@gmail.com"
            className="group flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            data-cursor-hover
          >
            <span>{t("contact")}</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary transition-colors group-hover:bg-primary-foreground" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
