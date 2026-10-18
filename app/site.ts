// Contato do Alcione. Todos os botões de ação abrem esta conversa no WhatsApp.
// Para voltar a rolar até o bloco final, troque por `undefined`.
export const WHATSAPP_URL: string | undefined =
  "https://wa.me/5551993981347?text=" +
  encodeURIComponent("Olá, Alcione! Vim pelo site e quero agendar uma conversa estratégica.");

export const INSTAGRAM_URL = "https://instagram.com/";

export const CONTACT_HREF = WHATSAPP_URL ?? "#contato";

export function linkProps(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
