import React from 'react';
import { useProfile, useSocialLinks } from '../hooks/usePortfolio';
import { SOCIAL_ICONS } from '../lib/socialIcons';

const Footer: React.FC = () => {
  const { data: profile } = useProfile();
  const { data: socials } = useSocialLinks();
  const name = profile?.name ?? 'Bennefit Christy Saragih';

  return (
    <footer className="border-t-2 border-ink dark:border-chalk mt-20 bg-paper dark:bg-night relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-sm text-ink/70 dark:text-chalk/70 text-center md:text-left">
          © {new Date().getFullYear()} {name}.
          <span className="hidden sm:inline"> All rights reserved.</span>
        </p>

        <div className="flex gap-3">
          {(socials ?? []).map((link, idx) => {
            const Icon = SOCIAL_ICONS[link.platform] ?? SOCIAL_ICONS.other;
            return (
              <a
                key={idx}
                href={link.url}
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
