// Contato do Alcione. Enquanto o WhatsApp não for preenchido, os botões de
// ação rolam até o bloco final da página e o botão de lá fica sem destino.
// TODO: colocar o link do WhatsApp aqui, ex.: "https://wa.me/55DDDNUMERO".
export const WHATSAPP_URL: string | undefined = undefined;

export const INSTAGRAM_URL = "https://instagram.com/";

export const CONTACT_HREF = WHATSAPP_URL ?? "#contato";

export function linkProps(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
