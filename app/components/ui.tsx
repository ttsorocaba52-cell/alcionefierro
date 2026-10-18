import { linkProps } from "../site";

export function ArrowUpRight({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2.5 7.5 7.5 2.5M3.5 2.5h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GoldButton({ href, children }: { href?: string; children: React.ReactNode }) {
  const inner = (
    <>
      <span>{children}</span>
      <span className="gold-btn-dot">
        <ArrowUpRight />
      </span>
    </>
  );
  if (!href) {
    return (
      <button type="button" className="gold-btn">
        {inner}
      </button>
    );
  }
  return (
    <a className="gold-btn" href={href} {...linkProps(href)}>
      {inner}
    </a>
  );
}

export function ChapterHead({ number, label }: { number: string; label: string }) {
  return (
    <div className="chapter-head">
      <span className="chapter-num">{number}</span>
      <span className="chapter-label">
        <small>Capítulo</small>
        <strong>{label}</strong>
      </span>
      <span className="chapter-rule" />
    </div>
  );
}
