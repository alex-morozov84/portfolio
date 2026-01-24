'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Users, Monitor, Code, RefreshCw } from 'lucide-react';
import { DURATION, DELAY } from '@/lib/animations';

const services = [
  {
    key: 'crm',
    icon: Users,
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    key: 'web',
    icon: Monitor,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    key: 'api',
    icon: Code,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    key: 'support',
    icon: RefreshCw,
    gradient: 'from-orange-500 to-amber-500',
  },
];

export function Services() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-8">
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
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: DURATION.normal,
                delay: index * DELAY.stagger,
              }}
              className="group relative p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-violet-500/30 hover:-translate-y-1 transition-[border-color,transform] duration-300"
            >
              {/* Gradient glow on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-xl`}
                aria-hidden="true"
              />

              <div className="relative">
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-4`}
                >
                  <Icon className="w-8 h-8" aria-hidden="true" />
                </div>

                <h3 className="text-lg font-semibold mb-2">{t(`${service.key}.title`)}</h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`${service.key}.description`)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
