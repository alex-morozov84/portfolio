/**
 * Shared animation constants and configurations
 */

// Timing
export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.6,
} as const;

export const DELAY = {
  stagger: 0.1,
  staggerSlow: 0.15,
} as const;

// Easing curves
export const EASE = {
  smooth: [0.22, 1, 0.36, 1] as const,
  bounce: [0.23, 1, 0.32, 1] as const,
};

// Common animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.smooth },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.fast, ease: EASE.smooth },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DELAY.stagger,
      delayChildren: 0.2,
    },
  },
};

// Hover effects
export const hoverScale = {
  scale: 1.05,
  y: -2,
};

export const tapScale = {
  scale: 0.95,
};

// Parallax multipliers
export const PARALLAX = {
  content: 200,
  circle1: 300,
  circle2: 400,
  circle3: 250,
} as const;

// Scroll thresholds
export const SCROLL = {
  showScrollTop: 400,
  headerOpacityStart: 0,
  headerOpacityEnd: 50,
} as const;
