import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CTA() {
  const t = useTranslations("landing.cta");

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-sl-text-primary">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-sl-text-secondary">{t("subtitle")}</p>
        <div className="mt-8">
          <Link
            href="/tool"
            className="inline-flex rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3.5 text-base font-medium text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          >
            {t("button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
