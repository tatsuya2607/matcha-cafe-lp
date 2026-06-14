import { useTranslations } from 'next-intl';
import Html from './Html';

export default function Visit() {
  const t = useTranslations('visit');

  return (
    <section className="visit" id="visit">
      <div className="visit__bg">
        <div className="visit__pattern" />
      </div>
      <div className="visit__container reveal">
        <p className="section-label section-label--light">{t('label')}</p>
        <Html as="h2" className="visit__title" text={t.raw('title')} />
        <Html as="p" className="visit__sub" text={t.raw('sub')} />
        <div className="visit__actions">
          <a href={`tel:${t('phone')}`} className="btn btn--light">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.87 9.81 19.79 19.79 0 01.81 1.18 2 2 0 012.81 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.97-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15.17v1.75z" />
            </svg>
            {t('phone')}
          </a>
          <a
            href={t('instagramUrl')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary-light"
          >
            {t('instagram')}
          </a>
        </div>
        <p className="visit__note">{t('note')}</p>
      </div>
    </section>
  );
}
