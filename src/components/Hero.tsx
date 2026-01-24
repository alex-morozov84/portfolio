'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Mail, Send } from 'lucide-react';
import { SiGithub, SiTelegram } from '@icons-pack/react-simple-icons';
import { contacts } from '@/data/projects';
import { useRef } from 'react';
import {
  DURATION,
  DELAY,
  EASE,
  PARALLAX,
  staggerContainer,
  hoverScale,
  tapScale,
} from '@/lib/animations';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.smooth },
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

  // Content parallax
  const y = useTransform(scrollYProgress, [0, 1], [0, PARALLAX.content]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Decorative circles parallax (different speeds for depth effect)
  const circle1Y = useTransform(scrollYProgress, [0, 1], [0, PARALLAX.circle1]);
  const circle2Y = useTransform(scrollYProgress, [0, 1], [0, PARALLAX.circle2]);
  const circle3Y = useTransform(scrollYProgress, [0, 1], [0, PARALLAX.circle3]);

  const stats = [
    { value: '5+', label: tStats('years') },
    { value: '20+', label: tStats('projects') },
    { value: '15+', label: tStats('clients') },
  ];

  return (
    <section id="hero" ref={ref} className="py-12 md:py-20 relative">
      {/* Decorative background circles with parallax */}
      <motion.div
        style={{ y: circle1Y }}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-violet-500/30 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: circle2Y }}
        className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-fuchsia-500/20 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: circle3Y }}
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
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
              transition={{ delay: 0.5 + i * DELAY.stagger }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.button
            onClick={() => {
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold text-lg shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
          >
            <Send className="w-5 h-5" aria-hidden="true" />
            {t('cta')}
          </motion.button>
        </motion.div>

        {/* Contact buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-3">
          {contacts.emails.map((email) => (
            <motion.a
              key={email}
              href={`mailto:${email}`}
              whileHover={hoverScale}
              whileTap={tapScale}
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all"
            >
              <Mail className="w-5 h-5 text-violet-500" aria-hidden="true" />
              <span className="text-sm font-medium">{email}</span>
            </motion.a>
          ))}

          <motion.a
            href={contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={hoverScale}
            whileTap={tapScale}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
          >
            <SiTelegram className="w-5 h-5" aria-hidden="true" />
            Telegram
          </motion.a>

          <motion.a
            href={contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={hoverScale}
            whileTap={tapScale}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all"
          >
            <SiGithub className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm font-medium">GitHub</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
