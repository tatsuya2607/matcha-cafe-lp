import { useTranslations } from 'next-intl';

export default function BrandBar() {
  const t = useTranslations();
  const items = t.raw('brandBar') as string[];

  return (
    <div className="brand-bar">
      <div className="brand-bar__inner">
        {items.map((item, i) => (
          <span key={i} style={{ display: 'contents' }}>
            <span>{item}</span>
            {i < items.length - 1 && <span className="brand-bar__dot">◆</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
