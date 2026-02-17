"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const locales = [
  { code: "en" as const, label: "EN", name: "English" },
  { code: "ja" as const, label: "JA", name: "日本語" },
  { code: "ko" as const, label: "KO", name: "한국어" },
  { code: "zh" as const, label: "ZH", name: "中文" },
  { code: "es" as const, label: "ES", name: "Español" },
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function switchLocale(nextLocale: "en" | "ja" | "ko" | "zh" | "es") {
    router.replace(pathname, { locale: nextLocale });
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-sl-border bg-sl-bg-elevated px-2.5 py-1.5 text-xs text-sl-text-secondary hover:text-sl-text-primary transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a15 15 0 014 9 15 15 0 01-4 9 15 15 0 01-4-9 15 15 0 014-9z" />
        </svg>
        {current.label}
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-36 rounded-lg border border-sl-border bg-sl-bg-surface shadow-lg overflow-hidden z-50">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                locale === l.code
                  ? "bg-sl-accent/10 text-sl-accent"
                  : "text-sl-text-secondary hover:bg-sl-bg-hover hover:text-sl-text-primary"
              }`}
            >
              <span>{l.name}</span>
              <span className="text-[10px] opacity-60">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
