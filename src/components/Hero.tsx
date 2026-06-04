import { useTranslations } from 'next-intl';
import Html from './Html';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <img
          src="/images/hero.webp"
          alt=""
          className="hero__bg-img"
          width={1600}
          height={1067}
          fetchPriority="high"
        />
        <div className="hero__overlay" />
        <div className="hero__pattern" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow reveal">{t('eyebrow')}</p>
        <h1 className="hero__title reveal">
          <Html as="span" className="hero__title-jp" text={t.raw('titleJp')} />
          <span className="hero__title-en">{t('titleEn')}</span>
        </h1>
        <Html as="p" className="hero__sub reveal" text={t.raw('sub')} />
        <div className="hero__cta reveal">
          <a href="#menu" className="btn btn--primary">
            {t('ctaMenu')}
          </a>
          <a href="#visit" className="btn btn--primary">
            {t('ctaVisit')}
          </a>
        </div>
      </div>

      <div className="hero__scroll">
        <span>{t('scroll')}</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
