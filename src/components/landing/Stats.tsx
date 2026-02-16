import { useTranslations } from "next-intl";

export default function Stats() {
  const t = useTranslations("landing.stats");

  const stats = [
    { value: "20+", label: t("countries") },
    { value: "14", label: t("languages") },
    { value: "100K+", label: t("keywords") },
    { value: "3", label: t("apis") },
  ];

  return (
    <section className="border-y border-sl-border bg-sl-bg-surface">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-bold font-mono bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-sl-text-muted uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
