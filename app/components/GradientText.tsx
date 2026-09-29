export function GradientText({
  children,
  colors = ["#c92e00", "#ff6a30", "#ffe3d6"],
  animationSpeed = 8,
  showBorder = false,
  className,
}: {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
}) {
  // repeat the first color at the end so the looping animation has no visible seam
  const stops = [...colors, colors[0]].join(", ");

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        backgroundImage: `linear-gradient(90deg, ${stops})`,
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        animation: `gradient-text-move ${animationSpeed}s linear infinite`,
        border: showBorder ? "1px solid currentColor" : undefined,
      }}
    >
      {children}
    </span>
  );
}
