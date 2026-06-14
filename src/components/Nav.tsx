'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Nav() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#about', label: t('about') },
    { href: '#menu', label: t('menu') },
    { href: '#story', label: t('story') },
    { href: '#reviews', label: t('reviews') },
    { href: '#access', label: t('access') },
    { href: '#contact', label: t('contact') }
  ];

  return (
    <>
      <nav className="nav hero-area" id="nav">
        <div className="nav__inner">
          <a href="#hero" className="nav__logo">
            <span className="nav__logo-jp">{t('logoJp')}</span>
            <span className="nav__logo-en">{t('logoEn')}</span>
          </a>

          <div className="nav__right">
            <ul className="nav__links">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
              <li>
                <a href="#visit" className="nav__reserve-btn">
                  {t('visit')}
                </a>
              </li>
            </ul>

            <LanguageSwitcher />

            <button
              className={`nav__hamburger${open ? ' open' : ''}`}
              aria-label={t('menuAria')}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <nav
        className={`mobile-menu${open ? ' open' : ''}`}
        aria-label={t('mobileAria')}
      >
        <ul>
          {[...links, { href: '#visit', label: t('visit') }].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="mobile-link"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
