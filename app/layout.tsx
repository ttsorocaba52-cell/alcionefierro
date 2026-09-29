import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Estúdio — Identidade de Marca & Web Design",
  description:
    "Estúdio independente de marca e digital. Criamos identidades visuais e experiências digitais para marcas prontas para avançar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=Anton&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
