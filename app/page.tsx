import { Effects } from "./components/Effects";
import { Hero } from "./components/Hero";
import { AboutSection, AudienceSection, CtaSection, PillarsSection, ProblemSection } from "./components/Sections";

export default function Home() {
  return (
    <main>
      <Effects />
      <Hero />
      <ProblemSection />
      <PillarsSection />
      <AudienceSection />
      <AboutSection />
      <CtaSection />
    </main>
  );
}
