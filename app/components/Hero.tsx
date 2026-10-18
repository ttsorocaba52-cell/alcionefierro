import { CONTACT_HREF, linkProps } from "../site";
import { GoldButton } from "./ui";

const NAV = [
  { href: "#problema", label: "O problema" },
  { href: "#metodo", label: "Método" },
  { href: "#para-quem", label: "Para quem" },
  { href: "#sobre", label: "Sobre" },
];

const STEPS = ["Conhecimento", "Clareza", "Autoridade", "Oportunidades", "Negócio"];

// Coordenadas no mesmo sistema do layout original (634 × 360).
// O chevron tem a altura do hero; os três são o mesmo arquivo deslocado em x.
const CHEVRON_W = (360 * 668) / 1080;
const CHEVRON_LEFTS = [163, 324, 469];

// A pessoa fica ancorada na base do hero.
const PERSON = { x: 298, y: 25, width: 224, height: 335 };
const GLOW = { x: 303, y: 25, width: 330, height: 329 };

function HeroArt({ viewBox, id }: { viewBox: string; id: string }) {
  return (
    <svg
      className={`hero-art hero-art-${id}`}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`chev-fade-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="0.17" stopColor="#fff" />
          <stop offset="0.8" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={`person-fade-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.9" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`chev-mask-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="634" height="360">
          <rect width="634" height="360" fill={`url(#chev-fade-${id})`} />
        </mask>
        <mask id={`person-mask-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="634" height="360">
          <rect x={PERSON.x} y={PERSON.y} width={PERSON.width} height={PERSON.height} fill={`url(#person-fade-${id})`} />
        </mask>
      </defs>

      <g className="layer-far">
        <image className="hero-glow" href="/images/hero-glow.webp" {...GLOW} />
        <g mask={`url(#chev-mask-${id})`}>
          {CHEVRON_LEFTS.map((x, i) => (
            <image
              key={x}
              className="chev"
              style={{ animationDelay: `${0.15 + i * 0.18}s` }}
              href="/images/hero-chevron.webp"
              x={x}
              y={0}
              width={CHEVRON_W}
              height={360}
            />
          ))}
        </g>
      </g>
      <g className="layer-near" mask={`url(#person-mask-${id})`}>
        <image className="hero-person" href="/images/alcione-hero.webp" {...PERSON} />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero" data-hero>
      <div className="hero-spot" aria-hidden="true" />
      <HeroArt id="desktop" viewBox="0 0 634 360" />

      <header className="nav" data-nav>
        <a className="nav-logo" href="#">
          Alcione Fierro
        </a>
        <nav className="nav-links">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} data-nav-link>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href={CONTACT_HREF} {...linkProps(CONTACT_HREF)}>
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
        <GoldButton href={CONTACT_HREF}>Agendar conversa estratégica</GoldButton>
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
