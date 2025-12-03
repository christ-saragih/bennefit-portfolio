import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS_DATA } from '../constants';
import GlassCard from '../components/GlassCard';
import { ArrowLeft, Calendar, MapPin, Layers, Briefcase, CheckCircle, Image as ImageIcon, ExternalLink, Github, Globe } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS_DATA.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h2>
            <Link to="/projects" className="text-blue-600 dark:text-blue-400 hover:text-blue-500">Back to Projects</Link>
        </div>
    )
  }

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <Link to="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors group">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             Back to All Projects
        </Link>

        {/* Header Image */}
        {project.thumbnail && (
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 relative border border-gray-200 dark:border-white/10 shadow-2xl">
                <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                        {project.name}
                    </h1>
                     <div className="flex gap-3">
                        {project.category && (
                                <span className="px-3 py-1 rounded-full border border-blue-400/30 bg-blue-500/20 text-blue-100 text-sm font-medium backdrop-blur-sm">
                                    {project.category}
                                </span>
                            )}
                    </div>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
                <GlassCard>
                     <div className="flex flex-wrap gap-4 md:gap-8 text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-2">
                            <Briefcase size={18} className="text-blue-600 dark:text-blue-400" />
                            <span>{project.role}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-blue-600 dark:text-blue-400" />
                            <span>{project.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-blue-600 dark:text-blue-400" />
                            <span>{project.location}</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Overview</h3>
                    <div className="space-y-4">
                            {project.description.map((desc, i) => (
                            <div key={i} className="flex gap-3">
                                <CheckCircle size={20} className="text-green-600 dark:text-green-500/80 shrink-0 mt-0.5" />
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{desc}</p>
                            </div>
                            ))}
                    </div>
                </GlassCard>

                {/* Gallery */}
                {project.images && project.images.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <ImageIcon className="text-purple-600 dark:text-purple-400" /> Gallery
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.images.map((img, idx) => (
                                <div key={idx} className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 aspect-video bg-gray-100 dark:bg-gray-900 cursor-pointer">
                                    <img 
                                        src={img} 
                                        alt={`${project.name} screenshot ${idx + 1}`} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="lg:col-span-1">
                 <div className="sticky top-24 space-y-6">
                    {/* Project Links Section */}
                    {(project.demoUrl || project.repoUrl) && (
                        <GlassCard className="!p-6">
                            <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white font-semibold">
                                <Globe size={20} className="text-blue-600 dark:text-blue-400" />
                                <h3>Project Links</h3>
                            </div>
                            <div className="space-y-3">
                                {project.demoUrl && (
                                    <a 
                                        href={project.demoUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all group shadow-lg hover:shadow-blue-500/30"
                                    >
                                        <span className="font-medium">Live Demo</span>
                                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                )}
                                {project.repoUrl && (
                                    <a 
                                        href={project.repoUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-all group"
                                    >
                                        <span className="font-medium">Source Code</span>
                                        <Github size={18} className="group-hover:rotate-12 transition-transform" />
                                    </a>
                                )}
                            </div>
                        </GlassCard>
                    )}

                    <GlassCard className="!p-6">
                        <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white font-semibold">
                            <Layers size={20} className="text-purple-600 dark:text-purple-400" />
                            <h3>Tech Stack</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack?.map((tech, idx) => (
                                <span key={idx} className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;