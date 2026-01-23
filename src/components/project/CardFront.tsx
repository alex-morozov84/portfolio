'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Project } from '@/data/projects';
import { ImageCarousel } from './ImageCarousel';
import { ProjectActions } from './ProjectActions';
import { DELAY } from '@/lib/animations';

interface CardFrontProps {
  project: Project;
  isHovered: boolean;
  onFlip: () => void;
}

export function CardFront({ project, isHovered, onFlip }: CardFrontProps) {
  const t = useTranslations('projectData');

  const title = t(`${project.translationKey}.title`);
  const description = t(`${project.translationKey}.description`);
  const features = t.raw(`${project.translationKey}.features`) as string[];

  return (
    <div
      className="relative rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <ImageCarousel images={project.images} gradient={project.gradient} isHovered={isHovered} />

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

        {/* Features tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {features.map((feature, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: DELAY.stagger * i }}
              className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border/50"
            >
              {feature}
            </motion.span>
          ))}
        </div>

        <ProjectActions
          demoUrl={project.demoUrl}
          liveUrl={project.liveUrl}
          onDetailsClick={onFlip}
          showDetails
        />
      </div>
    </div>
  );
}
