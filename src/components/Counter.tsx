'use client';

import { useEffect, useRef, useState } from 'react';

export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const target = parseFloat(value);
  const isDecimal = value.includes('.');
  const isNumeric = !Number.isNaN(target);
  const [display, setDisplay] = useState(isNumeric ? '0' : value);

  useEffect(() => {
    if (!isNumeric || !ref.current) return;
    const el = ref.current;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(isDecimal ? target.toFixed(1) : String(Math.round(target)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const v = target * eased;
            setDisplay(isDecimal ? v.toFixed(1) : String(Math.round(v)));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, isDecimal, isNumeric]);

  return <span ref={ref} className="about__stat-num">{display}</span>;
}
