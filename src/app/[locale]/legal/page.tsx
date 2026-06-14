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
  const t = await getTranslations({ locale, namespace: 'legalPages.legal' });
  return { title: t('title'), robots: { index: false } };
}

export default async function LegalPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legalPages');
  const l = await getTranslations('legalPages.legal');
  const rows = l.raw('rows') as { term: string; desc: string }[];

  return (
    <LegalArticle
      title={l('title')}
      updated={l('updated')}
      intro={l('intro')}
      demoNote={t('demoNote')}
      backHome={t('backHome')}
    >
      <dl className="legal__table">
        {rows.map((r) => (
          <div key={r.term} className="legal__row">
            <dt className="legal__term">{r.term}</dt>
            <dd className="legal__desc">{r.desc}</dd>
          </div>
        ))}
      </dl>
    </LegalArticle>
  );
}
