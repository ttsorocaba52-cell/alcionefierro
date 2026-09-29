"use client";

import { useEffect, useRef } from "react";
import { StudioMark } from "./StudioMark";

type CardData = {
  index: string;
  label: string;
  text: React.ReactNode;
};

const CARDS: CardData[] = [
  {
    index: "01 / 04",
    label: "Filosofia do Estúdio",
    text: (
      <>
        Acreditamos que um bom design resolve problemas reais —{" "}
        <span className="hl">e não apenas os decora.</span> Toda marca que
        construímos começa com estratégia, não com estilo.
      </>
    ),
  },
  {
    index: "02 / 04",
    label: "Serviço Completo",
    text: (
      <>
        Um time só, <span className="hl">sênior</span> — do primeiro esboço
        ao lançamento final.
      </>
    ),
  },
  {
    index: "03 / 04",
    label: "Como Trabalhamos",
    text: (
      <>
        Sem juniores. Sem terceirização. Só gente que{" "}
        <span className="hl">se importa com o trabalho.</span>
      </>
    ),
  },
  {
    index: "04 / 04",
    label: "Nossa Promessa",
    text: (
      <>
        Sua marca deve parecer inevitável —{" "}
        <span className="hl">nunca inventada.</span>
      </>
    ),
  },
];

const STICKY_TOP = 128;

export function AboutCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // ---- pixel-swap reveal, per card ----
    const stages = Array.from(container.querySelectorAll<HTMLElement>(".pixel-swap-stage"));
    const cols = 14;
    const rows = 6;
    const observers: IntersectionObserver[] = [];

    stages.forEach((stage) => {
      const grid = stage.querySelector<HTMLElement>(".ps-grid");
      if (!grid) return;

      // guard against StrictMode's double-invoked effect re-populating the grid
      grid.replaceChildren();
      grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

      const pixels: HTMLElement[] = [];
      for (let i = 0; i < cols * rows; i++) {
        const px = document.createElement("div");
        px.className = "ps-pixel";
        px.style.transitionDelay = `${Math.round(Math.random() * 500)}ms`;
        grid.appendChild(px);
        pixels.push(px);
      }

      const reveal = () => pixels.forEach((px) => px.classList.add("revealed"));

      if (!("IntersectionObserver" in window)) {
        reveal();
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal();
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      io.observe(stage);
      observers.push(io);
    });
    cleanups.push(() => observers.forEach((io) => io.disconnect()));

    // ---- fan-stack depth on scroll ----
    if (!reduceMotion) {
      const cards = Array.from(container.querySelectorAll<HTMLElement>(".stack-card"));
      if (cards.length >= 2) {
        const maxLayers = 3.2;
        const stepX = 20;
        const stepY = 16;
        const stepRotate = 5.5;
        const stepScale = 0.035;
        const stepDim = 0.12;
        const stepFade = 0.06;
        const coverProgress = new Array(cards.length).fill(0);

        let raf: number | null = null;
        const update = () => {
          const range = window.innerHeight * 0.85;
          for (let i = 0; i < cards.length - 1; i++) {
            const nextRect = cards[i + 1].getBoundingClientRect();
            const dist = nextRect.top - STICKY_TOP;
            coverProgress[i] = 1 - Math.min(Math.max(dist / range, 0), 1);
          }

          for (let i = 0; i < cards.length; i++) {
            let offset = 0;
            for (let j = i; j < cards.length - 1; j++) offset += coverProgress[j];
            const layers = Math.min(offset, maxLayers);

            const x = layers * stepX;
            const y = layers * stepY;
            const rot = layers * stepRotate;
            const scale = 1 - layers * stepScale;
            const dim = 1 - layers * stepDim;
            const fade = 1 - Math.min(offset, 4) * stepFade;

            cards[i].style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
            cards[i].style.filter = `brightness(${dim})`;
            cards[i].style.opacity = String(fade);
            cards[i].style.zIndex = String(i + 1);
          }
          raf = null;
        };
        const onScroll = () => {
          if (raf) return;
          raf = requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        update();
        cleanups.push(() => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          if (raf) cancelAnimationFrame(raf);
        });
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      id="aboutSection"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "var(--black)",
        padding: "clamp(80px, 10vw, 140px) 32px clamp(64px, 8vw, 100px)",
        overflow: "hidden",
      }}
    >
      {/* curved horizon glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-46%",
          transform: "translateX(-50%)",
          width: "min(1400px, 150vw)",
          height: "min(700px, 75vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(255,60,1,0.30) 0%, rgba(255,60,1,0.08) 45%, transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
          animation: "horizonPulse 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-45.4%",
          transform: "translateX(-50%)",
          width: "min(1160px, 120vw)",
          height: 2,
          borderRadius: "50%",
          boxShadow: "0 0 70px 22px rgba(255,60,1,0.55)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* top badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: "clamp(48px, 8vw, 90px)",
          }}
        >
          <button
            type="button"
            className="pill-badge pill-badge-interactive"
            onClick={scrollToSection}
          >
            <StudioMark size={14} />
            Sobre o Estúdio
          </button>
          <button
            type="button"
            className="pill-badge pill-badge-interactive"
            onClick={scrollToSection}
          >
            Estúdio Independente · Fundado em 2024
          </button>
        </div>

        {/* 6 stacked pixel-swap cards */}
        <div className="stack-container" ref={containerRef}>
          {CARDS.map((card) => (
            <div className="stack-card" key={card.index}>
              <span className="pill-badge card-index">{card.index}</span>
              <div className="pixel-card">
                <div className="pixel-card-close">×</div>
                <div className="pixel-card-label">
                  <StudioMark size={16} />
                  {card.label}
                </div>
                <div className="pixel-swap-stage">
                  <div className="ps-after">
                    <p>{card.text}</p>
                  </div>
                  <div className="ps-grid" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
