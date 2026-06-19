import React, { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
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
        className="relative max-w-5xl max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          className="block max-w-full max-h-[85vh] object-contain border-2 border-chalk shadow-neo-chalk bg-night"
        />
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
