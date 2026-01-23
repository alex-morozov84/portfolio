'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';
import { DURATION, DELAY, EASE } from '@/lib/animations';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: DURATION.slow,
        delay: index * DELAY.staggerSlow,
        ease: EASE.smooth,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 blur-xl transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 0.7 : 0 }}
        aria-hidden="true"
      />

      {/* Flip card container */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: DURATION.slow, ease: EASE.bounce }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <CardFront project={project} isHovered={isHovered} onFlip={handleFlip} />
        <CardBack project={project} onFlip={handleFlip} />
      </motion.div>
    </motion.div>
  );
}
