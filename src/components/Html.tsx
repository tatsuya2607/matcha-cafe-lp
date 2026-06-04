import { createElement, type ElementType } from 'react';

/**
 * Renders trusted i18n strings that contain simple inline markup
 * (e.g. <br>, <br class="pc-only">). Content comes only from our own
 * message catalogs, so dangerouslySetInnerHTML is safe here.
 */
export default function Html({
  text,
  as = 'span',
  className
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  return createElement(as, {
    className,
    dangerouslySetInnerHTML: { __html: text }
  });
}
