import { CONTACT_HREF, linkProps } from "../site";
import { GoldButton } from "./ui";

const NAV = [
  { href: "#problema", label: "O problema" },
  { href: "#metodo", label: "Método" },
  { href: "#para-quem", label: "Para quem" },
  { href: "#sobre", label: "Sobre" },
];

const STEPS = ["Conhecimento", "Clareza", "Autoridade", "Oportunidades", "Negócio"];

// Coordenadas no sistema do layout (634 × 360). As posições foram medidas no
// enquadramento de referência (2000 × 1125, hero inteiro): 1 px = KX u na
// horizontal e KY u na vertical.
const KX = 634 / 2000;
const KY = 360 / 1125;
const at = (x: number, y: number, w: number, h: number) => ({
  x: +(x * KX).toFixed(2),
  y: +(y * KY).toFixed(2),
  width: +(w * KX).toFixed(2),
  height: +(h * KX).toFixed(2),
});

// No enquadramento os chevrons vão do topo à base: escala 0.96 × 1.04.
const CHEVRONS = [612, 1074, 1518].map((x) => ({
  ...at(x, 0, 668 * 0.96, 1080),
  height: +((1080 * 1.04) * KX).toFixed(2),
}));
const PERSON = at(932, 80, 671 * 1.04, 1004 * 1.04);
const GLOW = at(1425 - 1300 / 2, 575 - 1296 / 2, 1300, 1296);

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
          <stop offset="0.12" stopColor="#fff" />
          <stop offset="0.9" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={`person-fade-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.93" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`chev-mask-${id}`} maskUnits="userSpaceOnUse" x="0" y="-60" width="634" height="420">
          <rect y="0" width="634" height="360" fill={`url(#chev-fade-${id})`} />
        </mask>
        <mask id={`person-mask-${id}`} maskUnits="userSpaceOnUse" x="0" y="-60" width="634" height="420">
          <rect x={PERSON.x} y="-10" width={PERSON.width} height="370" fill={`url(#person-fade-${id})`} />
        </mask>
      </defs>

      <image className="hero-glow" href="/images/hero-glow.webp" opacity="0.9" {...GLOW} />
      <g mask={`url(#chev-mask-${id})`}>
        {CHEVRONS.map((c, i) => (
          <image
            key={c.x}
            className="chev"
            style={{ animationDelay: `${0.15 + i * 0.18}s` }}
            href="/images/hero-chevron.webp"
            preserveAspectRatio="none"
            {...c}
          />
        ))}
      </g>
      <g mask={`url(#person-mask-${id})`}>
        <image className="hero-person" href="/images/alcione-hero.webp" {...PERSON} />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero">
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
