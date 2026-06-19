import React from 'react';
import { PROJECTS_DATA } from '../constants';
import GlassCard from './GlassCard';
import SectionHeader from './SectionHeader';
import ScrollReveal from './ScrollReveal';
import SmartImage from './SmartImage';
import { FolderGit2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categoryColor = (category?: string) =>
  category === 'Internship' ? 'bg-coral' : 'bg-grass';

const Projects: React.FC = () => {
  // Show only first 3 projects on the home page
  const featuredProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="Projects" subtitle="A glimpse into applications I've built." />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100} className="h-full">
              <Link to={`/projects/${project.id}`} className="block h-full">
                <GlassCard className="flex flex-col h-full group cursor-pointer !p-0 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-paper dark:bg-night border-b-2 border-ink dark:border-chalk">
                    {project.thumbnail ? (
                      <SmartImage
                        src={project.thumbnail}
                        alt={project.name}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FolderGit2 size={40} className="text-ink/40 dark:text-chalk/40" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 z-10 neo bg-accent text-ink p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-ink/60 dark:text-chalk/60">
                        {project.period}
                      </span>
                      {project.category && (
                        <span className={`neo-tag !text-ink ${categoryColor(project.category)}`}>
                          {project.category}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                    <p className="text-sm font-mono text-coral mb-4">{project.role}</p>

                    <div className="flex-grow space-y-2 mb-4">
                      {project.description.slice(0, 2).map((desc, i) => (
                        <p key={i} className="text-ink/75 dark:text-chalk/75 text-sm leading-relaxed line-clamp-2 flex gap-2">
                          <span className="text-coral font-bold">›</span>
                          {desc}
                        </p>
                      ))}
                    </div>

                    {project.techStack && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-ink dark:border-chalk">
                        {project.techStack.slice(0, 3).map((tech, tIdx) => (
                          <span key={tIdx} className="neo-tag normal-case">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="neo-tag">+{project.techStack.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="flex justify-center" delay={200}>
          <Link to="/projects">
            <button className="neo-btn bg-accent text-ink px-8 py-3 font-mono text-sm uppercase group">
              View All
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Projects;
