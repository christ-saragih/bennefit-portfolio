import React, { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "../types";

interface LightboxProps {
  images: ProjectImage[];
  startIndex?: number;
  alt?: string;
  onClose: () => void;
}

// Brutalist image lightbox: dark backdrop, hard-framed image, arrow + keyboard navigation.
const Lightbox: React.FC<LightboxProps> = ({
  images,
  startIndex = 0,
  alt = "Image",
  onClose,
}) => {
  const [current, setCurrent] = useState(startIndex);
  const hasMultiple = images.length > 1;
  const image = images[current];

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length]
  );

  // Keyboard navigation + lock background scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  return (
    <div
      // Scrim stays dark in both themes — it exists to isolate the image, not to
      // follow the page. Only the card inside it is theme-aware.
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 backdrop-blur-sm p-4 sm:p-8 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 neo bg-accent text-ink p-2"
        aria-label="Close gallery"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      {hasMultiple && (
        <span className="absolute top-5 left-1/2 -translate-x-1/2 z-20 neo-tag bg-paper dark:bg-night">
          {current + 1} / {images.length}
        </span>
      )}

      {/* Previous */}
      {hasMultiple && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 neo bg-paper dark:bg-night p-2 sm:p-3 transition-transform hover:-translate-x-0.5"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Image */}
      <div
        className="relative flex flex-col max-w-5xl max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.url}
          alt={image.alt ?? `${alt} ${current + 1}`}
          className="block max-w-full min-h-0 flex-1 object-contain border-2 border-ink dark:border-chalk shadow-neo dark:shadow-neo-chalk bg-paper dark:bg-night"
        />
        {image.caption && (
          <p className="shrink-0 max-w-full border-2 border-t-0 border-ink dark:border-chalk bg-paper dark:bg-night px-4 py-3 font-mono text-xs sm:text-sm leading-relaxed text-ink/80 dark:text-chalk/80">
            {image.caption}
          </p>
        )}
      </div>

      {/* Next */}
      {hasMultiple && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 neo bg-paper dark:bg-night p-2 sm:p-3 transition-transform hover:translate-x-0.5"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

export default Lightbox;
