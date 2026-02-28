import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HorizontalPortfolio from "@/components/HorizontalPortfolio";
import FooterSection from "@/components/FooterSection";
import IntroLoader from "@/components/IntroLoader";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <div className="min-h-screen bg-background cursor-none">
      {!introComplete && <IntroLoader onComplete={handleIntroComplete} />}
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <HorizontalPortfolio />
      <FooterSection />
    </div>
  );
};

export default Index;
