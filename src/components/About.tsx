import { useTranslations } from 'next-intl';
import Html from './Html';
import Counter from './Counter';

type Stat = { num: string; unit: string; label: string };

export default function About() {
  const t = useTranslations('about');
  const stats = t.raw('stats') as Stat[];

  return (
    <section className="about" id="about">
      <div className="about__container">
        <div className="about__visual">
          <div className="about__img-wrap reveal-left">
            <div className="about__img about__img--main">
              <img
                src="https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&q=80&auto=format&fit=crop"
                alt=""
                className="section-img"
                width={800}
                height={533}
                loading="lazy"
              />
            </div>
            <div className="about__img about__img--accent">
              <img
                src="https://images.unsplash.com/photo-1558869632-81053b328001?w=600&q=80&auto=format&fit=crop"
                alt=""
                className="section-img"
                width={600}
                height={400}
                loading="lazy"
              />
            </div>
          </div>
          <div className="about__badge reveal-left">
            <span className="about__badge-year">{t('foundedYear')}</span>
            <span className="about__badge-text">{t('foundedLabel')}</span>
          </div>
        </div>

        <div className="about__text reveal-right">
          <p className="section-label">{t('label')}</p>
          <Html as="h2" className="section-title" text={t.raw('title')} />
          <p className="about__lead">{t('lead')}</p>
          <p className="about__body">{t('body1')}</p>
          <p className="about__body">{t('body2')}</p>

          <div className="about__stats">
            {stats.map((s, i) => (
              <div className="about__stat" key={i}>
                <Counter value={s.num} />
                <span className="about__stat-unit">{s.unit}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
