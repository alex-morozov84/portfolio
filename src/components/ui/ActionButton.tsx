'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Eye, ArrowLeft, Info } from 'lucide-react';
import { hoverScale, tapScale } from '@/lib/animations';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonIcon = 'demo' | 'live' | 'details' | 'back';

interface ActionButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  icon?: ButtonIcon;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const iconMap = {
  demo: Eye,
  live: ExternalLink,
  details: Info,
  back: ArrowLeft,
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40',
  secondary: 'bg-card border border-border text-foreground hover:bg-muted',
  ghost: 'bg-muted/50 border border-border/50 text-foreground hover:bg-muted',
};

export function ActionButton({
  href,
  onClick,
  variant = 'primary',
  icon,
  children,
  className = '',
  external = false,
}: ActionButtonProps) {
  const Icon = icon ? iconMap[icon] : null;
  const baseStyles =
    'cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all';

  const content = (
    <>
      {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        whileHover={hoverScale}
        whileTap={tapScale}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={hoverScale}
      whileTap={tapScale}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {content}
    </motion.button>
  );
}
