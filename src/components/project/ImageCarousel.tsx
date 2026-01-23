'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { DURATION } from '@/lib/animations';

interface ImageCarouselProps {
  images: string[];
  gradient: string;
  isHovered: boolean;
}

export function ImageCarousel({ images, gradient, isHovered }: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    } else if (info.offset.x < -threshold) {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }
  };

  const goToImage = (index: number) => setCurrentImage(index);
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative aspect-video overflow-hidden bg-muted touch-pan-y">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x, opacity }}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: DURATION.fast }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Placeholder gradient - replace with actual images */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
            <div className="relative z-10 text-muted-foreground/50 flex flex-col items-center gap-2">
              <ImageIcon className="w-16 h-16" strokeWidth={1} aria-hidden="true" />
              <span className="text-sm font-medium">
                {currentImage + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation arrows */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prevImage();
        }}
        className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors z-20"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          nextImage();
        }}
        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors z-20"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </motion.button>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToImage(i);
            }}
            className={`cursor-pointer w-2 h-2 rounded-full transition-all ${
              i === currentImage ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === currentImage ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
