'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Html from './Html';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured';

export default function Contact() {
  const t = useTranslations('contact');
  const f = useTranslations('footer');
  const [status, setStatus] = useState<Status>('idle');

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!accessKey) {
      setStatus('unconfigured');
      return;
    }

    setStatus('sending');
    const data = new FormData(form);
    data.append('access_key', accessKey);
    data.append('subject', t('subject'));
    data.append('from_name', 'Kissa Midori Website');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__container reveal">
        <p className="section-label">{t('label')}</p>
        <h2 className="contact__title section-title">{t('title')}</h2>
        <Html as="p" className="contact__sub" text={t.raw('sub')} />

        <form className="contact__form" onSubmit={handleSubmit} noValidate={false}>
          <input
            type="checkbox"
            name="botcheck"
            className="contact__botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="contact__field">
            <label htmlFor="contact-name">{t('name')}</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              placeholder={t('namePlaceholder')}
              autoComplete="name"
            />
          </div>

          <div className="contact__field">
            <label htmlFor="contact-email">{t('email')}</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder={t('emailPlaceholder')}
              autoComplete="email"
            />
          </div>

          <div className="contact__field">
            <label htmlFor="contact-message">{t('message')}</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              placeholder={t('messagePlaceholder')}
            />
          </div>

          <button
            type="submit"
            className="btn btn--green contact__submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? t('sending') : t('submit')}
          </button>

          <p className="contact__privacy">
            {t('privacyNote')}{' '}
            <Link href="/privacy">{f('privacy')}</Link>
          </p>

          <p className="contact__status" role="status" aria-live="polite">
            {status === 'success' && <span className="contact__ok">{t('success')}</span>}
            {status === 'error' && <span className="contact__err">{t('error')}</span>}
            {status === 'unconfigured' && (
              <span className="contact__note">{t('unconfigured')}</span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
