"use client";

import { useEffect, useRef } from "react";

const VB_W = 1440;
const VB_H = 900;
const VANISH_X = VB_W / 2;
const VANISH_Y = 70;
const BASE_LEFT = -420;
const BASE_RIGHT = VB_W + 420;
const RADIAL_COUNT = 22;
const HORIZ_COUNT = 15;
const HORIZ_POWER = 2.3;

function xAtT(baseX: number, t: number) {
  return VANISH_X + (baseX - VANISH_X) * t;
}

function buildLines() {
  const radial: string[] = [];
  for (let i = 0; i <= RADIAL_COUNT; i++) {
    const baseX = BASE_LEFT + ((BASE_RIGHT - BASE_LEFT) * i) / RADIAL_COUNT;
    radial.push(`M ${VANISH_X} ${VANISH_Y} L ${baseX} ${VB_H}`);
  }

  const horiz: string[] = [];
  for (let i = 1; i <= HORIZ_COUNT; i++) {
    const t = i / HORIZ_COUNT;
    const y = VANISH_Y + (VB_H - VANISH_Y) * Math.pow(t, HORIZ_POWER);
    const xLeft = xAtT(BASE_LEFT, t);
    const xRight = xAtT(BASE_RIGHT, t);
    horiz.push(`M ${xLeft} ${y} L ${xRight} ${y}`);
  }

  return { radial, horiz };
}

const { radial: RADIAL_PATHS, horiz: HORIZ_PATHS } = buildLines();

function GridLayer({
  id,
  opacity,
  glowOpacity,
  strokeWidth,
}: {
  id: string;
  opacity: number;
  glowOpacity: number;
  strokeWidth: number;
}) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMin slice"
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <defs>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8f31d" stopOpacity="0" />
          <stop offset="18%" stopColor="#c8f31d" stopOpacity="1" />
          <stop offset="62%" stopColor="#c8f31d" stopOpacity="1" />
          <stop offset="100%" stopColor="#c8f31d" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect x="0" y="0" width={VB_W} height={VB_H} fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mask)`}>
        {/* glow pass */}
        <g
          filter={`url(#${id}-glow)`}
          stroke="#c8f31d"
          strokeWidth={strokeWidth * 2.2}
          fill="none"
          opacity={glowOpacity}
        >
          {RADIAL_PATHS.map((d, i) => (
            <path key={`rg-${i}`} d={d} />
          ))}
          {HORIZ_PATHS.map((d, i) => (
            <path key={`hg-${i}`} d={d} />
          ))}
        </g>
        {/* crisp pass */}
        <g stroke="#c8f31d" strokeWidth={strokeWidth} fill="none" opacity={opacity}>
          {RADIAL_PATHS.map((d, i) => (
            <path key={`r-${i}`} d={d} />
          ))}
          {HORIZ_PATHS.map((d, i) => (
            <path key={`h-${i}`} d={d} />
          ))}
        </g>
      </g>
    </svg>
  );
}

export function DepthGrid({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const farRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const far = farRef.current;
    const near = nearRef.current;
    if (!section || !far || !near) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number | null = null;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const traveled = -rect.top;
      far.style.transform = `translateY(${traveled * -0.04}px)`;
      near.style.transform = `translateY(${traveled * -0.09}px)`;
      raf = null;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sectionRef]);

  return (
    <div style={{ position: "sticky", top: 0, height: 0, zIndex: 0 }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div ref={farRef} style={{ position: "absolute", inset: 0 }}>
          <GridLayer id="grid-far" opacity={0.14} glowOpacity={0.08} strokeWidth={1} />
        </div>
        <div ref={nearRef} style={{ position: "absolute", inset: 0 }}>
          <GridLayer id="grid-near" opacity={0.32} glowOpacity={0.16} strokeWidth={1.4} />
        </div>
      </div>
    </div>
  );
}
