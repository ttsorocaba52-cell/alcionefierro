"use client";

import { useState } from "react";
import { StudioMark } from "./StudioMark";
import { GradientText } from "./GradientText";

type DeliverableItem = {
  title: string;
  short: string;
  detail: string;
};

const BRANDING_DELIVERABLES: DeliverableItem[] = [
  {
    title: "Logotipo e Variações",
    short: "Versão principal, reduzida, monocromática e para fundo escuro ou claro.",
    detail:
      "Entregamos o arquivo master em vetor (AI/SVG) e exportações em PNG/PDF para cada variação, prontas para impressão e para uso digital em qualquer resolução.",
  },
  {
    title: "Paleta e Tipografia",
    short: "Cores e fontes definidas com critério, prontas para aplicar em qualquer peça.",
    detail:
      "Inclui códigos HEX, RGB e CMYK para reprodução fiel da cor em qualquer meio, além dos arquivos de fonte licenciados para uso comercial.",
  },
  {
    title: "Guia de Marca",
    short: "Documento de referência com regras de uso, para manter a consistência a longo prazo.",
    detail:
      "Cobre espaçamento mínimo, área de proteção, usos incorretos e exemplos reais de aplicação — para qualquer pessoa da equipe manter a marca consistente.",
  },
  {
    title: "Aplicações Prontas",
    short: "Redes sociais, apresentação e assinatura de e-mail com a identidade já aplicada.",
    detail:
      "Templates editáveis para posts, stories, apresentações e assinatura de e-mail, já configurados com as cores, fontes e logotipo da marca.",
  },
];

const SITE_DELIVERABLES: DeliverableItem[] = [
  {
    title: "Design Responsivo",
    short: "Desktop, tablet e mobile com a mesma qualidade de experiência.",
    detail:
      "Testado em breakpoints reais — não apenas redimensionado — para que cada elemento tenha o espaçamento e o tamanho de toque corretos em qualquer tela.",
  },
  {
    title: "Estrutura e Conteúdo",
    short:
      "Páginas organizadas em torno da jornada do visitante, não do organograma da empresa.",
    detail:
      "Arquitetura de informação pensada a partir de pesquisa real: o que o visitante busca primeiro guia o que aparece primeiro.",
  },
  {
    title: "Microinterações",
    short: "Animações discretas que reforçam a leitura, sem competir com o conteúdo.",
    detail:
      "Hover, scroll e transições construídos com CSS/JS nativo — leves, rápidos e sem bibliotecas pesadas que atrasam o carregamento.",
  },
  {
    title: "Performance e SEO Técnico",
    short: "Carregamento rápido e boas práticas de indexação desde o primeiro deploy.",
    detail:
      "Imagens otimizadas, metadados estruturados e Core Web Vitals no verde desde o primeiro deploy, sem otimizações de última hora.",
  },
];

type Tab = "branding" | "site";

export function DeliverablesSection() {
  const [tab, setTab] = useState<Tab>("branding");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const isSite = tab === "site";
  const items = isSite ? SITE_DELIVERABLES : BRANDING_DELIVERABLES;

  const selectTab = (next: Tab) => {
    if (next === tab) return;
    setTab(next);
    setOpenIndex(null);
    setHoverIndex(null);
  };

  return (
    <section
      id="deliverablesSection"
      className={isSite ? "deliverables-lime" : undefined}
      style={{
        position: "relative",
        background: isSite ? "#c8f31d" : "var(--black)",
        padding: "clamp(80px, 10vw, 140px) 32px clamp(90px, 11vw, 150px)",
        transition: "background 0.4s var(--ease)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* header card */}
        <div
          style={{
            borderRadius: 40,
            background: isSite ? "rgba(10,11,6,0.05)" : "rgba(255,255,255,0.03)",
            border: "1px solid var(--line)",
            padding: "clamp(32px, 5vw, 56px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: "clamp(48px, 6vw, 72px)",
            transition: "background 0.4s var(--ease)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <StudioMark size={36} color={isSite ? "#0a0b06" : "#c8f31d"} />
            <h2
              style={{
                fontFamily: "var(--ff-heading)",
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: "clamp(26px, 5vw, 56px)",
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              <GradientText
                colors={isSite ? ["#0a0b06", "#2c3a12", "#0a0b06"] : ["#84CC16", "#b9ff4c", "#dad5df"]}
                animationSpeed={8}
              >
                Entregáveis
              </GradientText>
            </h2>
          </div>

          {/* tab toggle */}
          <div className="deliv-tabs">
            <button
              type="button"
              className={"deliv-tab" + (!isSite ? " active" : "")}
              onClick={() => selectTab("branding")}
            >
              Branding
            </button>
            <button
              type="button"
              className={"deliv-tab" + (isSite ? " active" : "")}
              onClick={() => selectTab("site")}
            >
              Site
            </button>
          </div>
        </div>

        {/* accordion list */}
        <div>
          {items.map((item, i) => {
            const isOpen = openIndex === i || hoverIndex === i;
            return (
              <div
                key={item.title}
                className="deliv-item"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="deliv-item-head">
                  <StudioMark size={18} color={isSite ? "#0a0b06" : "#c8f31d"} />
                  <div style={{ flex: 1 }}>
                    <h3>{item.title}</h3>
                    <p>{item.short}</p>
                  </div>
                  <span className={"deliv-chevron" + (isOpen ? " open" : "")}>+</span>
                </div>
                <div
                  className="deliv-detail-wrap"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="deliv-detail-inner">
                    <p>{item.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
