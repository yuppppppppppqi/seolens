"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import CountrySelect from "./CountrySelect";
import LanguageSelect from "./LanguageSelect";
import { COUNTRIES } from "@/lib/constants";

const LS_KEY_COUNTRY = "seolens_country";
const LS_KEY_LANGUAGE = "seolens_language";

interface SearchBarProps {
  onSearch: (
    keyword: string,
    countryCode: string,
    languageCode: string
  ) => void;
  loading: boolean;
  initialKeyword?: string;
}

function getStored(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return localStorage.getItem(key) || fallback;
}

export default function SearchBar({ onSearch, loading, initialKeyword = "" }: SearchBarProps) {
  const t = useTranslations("tool.search");
  const [keyword, setKeyword] = useState(initialKeyword);
  const [countryCode, setCountryCode] = useState("US");
  const [languageCode, setLanguageCode] = useState("en");

  useEffect(() => {
    setCountryCode(getStored(LS_KEY_COUNTRY, "US"));
    setLanguageCode(getStored(LS_KEY_LANGUAGE, "en"));
  }, []);

  function handleCountryChange(code: string) {
    setCountryCode(code);
    localStorage.setItem(LS_KEY_COUNTRY, code);
    const country = COUNTRIES.find((c) => c.code === code);
    if (country) {
      setLanguageCode(country.defaultLanguage);
      localStorage.setItem(LS_KEY_LANGUAGE, country.defaultLanguage);
    }
  }

  function handleLanguageChange(code: string) {
    setLanguageCode(code);
    localStorage.setItem(LS_KEY_LANGUAGE, code);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) return;
    onSearch(trimmed, countryCode, languageCode);
  }

  const keywordCount = keyword
    .split(/[,\n]/)
    .map((k) => k.trim())
    .filter(Boolean).length;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <textarea
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={t("placeholder")}
          rows={keyword.includes("\n") || keyword.includes(",") ? 3 : 1}
          className="flex-1 rounded-lg border border-sl-border bg-sl-bg-elevated px-4 py-2.5 text-sm text-sl-text-primary placeholder:text-sl-text-muted focus:border-sl-accent focus:ring-1 focus:ring-sl-accent outline-none resize-none"
          disabled={loading}
        />
        <div className="flex sm:flex-col gap-3">
          <CountrySelect value={countryCode} onChange={handleCountryChange} />
          <LanguageSelect value={languageCode} onChange={handleLanguageChange} />
        </div>
        <button
          type="submit"
          disabled={loading || !keyword.trim()}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2.5 text-sm font-medium text-white hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] self-start"
        >
          {loading
            ? t("searching")
            : keywordCount > 1
              ? t("buttonMulti", { count: String(keywordCount) })
              : t("button")}
        </button>
      </div>
    </form>
  );
}
