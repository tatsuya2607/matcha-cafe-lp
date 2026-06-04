import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const nav = useTranslations('nav');
  const f = useTranslations('footer');

  const details = t.raw('access.details') as { tel?: string; desc: string }[];
  const phone = details.find((d) => d.tel);

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
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>{f('rights')}</p>
        <div className="footer__legal">
          <a href="#">{f('privacy')}</a>
          <a href="#">{f('legal')}</a>
        </div>
      </div>
    </footer>
  );
}
