import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-ink dark:border-chalk mt-20 bg-paper dark:bg-night relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-sm text-ink/70 dark:text-chalk/70 text-center md:text-left">
          © {new Date().getFullYear()} Bennefit Christy Saragih.
          <span className="hidden sm:inline"> All rights reserved.</span>
        </p>

        <div className="flex gap-3">
          {SOCIAL_LINKS.map((link, idx) => {
            const Icon = link.icon;
            return (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="neo bg-paper dark:bg-night p-2.5 transition-transform hover:-translate-y-1"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
