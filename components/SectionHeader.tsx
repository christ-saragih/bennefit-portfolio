import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-10 text-center md:text-left">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
        {title}
        <span className="text-blue-500 dark:text-blue-400">.</span>
      </h2>
      {subtitle && <p className="text-gray-600 dark:text-gray-400 max-w-2xl">{subtitle}</p>}
      <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 mx-auto md:mx-0 opacity-70"></div>
    </div>
  );
};

export default SectionHeader;