"use client";

import { useState } from "react";
import { StudioMark } from "./StudioMark";

type DeliverableItem = {
  title: string;
  short: string;
  detail: string;
};

const WEB_DELIVERABLES: DeliverableItem[] = [
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

export function WebDeliverablesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section
      className="deliverables-lime"
      style={{
        position: "relative",
        background: "linear-gradient(150deg, var(--lime-2) 0%, var(--lime) 100%)",
        padding: "clamp(80px, 10vw, 140px) 32px clamp(90px, 11vw, 150px)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: "clamp(48px, 6vw, 72px)",
          }}
        >
          <StudioMark size={36} color="#0a0b06" />
          <h2
            style={{
              fontFamily: "var(--ff-heading)",
              fontWeight: 700,
              textTransform: "uppercase",
              fontSize: "clamp(26px, 5vw, 56px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              margin: 0,
              color: "var(--ink)",
            }}
          >
            Entregáveis do Site
          </h2>
        </div>

        {/* accordion list */}
        <div>
          {WEB_DELIVERABLES.map((item, i) => {
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
                  <StudioMark size={18} color="#0a0b06" />
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
