import { HeroSection } from "./components/HeroSection";
import { AboutCards } from "./components/AboutCards";
import { ProcessSection } from "./components/ProcessSection";
import { DeliverablesSection } from "./components/DeliverablesSection";
import { WebDeliverablesSection } from "./components/WebDeliverablesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutCards />
        <ProcessSection />
        <DeliverablesSection />
        <WebDeliverablesSection />
        <PortfolioSection />
      </main>
      <Footer />
    </>
  );
}
