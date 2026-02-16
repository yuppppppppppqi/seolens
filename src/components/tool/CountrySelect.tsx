"use client";

import { COUNTRIES } from "@/lib/constants";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-sl-border bg-sl-bg-elevated px-3 py-2.5 text-sm text-sl-text-primary focus:border-sl-accent focus:ring-1 focus:ring-sl-accent outline-none"
    >
      {COUNTRIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.flag} {c.name}
        </option>
      ))}
    </select>
  );
}
