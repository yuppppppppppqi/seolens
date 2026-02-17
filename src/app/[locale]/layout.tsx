import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("title"),
      template: "%s | SEOLens",
    },
    description: t("description"),
    metadataBase: new URL("https://seolens.dev"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ja: "/ja",
        ko: "/ko",
        zh: "/zh",
        es: "/es",
      },
    },
    openGraph: {
      type: "website" as const,
      locale: locale === "ja" ? "ja_JP" : locale === "ko" ? "ko_KR" : locale === "zh" ? "zh_TW" : locale === "es" ? "es_ES" : "en_US",
      siteName: "SEOLens",
    },
    twitter: {
      card: "summary_large_image" as const,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ja" | "ko" | "zh" | "es")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
