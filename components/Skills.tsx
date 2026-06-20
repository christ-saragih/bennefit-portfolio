import React from 'react';
import GlassCard from './GlassCard';
import SectionHeader from './SectionHeader';
import ScrollReveal from './ScrollReveal';
import { Loader, ErrorState } from './States';
import { useSkills, useEducation, useCertifications } from '../hooks/usePortfolio';
import { Award, GraduationCap } from 'lucide-react';

const Skills: React.FC = () => {
  const { data: skills, isLoading: skillsLoading, isError: skillsError } = useSkills();
  const { data: education, isLoading: eduLoading, isError: eduError } = useEducation();
  const { data: certifications, isLoading: certLoading, isError: certError } = useCertifications();

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left Column: Skills */}
        <div>
          <ScrollReveal>
            <SectionHeader title="Technical Skills" />
          </ScrollReveal>

          {skillsLoading && <Loader label="Loading skills" />}
          {skillsError && <ErrorState />}

          <div className="space-y-6">
            {skills?.map((category, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <GlassCard className="!p-6" hoverEffect={false}>
                  <h3 className="text-lg font-bold uppercase tracking-wide mb-4 pb-2 border-b-2 border-ink dark:border-chalk">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="neo-tag normal-case text-sm px-3 py-1 transition-transform hover:-translate-y-0.5 cursor-default"
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
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="neo bg-accent text-ink p-2">
                  <GraduationCap size={22} />
                </span>
                Education
              </h3>
            </ScrollReveal>
            {eduLoading && <Loader label="Loading education" />}
            {eduError && <ErrorState />}
            {education?.map((edu, index) => (
              <ScrollReveal key={index} delay={300}>
                <GlassCard className="mb-4" hoverEffect={false}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                    <div>
                      <h4 className="text-lg font-bold">{edu.institution}</h4>
                      <p className="text-ink/80 dark:text-chalk/80">{edu.degree}</p>
                      <p className="text-sm text-ink/60 dark:text-chalk/60 mt-1 font-mono">{edu.location}</p>
                    </div>
                    <div className="flex flex-row md:flex-col md:items-end gap-2 shrink-0">
                      <span className="font-mono text-sm">{edu.period}</span>
                      {edu.gpa && (
                        <span className="neo-tag bg-grass !text-ink normal-case">GPA {edu.gpa}</span>
                      )}
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

          {certLoading && <Loader label="Loading certifications" />}
          {certError && <ErrorState />}

          <div className="space-y-4">
            {certifications?.map((cert, index) => (
              <ScrollReveal key={index} delay={index * 100 + 200}>
                <GlassCard className="!p-5 flex gap-4 items-start" hoverEffect={false}>
                  <span className="neo bg-accent text-ink p-2 shrink-0">
                    <Award size={20} />
                  </span>
                  <div>
                    <h4 className="font-bold leading-tight mb-1">{cert.name}</h4>
                    <p className="text-sm text-ink/75 dark:text-chalk/75 mb-1">{cert.issuer}</p>
                    <p className="text-xs text-ink/60 dark:text-chalk/60 font-mono">{cert.period}</p>
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
