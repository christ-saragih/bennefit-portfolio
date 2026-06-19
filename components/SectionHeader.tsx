import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-10 text-center md:text-left">
      <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight inline-block">
        {title}
      </h2>
      <div className="h-2 w-24 bg-accent border-2 border-ink dark:border-chalk mt-3 mx-auto md:mx-0"></div>
      {subtitle && (
        <p className="mt-4 text-ink/70 dark:text-chalk/70 max-w-2xl mx-auto md:mx-0">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
