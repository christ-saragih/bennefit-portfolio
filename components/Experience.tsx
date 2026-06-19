import React from "react";
import { EXPERIENCE_DATA } from "../constants";
import GlassCard from "./GlassCard";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { Calendar, MapPin } from "lucide-react";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            title="Working Experience"
            subtitle="My professional journey in software development."
          />
        </ScrollReveal>

        <div className="space-y-8">
          {EXPERIENCE_DATA.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <GlassCard className="relative overflow-hidden" hoverEffect={false}>
                <div className="absolute top-0 right-0 p-4 opacity-30 dark:opacity-30 pointer-events-none">
                  <img src={exp.logo} alt={exp.company} loading="lazy" decoding="async" className="w-32 dark:invert" />
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-4 lg:col-span-3 space-y-3">
                    <h3 className="text-xl font-bold">{exp.company}</h3>
                    <div className="flex items-center text-ink/70 dark:text-chalk/70 text-sm gap-2 font-mono">
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                    <div className="neo-tag bg-accent !text-ink gap-2 py-1 normal-case tracking-normal w-fit">
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="md:col-span-8 lg:col-span-9 border-t-2 md:border-t-0 md:border-l-2 border-ink dark:border-chalk pt-6 md:pt-0 md:pl-8">
                    <h4 className="text-xl font-bold text-coral mb-4">{exp.role}</h4>

                    <ul className="space-y-2 mb-6">
                      {exp.description.map((desc, i) => (
                        <li
                          key={i}
                          className="text-ink/80 dark:text-chalk/80 text-sm leading-relaxed flex items-start gap-3"
                        >
                          <span className="mt-1.5 w-2.5 h-2.5 bg-coral border-2 border-ink dark:border-chalk shrink-0"></span>
                          {desc}
                        </li>
                      ))}
                    </ul>

                    {exp.techStack && (
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="neo-tag normal-case">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
