'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type MenuItem = {
  category: 'drinks' | 'sweets' | 'set';
  tag?: string;
  featured?: boolean;
  name: string;
  sub?: string;
  desc: string;
  price: string;
  img: string;
  alt: string;
};

type TabKey = 'drinks' | 'sweets' | 'set';

export default function Menu() {
  const t = useTranslations('menu');
  const items = t.raw('items') as MenuItem[];
  const [active, setActive] = useState<TabKey>('drinks');

  const tabs: TabKey[] = ['drinks', 'sweets', 'set'];

  return (
    <section className="menu" id="menu">
      <div className="menu__container">
        <div className="menu__header">
          <p className="section-label reveal">{t('label')}</p>
          <h2 className="section-title reveal">{t('title')}</h2>
          <p className="menu__subtitle reveal">{t('subtitle')}</p>
        </div>

        <div className="menu__tabs reveal" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`menu__tab${active === tab ? ' active' : ''}`}
              role="tab"
              aria-selected={active === tab}
              onClick={() => setActive(tab)}
            >
              {t(`tabs.${tab}`)}
            </button>
          ))}
        </div>

        <div className="menu__grid" id="menuGrid">
          {items.map((item, i) => {
            const hidden = item.category !== active;
            return (
              <div
                key={i}
                className={[
                  'menu__item',
                  item.featured ? 'menu__item--featured' : '',
                  hidden ? 'menu__item--hidden' : ''
                ]
                  .filter(Boolean)
                  .join(' ')}
                data-category={item.category}
              >
                <div className="menu__item-img">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="section-img"
                    width={item.featured ? 800 : 600}
                    height={item.featured ? 533 : 400}
                    loading="lazy"
                  />
                </div>
                <div className="menu__item-info">
                  {item.tag && <span className="menu__item-tag">{item.tag}</span>}
                  <h3 className="menu__item-name">
                    {item.name}
                    {item.sub && <span> {item.sub}</span>}
                  </h3>
                  <p className="menu__item-desc">{item.desc}</p>
                  <span className="menu__item-price">{item.price}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="menu__footer reveal">
          <p>{t('note')}</p>
        </div>
      </div>
    </section>
  );
}
