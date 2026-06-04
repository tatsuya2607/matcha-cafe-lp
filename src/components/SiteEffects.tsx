'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

export default function SiteEffects() {
  // Re-run when locale changes, since the page content remounts.
  const locale = useLocale();

  useEffect(() => {
    const nav = document.getElementById('nav');
    const progress = document.querySelector<HTMLElement>('.scroll-progress');

    const onScroll = () => {
      const y = window.scrollY;
      if (nav) {
        nav.classList.toggle('scrolled', y > 60);
        nav.classList.toggle('hero-area', y < window.innerHeight * 0.8);
      }
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.setProperty('--progress', String(max > 0 ? y / max : 0));
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Scroll reveal
    const revealEls = Array.from(
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    );
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const parent = entry.target.parentElement;
          const siblings = parent
            ? Array.from(
                parent.querySelectorAll('.reveal, .reveal-left, .reveal-right')
              )
            : [entry.target];
          const idx = siblings.indexOf(entry.target);
          window.setTimeout(
            () => entry.target.classList.add('revealed'),
            Math.max(idx, 0) * 80
          );
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    // Smooth anchor scroll (event delegation survives re-renders)
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav?.offsetHeight ?? 0;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick);
      revealObserver.disconnect();
    };
  }, [locale]);

  return null;
}
