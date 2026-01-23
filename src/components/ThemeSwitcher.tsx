'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { DURATION, hoverScale, tapScale } from '@/lib/animations';

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-muted/50 animate-pulse" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      whileHover={hoverScale}
      whileTap={tapScale}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="cursor-pointer relative p-2.5 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50 hover:border-violet-500/50 transition-colors overflow-hidden"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: DURATION.fast }}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400" aria-hidden="true" />
          ) : (
            <Moon className="w-5 h-5 text-violet-500" aria-hidden="true" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
