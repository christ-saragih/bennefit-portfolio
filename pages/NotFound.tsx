import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center gap-2 neo bg-accent text-ink px-4 py-2 font-mono text-sm font-bold uppercase mb-8">
          <AlertTriangle size={16} /> Error 404
        </div>

        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter leading-none">404</h1>

        <p className="mt-6 text-xl md:text-2xl font-bold uppercase">Page Not Found</p>
        <p className="mt-3 text-ink/70 dark:text-chalk/70 leading-relaxed">
          The page you're looking for doesn't exist, was moved, or never existed in the first place.
        </p>

        <Link
          to="/"
          className="neo-btn bg-accent text-ink px-6 py-3 font-mono text-sm uppercase mt-8 group"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
