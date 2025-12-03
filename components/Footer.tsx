import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-white/10 mt-20 relative bg-gray-50 dark:bg-[#0a0f1e]">
       <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
         <p className="text-gray-500 text-sm">
           © {new Date().getFullYear()} Bennefit Christy Saragih. All rights reserved.
         </p>
         
         <div className="flex gap-4">
            {SOCIAL_LINKS.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a 
                  key={idx} 
                  href={link.href}
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Icon size={18} />
                </a>
              )
            })}
         </div>
       </div>
    </footer>
  );
};

export default Footer;