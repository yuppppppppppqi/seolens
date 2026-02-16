"use client";

import { LANGUAGES } from "@/lib/constants";

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LanguageSelect({
  value,
  onChange,
}: LanguageSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-sl-border bg-sl-bg-elevated px-3 py-2.5 text-sm text-sl-text-primary focus:border-sl-accent focus:ring-1 focus:ring-sl-accent outline-none"
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.name}
        </option>
      ))}
    </select>
  );
}
