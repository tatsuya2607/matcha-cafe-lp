import { useTranslations } from 'next-intl';
import Html from './Html';

type Detail = { term: string; desc: string; tel?: string };
type Transport = { icon: string; title: string; desc: string };

export default function Access() {
  const t = useTranslations('access');
  const details = t.raw('details') as Detail[];
  const transport = t.raw('transport') as Transport[];

  return (
    <section className="access" id="access">
      <div className="access__container">
        <div className="access__info reveal-left">
          <p className="section-label">{t('label')}</p>
          <h2 className="section-title">{t('title')}</h2>

          <dl className="access__dl">
            {details.map((d, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <dt>{d.term}</dt>
                {d.tel ? (
                  <dd>
                    <a href={`tel:${d.tel}`}>{d.desc}</a>
                  </dd>
                ) : (
                  <Html as="dd" text={d.desc} />
                )}
              </div>
            ))}
          </dl>

          <div className="access__transport">
            {transport.map((tr, i) => (
              <div className="access__transport-item" key={i}>
                <span className="access__transport-icon">{tr.icon}</span>
                <div>
                  <strong>{tr.title}</strong>
                  <Html as="p" text={tr.desc} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="access__map reveal-right">
          <div className="access__map-frame">
            <iframe
              src={t('mapEmbed')}
              title={t('mapTitle')}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={t('mapUrl')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline btn--sm access__map-link"
          >
            {t('mapCta')}
          </a>
        </div>
      </div>
    </section>
  );
}
