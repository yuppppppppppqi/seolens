"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/" as const, label: t("home") },
    { href: "/features" as const, label: t("features") },
    { href: "/pricing" as const, label: t("pricing") },
    { href: "/blog" as const, label: t("blog") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sl-border bg-sl-bg-base/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="SEOLens" width={28} height={28} />
          <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            SEOLens
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href
                  ? "text-sl-text-primary"
                  : "text-sl-text-muted hover:text-sl-text-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex text-sm text-sl-text-muted hover:text-sl-text-secondary transition-colors"
          >
            {t("apiKeys")}
          </Link>
          <Link
            href="/tool"
            className="hidden sm:inline-flex rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-medium text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            {t("openTool")}
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-sl-text-muted hover:text-sl-text-primary"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-sl-border bg-sl-bg-surface px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm ${
                pathname === item.href
                  ? "text-sl-text-primary"
                  : "text-sl-text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm text-sl-text-muted"
          >
            {t("apiKeys")}
          </Link>
          <Link
            href="/tool"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-medium text-sl-accent"
          >
            {t("openTool")}
          </Link>
        </nav>
      )}
    </header>
  );
}
