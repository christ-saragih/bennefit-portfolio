import React, { useEffect } from 'react';
import { PROJECTS_DATA } from '../constants';
import GlassCard from '../components/GlassCard';
import { FolderGit2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllProjects: React.FC = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors group">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            All Projects<span className="text-blue-500">.</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
            A comprehensive list of my work, including internships, personal projects, and collaborative developments.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-6 opacity-70"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id} className="block h-full">
              <GlassCard className="flex flex-col h-full group cursor-pointer relative transition-all duration-300 hover:border-blue-500/30 !p-0 overflow-hidden border-gray-200 dark:border-white/10">
                
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-white/5">
                    {project.thumbnail ? (
                        <img 
                            src={project.thumbnail} 
                            alt={project.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                        />
                    ) : (
                         <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-white/5">
                             <FolderGit2 size={40} className="text-gray-400 dark:text-gray-600" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent dark:from-[#0f172a] dark:to-transparent opacity-60 dark:opacity-80"></div>
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-black/50 p-2 rounded-full backdrop-blur-sm">
                        <ArrowRight className="text-blue-600 dark:text-blue-400" size={16} />
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                            {project.period}
                        </span>
                        {project.category && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                                project.category === 'Internship' 
                                ? 'border-purple-500/30 text-purple-600 dark:text-purple-300 bg-purple-500/10 dark:bg-purple-500/5' 
                                : 'border-green-500/30 text-green-600 dark:text-green-300 bg-green-500/10 dark:bg-green-500/5'
                            }`}>
                                {project.category}
                            </span>
                        )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                        {project.name}
                    </h3>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{project.role}</p>
                    
                    <div className="flex-grow space-y-2 mb-6">
                        {project.description.slice(0, 3).map((desc, i) => (
                        <p key={i} className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                        • {desc}
                        </p>
                        ))}
                    </div>

                    {project.techStack && (
                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-200 dark:border-white/5">
                        {project.techStack.slice(0, 4).map((tech, tIdx) => (
                            <span key={tIdx} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400">
                            {tech}
                            </span>
                        ))}
                        {project.techStack.length > 4 && (
                            <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400">+{project.techStack.length - 4}</span>
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