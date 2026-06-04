'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('language');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          className={`lang-switch__btn${loc === locale ? ' active' : ''}`}
          aria-pressed={loc === locale}
          disabled={isPending}
          onClick={() => switchTo(loc)}
        >
          {loc === 'ja' ? t('ja') : t('en')}
        </button>
      ))}
    </div>
  );
}
