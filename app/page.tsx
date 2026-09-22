import { HeroSection } from "./components/HeroSection";
import { AboutCards } from "./components/AboutCards";
import { DeliverablesSection } from "./components/DeliverablesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutCards />
      <DeliverablesSection />
    </main>
  );
}
