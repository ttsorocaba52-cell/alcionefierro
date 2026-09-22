"use client";

import { useEffect, useRef } from "react";
import { StudioMark } from "./StudioMark";

const EGG_ITEMS: Array<{
  style: React.CSSProperties;
  content: string;
}> = [
  { style: { top: "16%", left: "6%", fontSize: 14 }, content: '<div class="hero">' },
  { style: { top: "12%", right: "8%", fontSize: 34, fontWeight: 600 }, content: "</>" },
  { style: { top: "46%", left: "4%", fontSize: 12 }, content: "grid-template-columns:" },
  { style: { top: "51%", left: "4%", fontSize: 12 }, content: "repeat(12, 1fr);" },
  { style: { bottom: "30%", left: "10%", fontSize: 13 }, content: "<Header />" },
  { style: { top: "8%", left: "32%", fontSize: 12 }, content: '<section id="work">' },
  { style: { bottom: "8%", left: "34%", fontSize: 12 }, content: "</section>" },
  { style: { top: "72%", right: "30%", fontSize: 12 }, content: "display: flex;" },
  { style: { top: "78%", right: "30%", fontSize: 12 }, content: "gap: 24px;" },
  { style: { bottom: "6%", left: "44%", fontSize: 12 }, content: 'git commit -m "ship it"' },
  { style: { top: "4%", right: "34%", fontSize: 12 }, content: "@media (min-width: 768px)" },
  { style: { top: "90%", left: "46%", fontSize: 12 }, content: "const Studio = () =>" },
  { style: { top: "30%", right: "14%", fontSize: 13, letterSpacing: "0.1em" }, content: "UI / UX" },
  { style: { bottom: "22%", right: "22%", fontSize: 12, letterSpacing: "0.14em" }, content: "RESPONSIVE" },
  { style: { bottom: "14%", right: "6%", fontSize: 12, letterSpacing: "0.08em" }, content: "figma → code" },
  { style: { top: "22%", left: "44%", fontSize: 12, letterSpacing: "0.14em" }, content: "WIREFRAME" },
  { style: { top: "60%", right: "6%", fontSize: 12, letterSpacing: "0.14em" }, content: "PROTOTYPE" },
  { style: { bottom: "40%", right: "40%", fontSize: 12, letterSpacing: "0.1em" }, content: "ACCESSIBILITY" },
  { style: { top: "38%", left: "16%", fontSize: 12, letterSpacing: "0.14em" }, content: "TYPOGRAPHY" },
  { style: { bottom: "46%", left: "26%", fontSize: 12, letterSpacing: "0.1em" }, content: "#C8F31D" },
  { style: { top: "84%", left: "8%", fontSize: 12, letterSpacing: "0.1em" }, content: "BREAKPOINT" },
  { style: { top: "6%", right: "46%", fontSize: 12, letterSpacing: "0.1em" }, content: "MOTION" },
];

export function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const eggRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    const egg = eggRef.current;
    if (!root || !glow || !egg) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    let raf: number | null = null;
    const handleMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        glow.style.background = `radial-gradient(560px circle at ${x}px ${y}px, rgba(200,243,29,0.14), transparent 45%)`;
        glow.style.opacity = "1";
        root.style.setProperty("--mx", `${x}px`);
        root.style.setProperty("--my", `${y}px`);
        egg.style.opacity = "1";
        raf = null;
      });
    };
    const handleLeave = () => {
      glow.style.opacity = "0";
      egg.style.opacity = "0";
    };

    root.addEventListener("pointermove", handleMove);
    root.addEventListener("pointerleave", handleLeave);
    return () => {
      root.removeEventListener("pointermove", handleMove);
      root.removeEventListener("pointerleave", handleLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--black)",
        overflow: "hidden",
      }}
    >
      {/* ambient glow bottom-right */}
      <div
        style={{
          position: "absolute",
          right: "-20vw",
          bottom: "-30vw",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          filter: "blur(90px)",
          background:
            "radial-gradient(circle, rgba(159,212,0,0.30), transparent 65%)",
          animation: "driftA 16s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* hidden web design easter egg, revealed only under the cursor light */}
      <div ref={eggRef} className="easter-egg-layer">
        {EGG_ITEMS.map((item, i) => (
          <span key={i} className="egg-item" style={item.style}>
            {item.content}
          </span>
        ))}

        {/* browser wireframe icon */}
        <svg className="egg-item" style={{ top: "62%", left: "20%" }} width="46" height="34" viewBox="0 0 46 34" fill="none">
          <rect x="1" y="1" width="44" height="32" rx="4" stroke="rgba(200,243,29,0.55)" strokeWidth="1.5" />
          <line x1="1" y1="9" x2="45" y2="9" stroke="rgba(200,243,29,0.55)" strokeWidth="1.5" />
          <circle cx="6" cy="5" r="1.3" fill="rgba(200,243,29,0.55)" />
          <circle cx="11" cy="5" r="1.3" fill="rgba(200,243,29,0.55)" />
          <line x1="6" y1="16" x2="24" y2="16" stroke="rgba(200,243,29,0.55)" strokeWidth="1.5" />
          <line x1="6" y1="22" x2="34" y2="22" stroke="rgba(200,243,29,0.55)" strokeWidth="1.5" />
          <line x1="6" y1="28" x2="20" y2="28" stroke="rgba(200,243,29,0.55)" strokeWidth="1.5" />
        </svg>

        {/* cursor / click icon */}
        <svg className="egg-item" style={{ top: "20%", right: "40%" }} width="20" height="24" viewBox="0 0 20 24" fill="none">
          <path d="M1 1L19 10L11 12L8 20L1 1Z" fill="rgba(200,243,29,0.55)" />
        </svg>

        {/* bezier / anchor point icon */}
        <svg className="egg-item" style={{ bottom: "18%", left: "46%" }} width="60" height="24" viewBox="0 0 60 24" fill="none">
          <path d="M2 20C14 20 12 4 30 4C48 4 46 20 58 20" stroke="rgba(200,243,29,0.55)" strokeWidth="1.5" />
          <circle cx="2" cy="20" r="2.4" fill="rgba(200,243,29,0.55)" />
          <circle cx="58" cy="20" r="2.4" fill="rgba(200,243,29,0.55)" />
          <circle cx="30" cy="4" r="2.4" fill="rgba(200,243,29,0.55)" />
        </svg>

        {/* layers icon */}
        <svg className="egg-item" style={{ top: "68%", left: "42%" }} width="30" height="26" viewBox="0 0 30 26" fill="none">
          <path d="M15 1L29 8L15 15L1 8L15 1Z" stroke="rgba(200,243,29,0.55)" strokeWidth="1.5" />
          <path d="M1 13L15 20L29 13" stroke="rgba(200,243,29,0.55)" strokeWidth="1.5" />
          <path d="M1 18L15 25L29 18" stroke="rgba(200,243,29,0.55)" strokeWidth="1.5" />
        </svg>

        {/* color palette icon */}
        <svg className="egg-item" style={{ bottom: "36%", right: "10%" }} width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="13" stroke="rgba(200,243,29,0.55)" strokeWidth="1.5" />
          <circle cx="15" cy="7" r="2.6" fill="rgba(200,243,29,0.55)" />
          <circle cx="9" cy="18" r="2.6" fill="rgba(200,243,29,0.55)" />
          <circle cx="21" cy="18" r="2.6" fill="rgba(200,243,29,0.55)" />
        </svg>

        {/* device breakpoints icon */}
        <svg className="egg-item" style={{ top: "42%", right: "46%" }} width="52" height="26" viewBox="0 0 52 26" fill="none">
          <rect x="1" y="1" width="26" height="20" rx="2" stroke="rgba(200,243,29,0.55)" strokeWidth="1.5" />
          <rect x="33" y="6" width="18" height="16" rx="2" stroke="rgba(200,243,29,0.55)" strokeWidth="1.5" />
          <line x1="1" y1="18" x2="27" y2="18" stroke="rgba(200,243,29,0.55)" strokeWidth="1" />
        </svg>
      </div>

      {/* moving grain texture */}
      <div className="grain-layer" />

      {/* soft light that follows the cursor */}
      <div ref={glowRef} className="cursor-glow" />

      {/* Header */}
      <div
        className="fade-1"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(8,9,10,0.72)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--line)",
          isolation: "isolate",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            padding: "16px 32px",
          }}
        >
          {/* Logo */}
          <div className="mark-hover" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <StudioMark />
            <span
              style={{
                fontFamily: "var(--ff-heading)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Studio
            </span>
          </div>

          {/* Center nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#" className="nav-link">Work</a>
            <a href="#" className="nav-link">Services</a>
            <a href="#" className="nav-link">Studio</a>
            <a href="#" className="nav-link">Process</a>
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a href="#" className="nav-link" style={{ letterSpacing: "0.08em" }}>Contact</a>
            <div
              className="btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 22px",
                background: "var(--lime)",
                color: "var(--ink)",
                borderRadius: 999,
                fontFamily: "var(--ff-heading)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.02em",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Start a Project
              <StudioMark size={12} color="#0a0b06" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1180,
          margin: "0 auto",
          padding: "clamp(64px, 9vw, 110px) 32px clamp(72px, 8vw, 100px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* pill nav */}
        <div
          className="fade-2"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: "10px 12px 10px 22px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--line)",
            fontFamily: "var(--ff-heading)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "clamp(48px, 7vw, 80px)",
          }}
        >
          <span>Brand Identity</span>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "var(--ink)",
              color: "var(--lime)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
            }}
          >
            +
          </span>
          <span style={{ color: "var(--muted)" }}>Web Design</span>
        </div>

        <h1
          className="fade-2"
          style={{
            fontFamily: "var(--ff-heading)",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "clamp(48px, 8vw, 96px)",
            lineHeight: 1.03,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          Brands built
          <br />
          for <span style={{ color: "var(--lime)" }}>what comes next.</span>
        </h1>

        {/* hero foot: text + mark + cta */}
        <div
          className="fade-3"
          style={{
            width: "100%",
            marginTop: "clamp(44px, 6vw, 76px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: 380,
              textAlign: "left",
              fontWeight: 400,
              margin: 0,
            }}
          >
            We craft visual identities and digital experiences for brands ready to move forward.
          </p>

          <span style={{ display: "inline-flex" }}>
            <StudioMark size={40} className="hero-mark-pulse" />
          </span>

          <div
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "15px 30px",
              background: "var(--lime)",
              color: "var(--ink)",
              borderRadius: 999,
              fontFamily: "var(--ff-heading)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            View our work
            <StudioMark size={13} color="#0a0b06" />
          </div>
        </div>
      </div>
    </div>
  );
}
