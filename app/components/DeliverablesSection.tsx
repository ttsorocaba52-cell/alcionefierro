"use client";

import { useState } from "react";
import { StudioMark } from "./StudioMark";

type DeliverableItem = {
  title: string;
  short: string;
  detail: string;
};

const DELIVERABLES: DeliverableItem[] = [
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

export function DeliverablesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section
      style={{
        position: "relative",
        background: "var(--black)",
        padding: "clamp(80px, 10vw, 140px) 32px clamp(90px, 11vw, 150px)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* header card */}
        <div
          style={{
            borderRadius: 40,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--line)",
            padding: "clamp(32px, 5vw, 56px)",
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: "clamp(48px, 6vw, 72px)",
          }}
        >
          <StudioMark size={36} />
          <h2
            style={{
              fontFamily: "var(--ff-heading)",
              fontWeight: 700,
              textTransform: "uppercase",
              fontSize: "clamp(26px, 5vw, 56px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              margin: 0,
              color: "var(--white)",
            }}
          >
            Entregáveis de Branding
          </h2>
        </div>

        {/* accordion list */}
        <div>
          {DELIVERABLES.map((item, i) => {
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
                  <StudioMark size={18} />
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
