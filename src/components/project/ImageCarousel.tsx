'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface ImageCarouselProps {
  images: string[];
  gradient: string;
  isHovered: boolean;
  projectTitle: string;
}

export function ImageCarousel({ images, gradient, isHovered, projectTitle }: ImageCarouselProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Sync selected index with Embla carousel
  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    handleSelect();
    emblaApi.on('select', handleSelect);
    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const slides = images.map((src) => ({ src }));

  return (
    <>
      <div className="relative aspect-video overflow-hidden bg-muted group">
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} z-0`} />

        {/* Embla Carousel */}
        <div className="absolute inset-0 z-10" ref={emblaRef}>
          <div className="flex h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative flex-[0_0_100%] min-w-0 h-full cursor-zoom-in"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image}
                  alt={`${projectTitle} — скриншот ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollPrev();
              }}
              className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-all z-20 cursor-pointer ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollNext();
              }}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-all z-20 cursor-pointer ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  emblaApi?.scrollTo(index);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  index === selectedIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/70 w-2'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
        thumbnails={{
          position: 'bottom',
          width: 100,
          height: 60,
        }}
        carousel={{
          finite: false,
        }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </>
  );
}
