'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { contacts } from '@/data/projects';
import { useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const t = useTranslations('hero');
  const tStats = useTranslations('stats');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Более выраженный параллакс
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Параллакс для декоративных элементов
  const circle1Y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const circle2Y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const circle3Y = useTransform(scrollYProgress, [0, 1], [0, 250]);

  const stats = [
    { value: '5+', label: tStats('years') },
    { value: '20+', label: tStats('projects') },
    { value: '15+', label: tStats('clients') },
  ];

  return (
    <section id="hero" ref={ref} className="py-12 md:py-20 relative min-h-[80vh]">
      {/* Декоративные круги с выраженным параллаксом */}
      <motion.div
        style={{ y: circle1Y }}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-violet-500/30 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        style={{ y: circle2Y }}
        className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-fuchsia-500/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: circle3Y }}
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y, opacity, scale }}
        className="max-w-3xl relative z-10"
      >
        <motion.p variants={itemVariants} className="text-muted-foreground text-lg mb-3">
          {t('greeting')}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-violet-500 bg-clip-text text-transparent"
        >
          {t('name')}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-3xl font-medium mb-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
        >
          {t('role')}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed"
        >
          {t('description')}
        </motion.p>

        {/* Stats */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-3">
          {/* Email buttons */}
          {contacts.emails.map((email) => (
            <motion.a
              key={email}
              href={`mailto:${email}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all"
            >
              <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">{email}</span>
            </motion.a>
          ))}

          {/* Telegram */}
          <motion.a
            href={contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
            Telegram
          </motion.a>

          {/* GitHub */}
          <motion.a
            href={contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="text-sm font-medium">GitHub</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
