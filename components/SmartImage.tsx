import React, { useState } from "react";
import { ImageOff } from "lucide-react";

interface SmartImageProps {
  src: string;
  alt: string;
  /** Classes applied to the <img> element */
  className?: string;
  /** Classes applied to the wrapper <div> (controls size) */
  wrapperClassName?: string;
  /** Load immediately instead of lazily — use for above-the-fold / LCP images */
  eager?: boolean;
}

// Image with a brutalist skeleton placeholder, native lazy-loading, fade-in,
// and a graceful broken-image fallback.
const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  eager = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Skeleton while loading */}
      {!loaded && !error && (
        <div
          className="absolute inset-0 animate-pulse bg-ink/10 dark:bg-chalk/10"
          aria-hidden="true"
        />
      )}

      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-ink/5 dark:bg-chalk/5">
          <ImageOff size={28} className="text-ink/40 dark:text-chalk/40" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`${className} transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

export default SmartImage;
