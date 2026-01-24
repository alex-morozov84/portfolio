'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { locales, Locale } from '@/i18n/config';
import { useTransition } from 'react';
import { hoverScale, tapScale } from '@/lib/animations';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (newLocale: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div
      className="flex gap-1 p-1 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50"
      role="group"
      aria-label="Language switcher"
    >
      {locales.map((l) => {
        const isActive = locale === l;
        return (
          <motion.button
            key={l}
            whileHover={hoverScale}
            whileTap={tapScale}
            onClick={() => handleChange(l)}
            disabled={isPending}
            className={`cursor-pointer px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
              isActive
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
            aria-label={l === 'en' ? 'English' : 'Русский'}
            aria-current={isActive ? 'true' : undefined}
          >
            {l.toUpperCase()}
          </motion.button>
        );
      })}
    </div>
  );
}
