"use client";

interface DifficultyBadgeProps {
  difficulty: number | null;
}

function getDifficultyInfo(kd: number): { label: string; className: string } {
  if (kd <= 14)
    return {
      label: "Very Easy",
      className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    };
  if (kd <= 29)
    return {
      label: "Easy",
      className: "bg-green-500/15 text-green-400 border-green-500/20",
    };
  if (kd <= 49)
    return {
      label: "Moderate",
      className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    };
  if (kd <= 69)
    return {
      label: "Hard",
      className: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    };
  if (kd <= 84)
    return {
      label: "Very Hard",
      className: "bg-red-500/15 text-red-400 border-red-500/20",
    };
  return {
    label: "Extreme",
    className: "bg-red-600/15 text-red-300 border-red-600/20",
  };
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  if (difficulty === null || difficulty === undefined) {
    return <span className="text-sl-text-muted text-sm">N/A</span>;
  }

  const { label, className } = getDifficultyInfo(difficulty);

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}
      title={label}
    >
      {difficulty}
    </span>
  );
}
