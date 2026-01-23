'use client';

import { useTranslations } from 'next-intl';
import { projects } from '@/data/projects';
import { ProjectCard } from './project';
import { motion } from 'framer-motion';

export function ProjectsGrid() {
  const t = useTranslations('projects');

  return (
    <section id="projects" className="py-8 pb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
      >
        {t('title')}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
