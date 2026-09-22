import { HeroSection } from "./components/HeroSection";
import { AboutCards } from "./components/AboutCards";
import { DeliverablesSection } from "./components/DeliverablesSection";
import { WebDeliverablesSection } from "./components/WebDeliverablesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutCards />
      <DeliverablesSection />
      <WebDeliverablesSection />
    </main>
  );
}
