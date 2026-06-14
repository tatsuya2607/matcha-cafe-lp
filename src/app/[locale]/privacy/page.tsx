import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import LegalArticle from '@/components/LegalArticle';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.privacy' });
  return { title: t('title'), robots: { index: false } };
}

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legalPages');
  const p = await getTranslations('legalPages.privacy');
  const sections = p.raw('sections') as { heading: string; body: string[] }[];

  return (
    <LegalArticle
      title={p('title')}
      updated={p('updated')}
      intro={p('intro')}
      demoNote={t('demoNote')}
      backHome={t('backHome')}
    >
      {sections.map((s) => (
        <section key={s.heading} className="legal__section">
          <h2 className="legal__heading">{s.heading}</h2>
          {s.body.map((b, i) => (
            <p key={i} className="legal__body">
              {b}
            </p>
          ))}
        </section>
      ))}
    </LegalArticle>
  );
}
