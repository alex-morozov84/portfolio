'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { locales, Locale } from '@/i18n/config';
import { useTransition } from 'react';

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
    <div className="flex gap-1 p-1 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50">
      {locales.map((l) => (
        <motion.button
          key={l}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleChange(l)}
          disabled={isPending}
          className={`cursor-pointer relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
            locale === l
              ? 'text-white'
              : 'text-muted-foreground hover:text-foreground'
          } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
        >
          {locale === l && (
            <motion.div
              layoutId="locale-indicator"
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{l.toUpperCase()}</span>
        </motion.button>
      ))}
    </div>
  );
}
