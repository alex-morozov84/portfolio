'use client';

import { ThemeSwitcher } from './ThemeSwitcher';
import { LocaleSwitcher } from './LocaleSwitcher';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

const navItems = [
  { key: 'about', href: '#hero' },
  { key: 'services', href: '#services' },
  { key: 'projects', href: '#projects' },
];

export function Header() {
  const t = useTranslations('nav');
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [0.7, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      style={{
        backgroundColor: `rgba(var(--background-rgb, 10, 10, 10), ${headerOpacity})`,
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl backdrop-saturate-150"
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-border"
        style={{ opacity: borderOpacity }}
      />
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
        >
          AM
        </motion.a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.a
              key={item.key}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              {t(item.key)}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </motion.header>
  );
}
