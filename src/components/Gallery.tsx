import { useTranslations } from 'next-intl';

type GalleryItem = { img: string; caption: string; large?: boolean };

export default function Gallery() {
  const t = useTranslations('gallery');
  const items = t.raw('items') as GalleryItem[];

  return (
    <section className="gallery">
      <div className="gallery__header reveal">
        <p className="section-label">{t('label')}</p>
        <h2 className="section-title">{t('title')}</h2>
      </div>
      <div className="gallery__grid">
        {items.map((item, i) => (
          <div
            key={i}
            className={`gallery__item${item.large ? ' gallery__item--large' : ''} reveal`}
          >
            <img
              src={item.img}
              alt={item.caption}
              className="section-img"
              width={item.large ? 1000 : 600}
              height={item.large ? 667 : 400}
              loading="lazy"
            />
            <div className="gallery__item-overlay">
              <span>{item.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
