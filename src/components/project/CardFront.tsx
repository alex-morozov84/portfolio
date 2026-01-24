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
      className="relative h-full flex flex-col rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden"
      style={{ backfaceVisibility: 'hidden' }}
    >
      {/* Image with title overlay */}
      <div className="relative">
        <ImageCarousel images={project.images} gradient={project.gradient} isHovered={isHovered} projectTitle={title} />

        {/* Title overlay - glass strip at top left */}
        <div className="absolute left-3 top-3 z-30 pointer-events-none">
          <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <h3 className={`text-sm font-bold bg-gradient-to-r ${project.titleStyle} bg-clip-text text-transparent`}>
              {title}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-5">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

        {/* Features tags */}
        <div className="flex-1 flex flex-wrap content-start gap-2 mb-4">
          {features.map((feature, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: DELAY.stagger * i }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg h-fit ${project.featureStyle}`}
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
