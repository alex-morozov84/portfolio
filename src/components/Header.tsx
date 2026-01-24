'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LocaleSwitcher } from './LocaleSwitcher';
import { DURATION, EASE, SCROLL, hoverScale, tapScale } from '@/lib/animations';
import { useMounted } from '@/lib/hooks';

const navItems = [
  { key: 'about', href: '#hero' },
  { key: 'services', href: '#services' },
  { key: 'projects', href: '#projects' },
  { key: 'faq', href: '#faq' },
  { key: 'contact', href: '#contact' },
];

export function Header() {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(
    scrollY,
    [SCROLL.headerOpacityStart, SCROLL.headerOpacityEnd],
    [0.7, 0.95]
  );
  const borderOpacity = useTransform(
    scrollY,
    [SCROLL.headerOpacityStart, SCROLL.headerOpacityEnd],
    [0, 1]
  );

  const isDark = mounted && resolvedTheme === 'dark';
  const logoSrc = isDark ? '/logo-light.png' : '/logo-dark.png';

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const wasMenuOpen = isMenuOpen;
    setIsMenuOpen(false);

    const doScroll = () => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Delay scroll if mobile menu was open to let animation finish
    if (wasMenuOpen) {
      setTimeout(doScroll, 100);
    } else {
      doScroll();
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.normal, ease: EASE.smooth }}
      style={{
        backgroundColor: `rgba(var(--background-rgb, 10, 10, 10), ${headerOpacity})`,
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl backdrop-saturate-150"
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-border"
        style={{ opacity: borderOpacity }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="/"
          whileHover={hoverScale}
          whileTap={tapScale}
          className="cursor-pointer flex items-center relative h-8"
          aria-label="Home"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={logoSrc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast }}
            >
              <Image
                src={logoSrc}
                alt="Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <motion.a
              key={item.key}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              whileHover={hoverScale}
              whileTap={tapScale}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              {t(item.key)}
            </motion.a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeSwitcher />

          {/* Mobile menu button */}
          <motion.button
            whileHover={hoverScale}
            whileTap={tapScale}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.fast }}
            className="md:hidden border-t border-border/50 overflow-hidden"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  whileTap={tapScale}
                  className="cursor-pointer px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                >
                  {t(item.key)}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
