interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({
  children,
  className = "",
}: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
