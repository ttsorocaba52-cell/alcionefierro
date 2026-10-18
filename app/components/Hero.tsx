import { WHATSAPP_URL } from "../site";
import { GoldButton } from "./ui";

const NAV = [
  { href: "#problema", label: "O problema" },
  { href: "#metodo", label: "Método" },
  { href: "#para-quem", label: "Para quem" },
  { href: "#sobre", label: "Sobre" },
];

const STEPS = ["Conhecimento", "Clareza", "Autoridade", "Oportunidades", "Negócio"];

// Coordenadas no mesmo sistema do layout original (634 × 360).
// Cada chevron é a mesma forma deslocada no eixo x.
const CHEVRON = "245.5,0 272.5,0 383.1,163.9 187,360 163,360 357.4,165.7";
const CHEVRON_OFFSETS = [0, 161, 306];

function HeroArt({ viewBox, id }: { viewBox: string; id: string }) {
  return (
    <svg
      className={`hero-art hero-art-${id}`}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`fade-${id}`} x1="0" y1="0" x2="0" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c9a75c" stopOpacity="0.12" />
          <stop offset="0.17" stopColor="#c9a75c" />
          <stop offset="0.74" stopColor="#c9a75c" />
          <stop offset="0.97" stopColor="#c9a75c" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="468" cy="190" r="125" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c9a75c" stopOpacity="0.38" />
          <stop offset="0.55" stopColor="#c9a75c" stopOpacity="0.1" />
          <stop offset="1" stopColor="#c9a75c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`photo-mask-grad-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.12" stopColor="#fff" />
          <stop offset="0.92" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id={`photo-mask-v-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.06" stopColor="#fff" />
          <stop offset="0.9" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id={`photo-mask-h-${id}`} maskUnits="userSpaceOnUse" x="230" y="0" width="404" height="360">
          <rect x="230" y="0" width="404" height="360" fill={`url(#photo-mask-grad-${id})`} />
        </mask>
        <mask id={`photo-mask-${id}`} maskUnits="userSpaceOnUse" x="230" y="0" width="404" height="360">
          <rect x="230" y="0" width="404" height="360" fill={`url(#photo-mask-v-${id})`} />
        </mask>
      </defs>

      <rect x="250" y="40" width="384" height="320" fill={`url(#glow-${id})`} />
      {CHEVRON_OFFSETS.map((dx) => (
        <polygon key={dx} points={CHEVRON} transform={`translate(${dx} 0)`} fill={`url(#fade-${id})`} />
      ))}
      <g mask={`url(#photo-mask-h-${id})`}>
        <image
          href="/images/alcione-hero.webp"
          x="230"
          y="0"
          width="404"
          height="360"
          mask={`url(#photo-mask-${id})`}
        />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <HeroArt id="desktop" viewBox="0 0 634 360" />

      <header className="nav">
        <a className="nav-logo" href="#">
          Alcione Fierro
        </a>
        <nav className="nav-links">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          Conversa estratégica <span aria-hidden="true">→</span>
        </a>
      </header>

      <div className="hero-content">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          Estratégia · Posicionamento · Narrativa
        </p>
        <h1 className="hero-title">
          Seu saber,
          <span className="gold-light">sua marca.</span>
        </h1>
        <p className="hero-text">
          Estratégia de marca, comunicação e vendas para especialistas que têm conhecimento de valor, mas ainda
          não conseguem comunicá-lo com clareza.
        </p>
        <GoldButton href={WHATSAPP_URL}>Agendar conversa estratégica</GoldButton>
      </div>

      <HeroArt id="mobile" viewBox="196 0 438 360" />

      <ol className="hero-steps">
        {STEPS.map((step, i) => (
          <li key={step}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}
