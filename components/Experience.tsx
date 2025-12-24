import React from "react";
import { EXPERIENCE_DATA } from "../constants";
import GlassCard from "./GlassCard";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { Briefcase, Calendar, MapPin } from "lucide-react";

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
              <GlassCard className="relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-15 dark:opacity-30 dark:bg-white">
                  <img src={exp.logo} alt={exp.company} className="w-32" />
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-4 lg:col-span-3 space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {exp.company}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm gap-2">
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center text-blue-600 dark:text-blue-300 text-sm gap-2 font-mono bg-blue-50 dark:bg-blue-500/10 py-1 px-2 rounded w-fit">
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="md:col-span-8 lg:col-span-9 border-l-0 md:border-l border-gray-200 dark:border-white/10 md:pl-8">
                    <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-200 mb-4">
                      {exp.role}
                    </h4>

                    <ul className="space-y-2 mb-6">
                      {exp.description.map((desc, i) => (
                        <li
                          key={i}
                          className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex items-start gap-2"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                          {desc}
                        </li>
                      ))}
                    </ul>

                    {exp.techStack && (
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300"
                          >
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
