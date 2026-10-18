import { INSTAGRAM_URL, WHATSAPP_URL } from "../site";
import { ArrowUpRight, ChapterHead, GoldButton } from "./ui";

const PROBLEMS = [
  "Muitas ideias, pouca organização.",
  "Um posicionamento que não diferencia.",
  "Conhecimento que não vira conteúdo estratégico.",
  "Serviços e ofertas sem estrutura clara.",
  "A sensação de que poderia crescer mais, mas falta direção.",
];

const PILLARS = [
  {
    title: "Posicionamento",
    text: "Definir como sua marca será percebida narrativa, diferenciação e o lugar que você ocupa na mente do cliente.",
  },
  {
    title: "Comunicação",
    text: "Transformar conhecimento em uma mensagem clara e estratégica. Conteúdo que constrói valor, não só alcance.",
  },
  {
    title: "Estratégia comercial",
    text: "Estruturar ofertas e caminhos de venda para que autoridade se converta em negócio.",
  },
];

const AUDIENCE = [
  ["Especialistas", "Construir autoridade e ser reconhecido pelo que já domina."],
  ["Terapeutas", "Comunicar o valor do próprio trabalho com segurança e clareza."],
  ["Consultores", "Estruturar ofertas e posicionar serviços de alto valor."],
  ["Mentores", "Criar um método próprio e uma narrativa que diferencia."],
  ["Educadores", "Transformar conhecimento em produtos e conteúdo estratégico."],
  ["Empreendedores", "Crescer no digital com marca pessoal forte e direção comercial."],
];

const TAGS = ["Posicionamento", "Comunicação", "Vendas", "Construção de marca", "Narrativa", "Conteúdo estratégico"];

export function ProblemSection() {
  return (
    <section id="problema" className="section problem">
      <div className="problem-left">
        <ChapterHead number="01" label="O problema" />
        <h2 className="h2">
          Você não precisa de{" "}
          <br />
          mais conhecimento.
        </h2>
        <p className="problem-sub">
          Precisa de uma estratégia para{" "}
          <br />
          transformar o que já sabe em autoridade.
        </p>
        <span className="short-rule" />
        <p className="body-text">
          Quando a mensagem não é clara, o mercado não enxerga a diferença entre você e qualquer outro
          profissional. E quem não é percebido como referência acaba competindo por preço.
        </p>
        <p className="problem-punch">
          O problema nunca foi o que você sabe. É como o mundo percebe o que você sabe.
        </p>
      </div>
      <div className="problem-right">
        <p className="body-text">
          A maioria dos especialistas que chegam até mim tem anos de experiência. O que falta não é conteúdo. É
          organização, direção e uma mensagem que faça o mercado enxergar o valor que já existe.
        </p>
        <ol className="problem-list">
          {PROBLEMS.map((item, i) => (
            <li key={item}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PillarsSection() {
  return (
    <section id="metodo" className="section pillars">
      <ChapterHead number="02" label="Como eu ajudo" />
      <div className="pillars-head">
        <h2 className="h2">
          Três pilares, <span className="gold-light">uma</span>
          <br />
          <span className="gold-light">direção.</span>
        </h2>
        <p className="body-text">
          Da identidade da marca à estrutura comercial. Um trabalho integrado, não peças soltas.
        </p>
      </div>
      <div className="pillars-grid">
        {PILLARS.map((p, i) => (
          <article key={p.title}>
            <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{p.title}</h3>
            <p className="body-text">{p.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AudienceSection() {
  return (
    <section id="para-quem" className="section audience">
      <ChapterHead number="03" label="Para quem é" />
      <div className="audience-head">
        <h2 className="h2">
          Para quem
          <br />
          tem algo
          <br />
          valioso a dizer.
        </h2>
        <p className="body-text">
          Profissionais do conhecimento que querem crescer no digital de forma estratégica, sem parecer mais um
          infoproduto.
        </p>
      </div>
      <div className="audience-table">
        <div className="audience-labels">
          <span>Perfil</span>
          <span>O que busca</span>
        </div>
        {AUDIENCE.map(([profile, goal]) => (
          <a key={profile} className="audience-row" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <strong>{profile}</strong>
            <span>{goal}</span>
            <span className="audience-dot">
              <ArrowUpRight size={8} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="sobre" className="about">
      <div className="about-photo">
        <img src="/images/alcione-sobre.webp" alt="Alcione Fierro" />
      </div>
      <div className="about-text">
        <ChapterHead number="04" label="Quem é Alcione" />
        <h2 className="h2 about-title">
          Estrategista de marca,
          <br />
          narrativa e vendas.
        </h2>
        <p className="body-text">
          Alcione Fierro ajuda profissionais a transformar conhecimento, experiência e habilidades em marcas
          fortes e negócios lucrativos. Da construção da identidade e da narrativa até a estrutura de conteúdos,
          ofertas e estratégia comercial.
        </p>
        <ul className="tags">
          {TAGS.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="cta">
      <div className="cta-inner">
        <p className="cta-eyebrow">Próximo passo</p>
        <h2 className="h2 cta-title">
          Vamos dar <span className="gold-light">clareza</span>
          <br />
          ao seu valor?
        </h2>
        <p className="body-text cta-text">
          Uma conversa estratégica para entender onde você está, onde{" "}
          <br />
          quer chegar e qual o caminho mais curto entre os dois.
        </p>
        <GoldButton href={WHATSAPP_URL}>Conversar pelo WhatsApp</GoldButton>
      </div>
      <footer className="footer">
        <strong>Alcione Fierro</strong>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <span>© 2026 · Estratégia de posicionamento</span>
      </footer>
    </section>
  );
}
