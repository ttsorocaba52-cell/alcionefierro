"use client";

import { useEffect, useRef, useState } from "react";
import { StudioMark } from "./StudioMark";

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="6" />
      <line x1="14.5" y1="14.5" x2="20" y2="20" />
    </svg>
  );
}
function PenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 3.5l6 6L8 22H2v-6L14.5 3.5z" />
    </svg>
  );
}
function DiamondIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <polygon points="12,2 22,12 12,22 2,12" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}
function CursorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M3 3L21 10L13 12L10 21L3 3Z" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6c-2-1.5-5-2-8-1v14c3-1 6-0.5 8 1c2-1.5 5-2 8-1V5c-3-1-6-0.5-8 1z" />
      <path d="M12 6v14" />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L22 8L12 13L2 8L12 3Z" />
      <path d="M2 12L12 17L22 12" />
      <path d="M2 16L12 21L22 16" />
    </svg>
  );
}
function BrowserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <circle cx="6" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="9" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <line x1="8.2" y1="10.8" x2="15.8" y2="7.2" />
      <line x1="8.2" y1="13.2" x2="15.8" y2="16.8" />
    </svg>
  );
}
function UploadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 16V4" />
      <path d="M7 9l5-5 5 5" />
      <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
    </svg>
  );
}

type ProcessItem = { label: string; icon: React.ReactNode };

const LEFT_ITEMS: ProcessItem[] = [
  { label: "Pesquisa & Estratégia", icon: <SearchIcon /> },
  { label: "Direção de Arte", icon: <PenIcon /> },
  { label: "Identidade Visual", icon: <DiamondIcon /> },
  { label: "UI/UX Design", icon: <GridIcon /> },
  { label: "Prototipagem", icon: <CursorIcon /> },
];

const RIGHT_ITEMS: ProcessItem[] = [
  { label: "Guia de Marca", icon: <BookIcon /> },
  { label: "Design System", icon: <LayersIcon /> },
  { label: "Site em Produção", icon: <BrowserIcon /> },
  { label: "Kit de Redes Sociais", icon: <ShareIcon /> },
  { label: "Handoff & Deploy", icon: <UploadIcon /> },
];

type PathData = { d: string; side: "left" | "right"; index: number };

function ProcessCard({
  label,
  icon,
  innerRef,
  onEnter,
  onLeave,
}: {
  label: string;
  icon: React.ReactNode;
  innerRef: (el: HTMLDivElement | null) => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div className="process-card" ref={innerRef} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <span className="process-card-label">{label}</span>
      <span className="process-card-icon">{icon}</span>
    </div>
  );
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rightRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [paths, setPaths] = useState<PathData[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hover, setHover] = useState<{ side: "left" | "right"; index: number } | null>(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const container = containerRef.current;
    const hub = hubRef.current;
    if (!container || !hub) return;

    const mq = window.matchMedia("(min-width: 861px)");

    const compute = () => {
      if (!mq.matches) {
        setPaths([]);
        setSize({ width: 0, height: 0 });
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const hubRect = hub.getBoundingClientRect();
      const hubLeft = hubRect.left - containerRect.left;
      const hubRight = hubRect.right - containerRect.left;
      const hubY = hubRect.top - containerRect.top + hubRect.height / 2;

      const next: PathData[] = [];

      leftRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x1 = r.right - containerRect.left;
        const y1 = r.top - containerRect.top + r.height / 2;
        const midX = (x1 + hubLeft) / 2;
        next.push({ d: `M${x1},${y1} C${midX},${y1} ${midX},${hubY} ${hubLeft},${hubY}`, side: "left", index: i });
      });

      rightRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x2 = r.left - containerRect.left;
        const y2 = r.top - containerRect.top + r.height / 2;
        const midX = (hubRight + x2) / 2;
        next.push({ d: `M${hubRight},${hubY} C${midX},${hubY} ${midX},${y2} ${x2},${y2}`, side: "right", index: i });
      });

      setPaths(next);
      setSize({ width: containerRect.width, height: containerRect.height });
    };

    compute();
    const onResize = () => compute();
    window.addEventListener("resize", onResize, { passive: true });
    mq.addEventListener("change", compute);
    const settle = setTimeout(compute, 300);

    return () => {
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", compute);
      clearTimeout(settle);
    };
  }, []);

  return (
    <section
      id="processSection"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "var(--black)",
        padding: "clamp(80px, 10vw, 140px) 32px clamp(90px, 11vw, 150px)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* header */}
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
          <button type="button" className="pill-badge pill-badge-interactive" onClick={scrollToSection}>
            <StudioMark size={14} />
            Nosso Processo
          </button>
          <button type="button" className="pill-badge pill-badge-interactive" onClick={scrollToSection}>
            Da Estratégia à Entrega
          </button>
        </div>

        {/* hub-and-spoke diagram */}
        <div className="process-diagram" ref={containerRef}>
          {size.width > 0 && (
            <svg
              className="process-svg"
              width={size.width}
              height={size.height}
              style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
            >
              {paths.map((p) => (
                <path
                  key={`${p.side}-${p.index}`}
                  d={p.d}
                  className="process-path"
                  stroke={hover && hover.side === p.side && hover.index === p.index ? "var(--lime)" : "var(--line)"}
                />
              ))}
            </svg>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 1.6vw, 18px)" }}>
            {LEFT_ITEMS.map((item, i) => (
              <ProcessCard
                key={item.label}
                label={item.label}
                icon={item.icon}
                innerRef={(el) => {
                  leftRefs.current[i] = el;
                }}
                onEnter={() => setHover({ side: "left", index: i })}
                onLeave={() => setHover(null)}
              />
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="process-hub" ref={hubRef}>
              <StudioMark size={30} className="hero-mark-pulse" />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 1.6vw, 18px)" }}>
            {RIGHT_ITEMS.map((item, i) => (
              <ProcessCard
                key={item.label}
                label={item.label}
                icon={item.icon}
                innerRef={(el) => {
                  rightRefs.current[i] = el;
                }}
                onEnter={() => setHover({ side: "right", index: i })}
                onLeave={() => setHover(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
