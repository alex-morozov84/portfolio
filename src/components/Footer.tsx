'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Mail } from 'lucide-react';
import { SiGithub, SiTelegram } from '@icons-pack/react-simple-icons';
import { contacts } from '@/data/projects';
import { hoverScale, tapScale } from '@/lib/animations';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale() as 'en' | 'ru';
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border/50 mt-auto"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              AM
            </span>
            <span className="text-muted-foreground text-sm">
              © {currentYear} {t('copyright')}
            </span>
          </div>

          {/* Social links */}
          <nav className="flex items-center gap-4" aria-label="Social links">
            <motion.a
              href={`mailto:${contacts.email[locale]}`}
              whileHover={hoverScale}
              whileTap={tapScale}
              className="cursor-pointer p-2.5 rounded-xl bg-muted/50 border border-border/50 hover:border-violet-500/50 hover:text-violet-500 transition-all"
              aria-label="Send email"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
            </motion.a>

            <motion.a
              href={contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={hoverScale}
              whileTap={tapScale}
              className="cursor-pointer p-2.5 rounded-xl bg-muted/50 border border-border/50 hover:border-blue-500/50 hover:text-blue-500 transition-all"
              aria-label="Telegram"
            >
              <SiTelegram className="w-5 h-5" aria-hidden="true" />
            </motion.a>

            <motion.a
              href={contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={hoverScale}
              whileTap={tapScale}
              className="cursor-pointer p-2.5 rounded-xl bg-muted/50 border border-border/50 hover:border-foreground/50 transition-all"
              aria-label="GitHub"
            >
              <SiGithub className="w-5 h-5" aria-hidden="true" />
            </motion.a>
          </nav>

          {/* Built with love */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t('built')}</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
              className="text-red-500"
              aria-label="love"
            >
              ❤️
            </motion.span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
