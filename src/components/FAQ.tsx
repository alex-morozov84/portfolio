'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { DURATION, DELAY } from '@/lib/animations';

const faqKeys = ['technologies', 'timeline', 'cost', 'support', 'communication'];

export function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: DURATION.slow }}
        className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent text-center"
      >
        {t('title')}
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqKeys.map((key, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: DURATION.normal,
              delay: index * DELAY.stagger,
            }}
            className="rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="cursor-pointer w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-medium pr-4">{t(`${key}.question`)}</span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                    {t(`${key}.answer`)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
