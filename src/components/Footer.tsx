import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations();
  const nav = useTranslations('nav');
  const f = useTranslations('footer');

  const details = t.raw('access.details') as { tel?: string; desc: string }[];
  const phone = details.find((d) => d.tel);

  const sns = [
    { href: f('sns.instagram'), label: 'Instagram' },
    { href: f('sns.x'), label: 'X (Twitter)' },
    { href: f('sns.facebook'), label: 'Facebook' }
  ];

  const menuLinks = [
    { href: '#about', label: nav('about') },
    { href: '#menu', label: nav('menu') },
    { href: '#story', label: nav('story') },
    { href: '#access', label: nav('access') }
  ];

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo-jp">{nav('logoJp')}</span>
          <span className="footer__logo-en">{nav('logoEn')}</span>
          <p className="footer__tagline">{f('tagline')}</p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>{f('colMenu')}</h4>
            <ul>
              {menuLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>{f('colInfo')}</h4>
            <ul>
              <li>{f('info.hours')}</li>
              <li>{f('info.closed')}</li>
              {phone && (
                <li>
                  <a href={`tel:${phone.tel}`}>{phone.desc}</a>
                </li>
              )}
            </ul>
          </div>

          <div className="footer__col">
            <h4>{f('colSns')}</h4>
            <ul>
              {sns.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-text">
          <p>{f('rights')}</p>
          <p className="footer__demo-note">{f('demoNote')}</p>
        </div>
        <div className="footer__legal">
          <Link href="/privacy">{f('privacy')}</Link>
          <Link href="/legal">{f('legal')}</Link>
        </div>
      </div>
    </footer>
  );
}
