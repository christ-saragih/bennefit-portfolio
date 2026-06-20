import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Lightbox from '../components/Lightbox';
import SmartImage from '../components/SmartImage';
import { Loader, ErrorState } from '../components/States';
import { useProject } from '../hooks/usePortfolio';
import { ArrowLeft, Calendar, MapPin, Layers, Briefcase, CheckCircle, Image as ImageIcon, ZoomIn, ExternalLink, Github, Globe, ArrowUpRight } from 'lucide-react';

const MAX_GALLERY = 6;

const categoryColor = (category?: string) =>
  category === 'Internship' ? 'bg-coral' : 'bg-grass';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, isError } = useProject(id ?? '');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <section className="pt-32 pb-20 px-4 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <Loader label="Loading project" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="pt-32 pb-20 px-4 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <ErrorState message="Couldn't load this project." />
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-4">
        <h2 className="text-3xl font-bold uppercase">Project Not Found</h2>
        <Link to="/projects" className="neo-btn bg-accent text-ink px-6 py-3 font-mono uppercase text-sm">Back to Projects</Link>
      </div>
    );
  }

  const galleryImages = project.images ?? [];
  const displayedImages = galleryImages.slice(0, MAX_GALLERY);
  // Offer the "view more" button when the gallery is full (≥6) and a Drive link exists
  const showViewMore = !!project.galleryUrl && galleryImages.length >= MAX_GALLERY;

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to All Projects
        </Link>

        {/* Header Image */}
        {project.thumbnail && (
          <div className="neo-card !p-0 overflow-hidden mb-8">
            <SmartImage
              eager
              src={project.thumbnail}
              alt={project.name}
              wrapperClassName="w-full h-64 md:h-96"
              className="block w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 flex-wrap mb-4">
            {project.category && (
              <span className={`neo-tag !text-ink ${categoryColor(project.category)}`}>
                {project.category}
              </span>
            )}
            <span className="neo-tag normal-case">{project.period}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[0.95]">
            {project.name}
          </h1>
          <div className="h-2 w-24 bg-accent border-2 border-ink dark:border-chalk mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <GlassCard hoverEffect={false}>
              <div className="flex flex-wrap gap-4 md:gap-6 mb-6 pb-6 border-b-2 border-ink dark:border-chalk font-mono text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase size={18} className="text-coral" />
                  <span>{project.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-coral" />
                  <span>{project.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-coral" />
                  <span>{project.location}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Project Overview</h3>
              <div className="space-y-4">
                {project.description.map((desc, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle size={20} className="text-coral shrink-0 mt-0.5" />
                    <p className="text-ink/85 dark:text-chalk/85 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Gallery */}
            {displayedImages.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                  <span className="neo bg-accent text-ink p-2">
                    <ImageIcon size={22} />
                  </span>
                  Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {displayedImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`View image ${idx + 1} of ${project.name}`}
                      className="group relative block w-full text-left neo-card !p-0 overflow-hidden aspect-video transition-transform hover:-translate-y-1"
                    >
                      <SmartImage
                        src={img}
                        alt={`${project.name} screenshot ${idx + 1}`}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/40 transition-colors">
                        <span className="neo bg-accent text-ink p-2 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all">
                          <ZoomIn size={20} />
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                {showViewMore && (
                  <div className="mt-6 flex justify-center">
                    <a
                      href={project.galleryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn bg-accent text-ink px-6 py-3 font-mono text-sm uppercase group"
                    >
                      <ImageIcon size={18} />
                      View More
                      <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Project Links */}
              {(project.demoUrl || project.repoUrl) && (
                <GlassCard className="!p-6" hoverEffect={false}>
                  <div className="flex items-center gap-2 mb-4 font-bold uppercase tracking-wide">
                    <Globe size={20} className="text-coral" />
                    <h3>Project Links</h3>
                  </div>
                  <div className="space-y-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neo-btn bg-accent text-ink w-full px-4 py-3 justify-between group"
                      >
                        <span className="font-bold">Live Demo</span>
                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neo-btn bg-paper dark:bg-night w-full px-4 py-3 justify-between group"
                      >
                        <span className="font-bold">Source Code</span>
                        <Github size={18} className="group-hover:rotate-12 transition-transform" />
                      </a>
                    )}
                  </div>
                </GlassCard>
              )}

              <GlassCard className="!p-6" hoverEffect={false}>
                <div className="flex items-center gap-2 mb-4 font-bold uppercase tracking-wide">
                  <Layers size={20} className="text-coral" />
                  <h3>Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech, idx) => (
                    <span key={idx} className="neo-tag normal-case text-sm px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={displayedImages}
          startIndex={lightboxIndex}
          alt={`${project.name} screenshot`}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
};

export default ProjectDetail;
