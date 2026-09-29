"use client";

import { useEffect, useRef } from "react";
import { StudioMark } from "./StudioMark";
import { GradientText } from "./GradientText";

const HELPFUL_LINKS: { label: string; id: string }[] = [
  { label: "Trabalhos", id: "portfolioSection" },
  { label: "Serviços", id: "deliverablesSection" },
  { label: "Estúdio", id: "aboutSection" },
  { label: "Processo", id: "processSection" },
];

const SOCIAL_LINKS = ["Instagram", "Behance", "LinkedIn", "Dribbble"];

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--ff-heading)",
          fontWeight: 600,
          fontSize: 12.5,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--muted)",
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14, color: "var(--white)" }}>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  const wordmarkStageRef = useRef<HTMLDivElement>(null);
  const wordmarkRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = wordmarkStageRef.current;
    const reveal = wordmarkRevealRef.current;
    if (!stage || !reveal) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;

    const handleMove = (e: PointerEvent) => {
      const rect = reveal.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      reveal.style.setProperty("--wx", `${x}px`);
      reveal.style.setProperty("--wy", `${y}px`);
      stage.classList.add("stage-active");
    };
    const handleLeave = () => stage.classList.remove("stage-active");

    stage.addEventListener("pointermove", handleMove);
    stage.addEventListener("pointerleave", handleLeave);
    return () => {
      stage.removeEventListener("pointermove", handleMove);
      stage.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      id="siteFooter"
      style={{
        position: "relative",
        background: "var(--black)",
        padding: "clamp(80px, 10vw, 140px) 32px clamp(32px, 4vw, 48px)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* top: heading + cta, and link columns */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "clamp(40px, 6vw, 72px)",
            flexWrap: "wrap",
            marginBottom: "clamp(56px, 8vw, 96px)",
          }}
        >
          <div style={{ flex: "1 1 320px", maxWidth: 460 }}>
            <h2
              style={{
                fontFamily: "var(--ff-heading)",
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: "clamp(30px, 4.4vw, 50px)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                margin: "0 0 clamp(28px, 4vw, 40px)",
              }}
            >
              Tem uma ideia incrível?
              <br />
              Vamos <span style={{ color: "var(--lime)" }}>construir juntos.</span>
            </h2>
            <a
              href="mailto:ola@estudio.com"
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 26px",
                background: "var(--lime)",
                color: "var(--ink)",
                borderRadius: 999,
                fontFamily: "var(--ff-heading)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.02em",
                cursor: "pointer",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              Iniciar Projeto
              <StudioMark size={12} color="#0a0b06" />
            </a>
          </div>

          <div style={{ display: "flex", gap: "clamp(40px, 6vw, 80px)", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              <FooterColumn title="Localização">
                <span>São Paulo, SP — Brasil</span>
                <span style={{ color: "var(--muted)" }}>Atendimento remoto para todo o país</span>
              </FooterColumn>
              <FooterColumn title="Redes Sociais">
                {SOCIAL_LINKS.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </FooterColumn>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              <FooterColumn title="Contato">
                <a href="mailto:ola@estudio.com" className="nav-link" style={{ color: "var(--white)" }}>
                  ola@estudio.com
                </a>
              </FooterColumn>
              <FooterColumn title="Links Úteis">
                {HELPFUL_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="nav-link"
                    style={{ color: "var(--white)" }}
                    onClick={scrollToId(link.id)}
                  >
                    {link.label}
                  </a>
                ))}
              </FooterColumn>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--line)" }} />

        {/* bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            padding: "20px 0",
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          <span>© Estúdio 2025 — Todos os direitos reservados.</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="nav-link"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            Voltar ao topo ↑
          </button>
        </div>
      </div>

      {/* giant wordmark signature — hidden message, revealed by a light that follows the cursor */}
      <div style={{ maxWidth: 1180, margin: "clamp(32px, 4vw, 48px) auto 0" }}>
        <div
          ref={wordmarkStageRef}
          className="wordmark-stage"
          style={{
            position: "relative",
            overflow: "hidden",
            height: "clamp(64px, 11vw, 170px)",
          }}
        >
          <div className="grain-layer" />

          <div className="wordmark-text wordmark-hidden" aria-hidden="true">
            <span
              style={{
                fontFamily: "var(--ff-wordmark)",
                fontWeight: 400,
                textTransform: "uppercase",
                fontSize: "clamp(40px, 11.5vw, 220px)",
                lineHeight: 1,
                letterSpacing: "0.01em",
                color: "rgba(255,60,1,0.07)",
              }}
            >
              Tales Martins
            </span>
          </div>

          <div ref={wordmarkRevealRef} className="wordmark-text wordmark-reveal">
            <span
              style={{
                fontFamily: "var(--ff-wordmark)",
                fontWeight: 400,
                textTransform: "uppercase",
                fontSize: "clamp(40px, 11.5vw, 220px)",
                lineHeight: 1,
                letterSpacing: "0.01em",
              }}
            >
              <GradientText colors={["#3d1400", "#ff3c01", "#3d1400"]} animationSpeed={10}>
                Tales Martins
              </GradientText>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
