import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "pt" | "es";

interface Translations {
  [key: string]: { en: string; pt: string; es: string };
}

const translations: Translations = {
  graphicDesigner: { en: "Graphic Designer", pt: "Designer Gráfico", es: "Diseñador Gráfico" },
  brandStrategist: { en: "Brand Strategist", pt: "Estrategista de Marca", es: "Estratega de Marca" },
  videoEditor: { en: "Video Editor", pt: "Editor de Vídeo", es: "Editor de Video" },
  selectedWorks: { en: "Selected Works", pt: "Trabalhos Selecionados", es: "Trabajos Seleccionados" },
  scrollToExplore: { en: "Scroll to explore", pt: "Role para explorar", es: "Desplaza para explorar" },
  contact: { en: "Contact", pt: "Contato", es: "Contacto" },
  services: { en: "Services", pt: "Serviços", es: "Servicios" },
  connect: { en: "Connect", pt: "Conectar", es: "Conectar" },
  brandIdentity: { en: "Brand Identity", pt: "Identidade de Marca", es: "Identidad de Marca" },
  graphicDesignService: { en: "Graphic Design", pt: "Design Gráfico", es: "Diseño Gráfico" },
  videoEditing: { en: "Video Editing", pt: "Edição de Vídeo", es: "Edición de Video" },
  socialMediaDesign: { en: "Social Media Design", pt: "Design para Redes Sociais", es: "Diseño para Redes Sociales" },
  brandStrategy: { en: "Brand Strategy", pt: "Estratégia de Marca", es: "Estrategia de Marca" },
  allRightsReserved: { en: "All rights reserved", pt: "Todos os direitos reservados", es: "Todos los derechos reservados" },
  basedIn: { en: "Based in Lagos, Nigeria", pt: "Baseado em Lagos, Nigéria", es: "Basado en Lagos, Nigeria" },
  branding: { en: "Branding", pt: "Branding", es: "Branding" },
  socialMedia: { en: "Social Media", pt: "Redes Sociais", es: "Redes Sociales" },
  close: { en: "Close", pt: "Fechar", es: "Cerrar" },
  back: { en: "Back", pt: "Voltar", es: "Volver" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
