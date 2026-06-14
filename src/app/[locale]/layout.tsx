import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Cormorant_Garamond } from 'next/font/google';
import localFont from 'next/font/local';
import { routing, type Locale } from '@/i18n/routing';
import SiteEffects from '@/components/SiteEffects';
import '../globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif-en',
  display: 'swap'
});

// Self-hosted, glyph-subset Noto JP (see scripts/subset-fonts.py). Subsetting to
// the glyphs this site actually renders collapses next/font's 600+ unicode-range
// @font-face chunks into one file per weight, which the throttled mobile profile
// handles far better than the full CJK families.
const notoSerifJp = localFont({
  src: [
    { path: '../fonts/NotoSerifJP-300.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/NotoSerifJP-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/NotoSerifJP-500.woff2', weight: '500', style: 'normal' }
  ],
  variable: '--font-serif-jp',
  // 'optional' keeps the system-serif fallback if the web font can't arrive in
  // the block window, so the hero headline's LCP isn't delayed by a late swap.
  display: 'optional',
  fallback: ['serif']
});

const notoSansJp = localFont({
  src: [
    { path: '../fonts/NotoSansJP-300.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/NotoSansJP-400.woff2', weight: '400', style: 'normal' }
  ],
  variable: '--font-sans-jp',
  display: 'swap',
  fallback: ['sans-serif']
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const ogImage =
    (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://matcha-cafe-lp.vercel.app') +
    '/images/og.jpg';

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : undefined,
    alternates: {
      languages: { ja: '/ja', en: '/en' }
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630 }]
    },
    twitter: { card: 'summary_large_image' },
    icons: {
      icon:
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%232C4A2E'/><text y='.9em' font-size='80' x='10'>🍵</text></svg>"
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${cormorant.variable} ${notoSerifJp.variable} ${notoSansJp.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="scroll-progress" aria-hidden="true" />
          {children}
          <SiteEffects />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
