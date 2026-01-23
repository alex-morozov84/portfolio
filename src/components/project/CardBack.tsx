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
  const tasks = t.raw(`${project.translationKey}.tasks`) as string[];

  return (
    <div
      className="absolute inset-0 rounded-2xl bg-card/95 backdrop-blur-sm border border-border/50 overflow-hidden"
      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`} />

      <div className="relative p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
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

        <p className="text-muted-foreground text-sm mb-4">{description}</p>

        {/* Tech stack */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
            {tProjects('stack')}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech, i) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: DELAY.stagger * 0.5 * i }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r ${tech.color} text-white shadow-lg shadow-black/20`}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Solved tasks */}
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
            {tProjects('tasks')}
          </p>
          <ul className="space-y-2">
            {tasks.map((task, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: DELAY.stagger * i }}
                className="flex items-start gap-2 text-sm"
              >
                <Check
                  className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{task}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-4">
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
