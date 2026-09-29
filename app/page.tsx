import { HeroSection } from "./components/HeroSection";
import { AboutCards } from "./components/AboutCards";
import { ProcessSection } from "./components/ProcessSection";
import { DeliverablesSection } from "./components/DeliverablesSection";
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
        <PortfolioSection />
      </main>
      <Footer />
    </>
  );
}
