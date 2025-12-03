import React from 'react';
import { SKILLS_DATA, CERTIFICATIONS_DATA, EDUCATION_DATA } from '../constants';
import GlassCard from './GlassCard';
import SectionHeader from './SectionHeader';
import ScrollReveal from './ScrollReveal';
import { Award, GraduationCap } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Skills */}
        <div>
          <ScrollReveal>
            <SectionHeader title="Technical Skills" />
          </ScrollReveal>
          
          <div className="space-y-6">
            {SKILLS_DATA.map((category, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <GlassCard className="!p-6" hoverEffect={false}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-gray-200 dark:border-white/10 text-blue-800 dark:text-blue-100 hover:border-blue-400/50 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

           <div className="mt-10">
            <ScrollReveal delay={200}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <GraduationCap className="text-blue-500 dark:text-blue-400" /> Education
              </h3>
            </ScrollReveal>
            {EDUCATION_DATA.map((edu, index) => (
              <ScrollReveal key={index} delay={300}>
                <GlassCard className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{edu.institution}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{edu.degree}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{edu.location}</p>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <span className="block text-blue-600 dark:text-blue-300 font-mono text-sm">{edu.period}</span>
                      <span className="block text-green-600 dark:text-green-400 text-sm font-semibold mt-1">GPA {edu.gpa}</span>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Right Column: Certifications */}
        <div>
          <ScrollReveal delay={200}>
             <SectionHeader title="Certifications" subtitle="Continuous learning and professional development." />
          </ScrollReveal>
          
          <div className="space-y-4">
            {CERTIFICATIONS_DATA.map((cert, index) => (
              <ScrollReveal key={index} delay={index * 100 + 200}>
                <GlassCard className="flex gap-4 items-start">
                  <div className="mt-1 p-2 bg-yellow-500/10 rounded-full text-yellow-600 dark:text-yellow-500 shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white leading-tight mb-1">{cert.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{cert.issuer}</p>
                    <p className="text-xs text-gray-500 font-mono">{cert.period}</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;