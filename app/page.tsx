import { HeroSection } from "./components/HeroSection";
import { AboutCards } from "./components/AboutCards";
import { DeliverablesSection } from "./components/DeliverablesSection";
import { WebDeliverablesSection } from "./components/WebDeliverablesSection";
import { PortfolioSection } from "./components/PortfolioSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutCards />
      <DeliverablesSection />
      <WebDeliverablesSection />
      <PortfolioSection />
    </main>
  );
}
