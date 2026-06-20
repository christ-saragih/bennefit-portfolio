import React, { useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import SmartImage from '../components/SmartImage';
import { Loader, ErrorState } from '../components/States';
import { useProjects } from '../hooks/usePortfolio';
import { FolderGit2, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const categoryColor = (category?: string) =>
  category === 'Internship' ? 'bg-coral' : 'bg-grass';

const AllProjects: React.FC = () => {
  const { data: projects, isLoading, isError } = useProjects();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase mb-6 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
            All Projects
          </h1>
          <div className="h-2 w-24 bg-accent border-2 border-ink dark:border-chalk mt-4"></div>
          <p className="text-ink/70 dark:text-chalk/70 text-lg max-w-2xl mt-5">
            A comprehensive list of my work, including internships, personal projects, and collaborative developments.
          </p>
        </div>

        {isLoading && <Loader label="Loading projects" />}
        {isError && <ErrorState />}
        {!isLoading && !isError && projects?.length === 0 && (
          <p className="font-mono text-ink/60 dark:text-chalk/60">No projects yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(projects ?? []).map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id} className="block h-full">
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

                  <div className="flex-grow space-y-2 mb-6">
                    {project.description.slice(0, 3).map((desc, i) => (
                      <p key={i} className="text-ink/75 dark:text-chalk/75 text-sm leading-relaxed line-clamp-2 flex gap-2">
                        <span className="text-coral font-bold">›</span>
                        {desc}
                      </p>
                    ))}
                  </div>

                  {project.techStack && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t-2 border-ink dark:border-chalk">
                      {project.techStack.slice(0, 4).map((tech, tIdx) => (
                        <span key={tIdx} className="neo-tag normal-case">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="neo-tag">+{project.techStack.length - 4}</span>
                      )}
                    </div>
                  )}
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProjects;
