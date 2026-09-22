import { StudioMark } from "./StudioMark";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="#0a0b06"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M6 4L20 12L6 20V4Z" fill="#0a0b06" />
    </svg>
  );
}

function ActionDot({ variant }: { variant: "arrow" | "play" }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "var(--lime)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {variant === "arrow" ? <ArrowIcon /> : <PlayIcon />}
    </div>
  );
}

function CardBase({
  children,
  gridColumn,
  lime,
}: {
  children: React.ReactNode;
  gridColumn: string;
  lime?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        gridColumn,
        minHeight: 260,
        borderRadius: 20,
        border: "1px solid var(--line)",
        background: lime
          ? "linear-gradient(150deg, var(--lime-2) 0%, var(--lime) 100%)"
          : "rgba(255,255,255,0.03)",
        padding: 28,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

export function PortfolioSection() {
  return (
    <section
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
          <span className="pill-badge">
            <StudioMark size={14} />
            Nosso Trabalho
          </span>
          <span className="pill-badge">Projetos Selecionados</span>
        </div>

        {/* bento grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {/* Card 1 — Nômade: metric card */}
          <CardBase gridColumn="span 1">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <StudioMark size={20} />
              <span
                style={{
                  fontFamily: "var(--ff-heading)",
                  fontWeight: 600,
                  fontSize: 16,
                  color: "var(--white)",
                }}
              >
                Nômade
              </span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--ff-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(36px, 4vw, 48px)",
                  color: "var(--white)",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                40%
              </div>
              <p
                style={{
                  margin: 0,
                  color: "var(--muted)",
                  fontSize: 14,
                  lineHeight: 1.4,
                  maxWidth: "70%",
                }}
              >
                Aumento em reservas online
              </p>
            </div>
            <ActionDot variant="arrow" />
          </CardBase>

          {/* Card 2 — Vértice: description card */}
          <CardBase gridColumn="span 3">
            <span
              style={{
                fontFamily: "var(--ff-heading)",
                fontWeight: 700,
                fontSize: 22,
                color: "var(--white)",
                letterSpacing: "-0.01em",
              }}
            >
              Vértice
            </span>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--ff-heading)",
                fontWeight: 600,
                fontSize: "clamp(20px, 2.4vw, 28px)",
                color: "var(--white)",
                lineHeight: 1.3,
                maxWidth: "80%",
              }}
            >
              Identidade visual e site institucional para um estúdio de
              arquitetura de interiores.
            </p>
            <ActionDot variant="play" />
          </CardBase>

          {/* Card 3 — Auria: description card, serif style */}
          <CardBase gridColumn="span 3">
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
                fontSize: 22,
                color: "var(--white)",
              }}
            >
              Auria
            </span>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--ff-heading)",
                fontWeight: 600,
                fontSize: "clamp(20px, 2.4vw, 28px)",
                color: "var(--white)",
                lineHeight: 1.3,
                maxWidth: "80%",
              }}
            >
              Rebranding completo e e-commerce com foco em conversão mobile.
            </p>
            <ActionDot variant="play" />
          </CardBase>

          {/* Card 4 — Solvo: metric card, lime */}
          <CardBase gridColumn="span 1" lime>
            <span
              style={{
                fontFamily: "var(--ff-heading)",
                fontWeight: 700,
                fontSize: 16,
                color: "var(--ink)",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              Solvo
            </span>
            <div>
              <div
                style={{
                  fontFamily: "var(--ff-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(30px, 3.6vw, 40px)",
                  color: "var(--ink)",
                  lineHeight: 1.05,
                  marginBottom: 8,
                }}
              >
                3 semanas
              </div>
              <p
                style={{
                  margin: 0,
                  color: "rgba(10,11,6,0.62)",
                  fontSize: 14,
                  lineHeight: 1.4,
                  maxWidth: "70%",
                }}
              >
                Do briefing ao lançamento
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "var(--ink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  stroke="var(--lime)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </CardBase>
        </div>
      </div>
    </section>
  );
}
