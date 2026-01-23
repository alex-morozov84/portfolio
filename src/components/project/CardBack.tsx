'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, Check } from 'lucide-react';
import { Project } from '@/data/projects';
import { ProjectActions } from './ProjectActions';
import { DELAY } from '@/lib/animations';

interface CardBackProps {
  project: Project;
  onFlip: () => void;
}

export function CardBack({ project, onFlip }: CardBackProps) {
  const t = useTranslations('projectData');
  const tProjects = useTranslations('projects');

  const title = t(`${project.translationKey}.title`);
  const description = t(`${project.translationKey}.description`);
  const features = t.raw(`${project.translationKey}.features`) as string[];
  const highlights = t.raw(`${project.translationKey}.highlights`) as string[];

  return (
    <div
      className="absolute inset-0 rounded-2xl bg-card/95 backdrop-blur-sm border border-border/50 overflow-hidden"
      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`} />

      <div className="relative p-4 md:p-6 h-full flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="text-lg md:text-xl font-bold">{title}</h3>
          <motion.button
            onClick={onFlip}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        </div>

        <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">{description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
          {features.map((feature, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: DELAY.stagger * 0.3 * i }}
              className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold rounded-lg ${project.featureStyle}`}
            >
              {feature}
            </motion.span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mb-3 md:mb-4">
          <p className="text-[10px] md:text-xs text-muted-foreground mb-1.5 md:mb-2 font-medium uppercase tracking-wider">
            {tProjects('stack')}
          </p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {project.stack.map((tech, i) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: DELAY.stagger * 0.5 * i }}
                className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold rounded-lg bg-gradient-to-r ${tech.color} text-white shadow-lg shadow-black/20`}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Key features */}
        <div className="flex-1 min-h-0 overflow-y-auto mb-3 md:mb-4">
          <p className="text-[10px] md:text-xs text-muted-foreground mb-1.5 md:mb-2 font-medium uppercase tracking-wider">
            {tProjects('highlights')}
          </p>
          <ul className="space-y-1.5 md:space-y-2">
            {highlights.map((highlight, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: DELAY.stagger * i }}
                className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm"
              >
                <Check
                  className="w-3 h-3 md:w-4 md:h-4 text-violet-500 mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="pt-3 md:pt-4 border-t border-border/30">
          <ProjectActions
            demoUrl={project.demoUrl}
            liveUrl={project.liveUrl}
            onBackClick={onFlip}
            showBack
          />
        </div>
      </div>
    </div>
  );
}
