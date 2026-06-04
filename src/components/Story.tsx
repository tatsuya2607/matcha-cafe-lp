import { useTranslations } from 'next-intl';
import Html from './Html';

type Step = { num: string; title: string; desc: string };

export default function Story() {
  const t = useTranslations('story');
  const steps = t.raw('steps') as Step[];

  return (
    <section className="story" id="story">
      <div className="story__container">
        <div className="story__text reveal-left">
          <p className="section-label">{t('label')}</p>
          <Html as="h2" className="section-title" text={t.raw('title')} />
          <p className="story__body">{t('body1')}</p>
          <p className="story__body">{t('body2')}</p>
          <a href="#visit" className="btn btn--green">
            {t('cta')}
          </a>
        </div>

        <div className="story__visual reveal-right">
          <div className="story__steps">
            {steps.map((step) => (
              <div className="story__step" key={step.num}>
                <div className="story__step-num">{step.num}</div>
                <div className="story__step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
