import { useTranslations } from 'next-intl';

type Review = { text: string; name: string; meta: string };

export default function Reviews() {
  const t = useTranslations('reviews');
  const items = t.raw('items') as Review[];

  return (
    <section className="testimonials" id="reviews">
      <div className="testimonials__container">
        <div className="testimonials__header reveal">
          <p className="section-label">{t('label')}</p>
          <h2 className="section-title">{t('title')}</h2>
        </div>
        <div className="testimonials__grid">
          {items.map((item, i) => (
            <div className="testimonial reveal" key={i}>
              <div className="testimonial__stars" aria-label="5 / 5">
                ★★★★★
              </div>
              <p className="testimonial__text">{item.text}</p>
              <div className="testimonial__author">
                <span className="testimonial__name">{item.name}</span>
                <span className="testimonial__meta">{item.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
