import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

// Neo-brutalist card: solid fill, thick border, hard offset shadow (no glass/blur).
const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div
      className={`
        neo-card p-6 md:p-8
        ${hoverEffect ? 'neo-interactive' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
