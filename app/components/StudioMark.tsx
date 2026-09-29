export function StudioMark({
  size = 20,
  color = "#ff3c01",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <polygon points="20,3 27,13 20,18 13,13" fill={color} />
      <polygon points="20,37 27,27 20,22 13,27" fill={color} />
      <polygon points="3,20 13,13 18,20 13,27" fill={color} />
      <polygon points="37,20 27,13 22,20 27,27" fill={color} />
    </svg>
  );
}
