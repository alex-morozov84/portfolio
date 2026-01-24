'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MessageSquare, Palette, Code, Rocket } from 'lucide-react';
import { DURATION, DELAY } from '@/lib/animations';

const steps = [
  {
    key: 'brief',
    icon: MessageSquare,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    key: 'design',
    icon: Palette,
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    key: 'development',
    icon: Code,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    key: 'launch',
    icon: Rocket,
    gradient: 'from-orange-500 to-amber-500',
  },
];

export function Process() {
  const t = useTranslations('process');

  return (
    <section id="process" className="py-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: DURATION.slow }}
        className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
      >
        {t('title')}
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: DURATION.normal,
                delay: index * DELAY.stagger,
              }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="group relative h-full p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-violet-500/30 transition-all">
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-xl`}
                  aria-hidden="true"
                />

                <div className="relative">
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                    {index + 1}
                  </div>

                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${step.gradient} text-white mb-4`}
                  >
                    <Icon className="w-8 h-8" aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{t(`${step.key}.title`)}</h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`${step.key}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
