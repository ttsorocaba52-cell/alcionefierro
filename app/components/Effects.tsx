"use client";

import { useEffect } from "react";

// Elementos que entram com fade ao rolar a página.
const REVEAL = [
  ".chapter-head",
  ".h2",
  ".problem-sub",
  ".short-rule",
  ".body-text",
  ".problem-punch",
  ".problem-list li",
  ".pillars-grid article",
  ".audience-labels",
  ".audience-row",
  ".about-photo",
  ".tags li",
  ".cta-eyebrow",
  ".cta .gold-btn",
  ".footer",
].join(",");

export function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];
    const root = document.documentElement;

    // Revelar ao rolar, com atraso escalonado entre irmãos.
    const items = Array.from(document.querySelectorAll<HTMLElement>(REVEAL)).filter(
      (el) => !el.closest(".hero"),
    );
    items.forEach((el) => {
      el.setAttribute("data-reveal", "");
      const siblings = Array.from(el.parentElement?.children ?? []).filter((c) => c.hasAttribute("data-reveal"));
      el.style.setProperty("--d", `${Math.min(siblings.indexOf(el), 6) * 90}ms`);
    });
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            // Quem foi pulado (ex.: clique no menu) já passou da tela e entra revelado.
            if (e.isIntersecting || e.boundingClientRect.top < 0) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
      );
      items.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // Barra de progresso, menu com fundo ao rolar e parallax da foto.
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--progress", String(max > 0 ? y / max : 0));
        nav?.classList.toggle("is-stuck", y > 40);
        if (hero && !reduce) hero.style.setProperty("--scroll", String(Math.min(y, hero.offsetHeight)));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // Link do menu acompanha a seção visível.
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.getAttribute("href") ?? ""))
      .filter((s): s is HTMLElement => !!s);
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${e.target.id}`));
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => spy.observe(s));
    cleanups.push(() => spy.disconnect());

    if (fine && !reduce) {
      // Hero: luz e foto seguem o mouse.
      if (hero) {
        const onMove = (e: MouseEvent) => {
          const r = hero.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          hero.style.setProperty("--mx", `${(nx + 0.5) * 100}%`);
          hero.style.setProperty("--my", `${(ny + 0.5) * 100}%`);
          hero.style.setProperty("--px", String(nx));
          hero.style.setProperty("--py", String(ny));
        };
        hero.addEventListener("mousemove", onMove);
        cleanups.push(() => hero.removeEventListener("mousemove", onMove));
      }

      // Botões magnéticos.
      document.querySelectorAll<HTMLElement>(".gold-btn").forEach((btn) => {
        const move = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
          btn.style.transform = `translate(${x}px, ${y}px)`;
        };
        const leave = () => (btn.style.transform = "");
        btn.addEventListener("mousemove", move);
        btn.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          btn.removeEventListener("mousemove", move);
          btn.removeEventListener("mouseleave", leave);
        });
      });

      // Foto "Sobre" inclina com o mouse.
      const photo = document.querySelector<HTMLElement>(".about-photo");
      if (photo) {
        const move = (e: MouseEvent) => {
          const r = photo.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          photo.style.setProperty("--rx", `${(-ny * 5).toFixed(2)}deg`);
          photo.style.setProperty("--ry", `${(nx * 6).toFixed(2)}deg`);
        };
        const leave = () => {
          photo.style.setProperty("--rx", "0deg");
          photo.style.setProperty("--ry", "0deg");
        };
        photo.addEventListener("mousemove", move);
        photo.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          photo.removeEventListener("mousemove", move);
          photo.removeEventListener("mouseleave", leave);
        });
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <div className="progress" aria-hidden="true" />;
}
