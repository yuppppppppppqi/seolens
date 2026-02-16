import { useTranslations } from "next-intl";

const stepIcons = [
  // Search icon
  <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>,
  // Chart icon
  <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
  </svg>,
  // Download icon
  <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>,
];

export default function HowItWorks() {
  const t = useTranslations("landing.howItWorks");

  const steps = [
    { title: t("step1.title"), description: t("step1.description") },
    { title: t("step2.title"), description: t("step2.description") },
    { title: t("step3.title"), description: t("step3.description") },
  ];

  return (
    <section className="py-20 border-t border-sl-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-sl-text-primary">
            {t("title")}
          </h2>
          <p className="mt-3 text-sl-text-secondary">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-violet-500/40" />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {/* Step number circle */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-transparent bg-sl-bg-surface mb-4 relative z-10 [background-image:linear-gradient(var(--sl-bg-surface),var(--sl-bg-surface)),linear-gradient(135deg,#06B6D4,#3B82F6,#8B5CF6)] [background-origin:border-box] [background-clip:padding-box,border-box]">
                <span className="text-sl-accent">{stepIcons[i]}</span>
              </div>
              <h3 className="text-lg font-semibold text-sl-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-sl-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
