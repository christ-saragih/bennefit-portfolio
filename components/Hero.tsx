import React from 'react';
import { Download } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import GlassCard from './GlassCard';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="order-2 lg:order-1 animate-fade-in space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 text-sm font-medium">
              Available for Internship / Full-time
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
              Hello, I'm <br />
              <span className="text-gradient">{PERSONAL_INFO.name}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light">
              {PERSONAL_INFO.role} based in {PERSONAL_INFO.location}
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl">
              {PERSONAL_INFO.about}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {SOCIAL_LINKS.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 hover:bg-gray-300 dark:hover:bg-white/10 hover:scale-110 transition-all text-gray-700 dark:text-white"
                    aria-label={link.label}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in">
            <GlassCard className="w-full max-w-md relative overflow-hidden group !p-1">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Abstract Code Representation Visualization */}
              <div className="bg-gray-100 dark:bg-black/40 rounded-xl p-6 font-mono text-sm leading-relaxed overflow-hidden h-[300px] md:h-[400px] flex flex-col border border-gray-200 dark:border-white/5">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-blue-600 dark:text-blue-300">const <span className="text-yellow-600 dark:text-yellow-300">developer</span> = <span className="text-purple-600 dark:text-purple-300">{`{`}</span></div>
                <div className="pl-4 text-gray-600 dark:text-gray-300">name: <span className="text-green-600 dark:text-green-300">"{PERSONAL_INFO.name}"</span>,</div>
                <div className="pl-4 text-gray-600 dark:text-gray-300">role: <span className="text-green-600 dark:text-green-300">"{PERSONAL_INFO.role}"</span>,</div>
                <div className="pl-4 text-gray-600 dark:text-gray-300">gpa: <span className="text-orange-600 dark:text-orange-300">3.79</span>,</div>
                <div className="pl-4 text-gray-600 dark:text-gray-300">skills: <span className="text-purple-600 dark:text-purple-300">[</span></div>
                <div className="pl-8 text-green-600 dark:text-green-300">"React", "Next.js", "Angular",</div>
                <div className="pl-8 text-green-600 dark:text-green-300">"Express", "Prisma", "Laravel"</div>
                <div className="pl-4 text-purple-600 dark:text-purple-300">],</div>
                <div className="pl-4 text-gray-600 dark:text-gray-300">status: <span className="text-green-600 dark:text-green-300">"Ready to Code 🚀"</span></div>
                <div className="text-purple-600 dark:text-purple-300">{`}`};</div>
                
                <div className="mt-auto pt-4 text-center">
                   <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 w-full shadow-lg">
                    <Download size={18} /> Download CV
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;