import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div 
      className={`
        glass-panel rounded-2xl p-6 md:p-8 
        transition-all duration-300 ease-in-out
        ${hoverEffect ? 'hover:scale-[1.01] hover:shadow-xl dark:hover:bg-white/5 dark:hover:border-white/20' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;