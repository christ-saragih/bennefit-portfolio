import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Lightbox from '../components/Lightbox';
import SmartImage from '../components/SmartImage';
import { Loader, ErrorState } from '../components/States';
import { useProject } from '../hooks/usePortfolio';
import {
  ArrowLeft, Calendar, MapPin, Layers, Briefcase, CheckCircle, Image as ImageIcon,
  ZoomIn, ExternalLink, Github, Globe, ArrowUpRight, Target, AlertTriangle, Wrench,
  TrendingUp, Lock, Users, Lightbulb, ListChecks, Puzzle, ChevronLeft, ChevronRight,
} from 'lucide-react';
import type { ProjectChallenge } from '../types';

const MAX_GALLERY = 6;

const categoryColor = (category?: string) =>
  category === 'Internship' ? 'bg-coral' : 'bg-grass';

/** Section heading: accent square + uppercase title, consistent across the page. */
const SectionTitle: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({
  icon,
  children,
}) => (
  <h2 className="text-2xl font-bold uppercase tracking-tight mb-5 flex items-center gap-3">
    <span className="neo bg-accent text-ink p-2 shrink-0">{icon}</span>
    {children}
  </h2>
);

/** Bulleted list of actions/results — one icon, consistent rhythm. */
const BulletList: React.FC<{ items: string[]; icon?: React.ReactNode }> = ({
  items,
  icon,
}) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3">
        <span className="text-coral shrink-0 mt-0.5">
          {icon ?? <CheckCircle size={20} />}
        </span>
        <span className="text-ink/85 dark:text-chalk/85 leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

/** One labelled part of a technical challenge (Problem / Approach / Outcome). */
const ChallengePart: React.FC<{ label: string; text: string }> = ({ label, text }) => (
  <div className="border-l-2 border-ink/25 dark:border-chalk/25 pl-4">
    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-coral mb-1">
      {label}
    </p>
    <p className="text-ink/85 dark:text-chalk/85 leading-relaxed">{text}</p>
  </div>
);

/**
 * Technical challenges, one card at a time. A stack of long Problem/Approach/
 * Outcome cards buries the gallery below it; a carousel keeps the section to a
 * fixed footprint and lets a reader step through only what interests them.
 */
const ChallengeCarousel: React.FC<{ challenges: ProjectChallenge[] }> = ({ challenges }) => {
  const [index, setIndex] = useState(0);
  const total = challenges.length;
  const challenge = challenges[index];
  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Technical challenges"
      onKeyDown={(e) => {
        if (total < 2) return;
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          go(1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          go(-1);
        }
      }}
    >
      <GlassCard className="!p-6" hoverEffect={false}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="font-bold uppercase tracking-wide">{challenge.title}</h3>
          {total > 1 && (
            <span className="neo-tag shrink-0" aria-live="polite">
              {index + 1} / {total}
            </span>
          )}
        </div>
        <div className="space-y-4">
          <ChallengePart label="Problem" text={challenge.problem} />
          <ChallengePart label="Approach" text={challenge.approach} />
          {challenge.outcome && <ChallengePart label="Outcome" text={challenge.outcome} />}
        </div>
      </GlassCard>

      {total > 1 && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous challenge"
            className="neo-btn bg-paper dark:bg-night px-3 py-2"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {challenges.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to challenge ${i + 1}: ${c.title}`}
                aria-current={i === index}
                className={`h-3 w-3 border-2 border-ink dark:border-chalk transition-colors ${
                  i === index ? 'bg-accent' : 'bg-transparent hover:bg-accent/40'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next challenge"
            className="neo-btn bg-paper dark:bg-night px-3 py-2"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

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

  const metrics = project.metrics ?? [];
  const contributions = project.contributions ?? [];
  const results = project.results ?? [];
  const challenges = project.challenges ?? [];
  const lessons = project.lessons ?? [];
  const features = project.description ?? [];

  // Projects whose STAR copy hasn't been written yet fall back to the flat
  // overview list, so nothing renders as an empty page mid-migration.
  const hasStar = !!(project.situation || project.task || contributions.length || results.length);

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to All Projects
        </Link>

        {/* Header image — contained, not cropped: these are UI screenshots and
            object-cover was cutting the interface out of the frame. */}
        {project.thumbnail && (
          <div className="neo-card !p-0 overflow-hidden mb-8 bg-ink/5 dark:bg-chalk/5">
            <SmartImage
              eager
              src={project.thumbnail}
              alt={project.name}
              wrapperClassName="w-full aspect-video"
              className="block w-full h-full object-contain"
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
            {project.isConfidential && (
              <span className="neo-tag inline-flex items-center gap-1.5">
                <Lock size={12} />
                Internal
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[0.95]">
            {project.name}
          </h1>
          <div className="h-2 w-24 bg-accent border-2 border-ink dark:border-chalk mt-4"></div>

          {project.summary && (
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-ink/85 dark:text-chalk/85 max-w-3xl">
              {project.summary}
            </p>
          )}
        </div>

        {/* Results strip — the numbers a recruiter should catch without reading */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {metrics.map((metric, i) => (
              <div key={i} className="neo-card p-4">
                <p className="text-2xl md:text-3xl font-bold leading-none">{metric.value}</p>
                <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-wide text-ink/65 dark:text-chalk/65">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* ---------- Layer 1: STAR narrative, for recruiters ---------- */}
            {hasStar ? (
              <>
                {project.situation && (
                  <div>
                    <SectionTitle icon={<AlertTriangle size={22} />}>The Problem</SectionTitle>
                    <p className="text-ink/85 dark:text-chalk/85 leading-relaxed">
                      {project.situation}
                    </p>
                  </div>
                )}

                {project.task && (
                  <div>
                    <SectionTitle icon={<Target size={22} />}>The Goal</SectionTitle>
                    <p className="text-ink/85 dark:text-chalk/85 leading-relaxed">
                      {project.task}
                    </p>
                  </div>
                )}

                {contributions.length > 0 && (
                  <div>
                    <SectionTitle icon={<Wrench size={22} />}>What I Built</SectionTitle>
                    <BulletList items={contributions} />
                  </div>
                )}

                {results.length > 0 && (
                  <div>
                    <SectionTitle icon={<TrendingUp size={22} />}>Impact</SectionTitle>
                    <BulletList items={results} />
                  </div>
                )}

                {features.length > 0 && (
                  <div>
                    <SectionTitle icon={<ListChecks size={22} />}>Key Features</SectionTitle>
                    <BulletList items={features} />
                  </div>
                )}
              </>
            ) : (
              features.length > 0 && (
                <div>
                  <SectionTitle icon={<ListChecks size={22} />}>Project Overview</SectionTitle>
                  <BulletList items={features} />
                </div>
              )
            )}

            {/* ---------- Gallery ---------- */}
            {displayedImages.length > 0 && (
              <div>
                <SectionTitle icon={<ImageIcon size={22} />}>Gallery</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {displayedImages.map((img, idx) => (
                    <figure
                      key={idx}
                      className="group relative neo-card !p-0 overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
                    >
                      <div className="relative w-full aspect-video overflow-hidden">
                        <SmartImage
                          src={img.url}
                          alt={img.alt ?? `${project.name} screenshot ${idx + 1}`}
                          wrapperClassName="w-full h-full"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/40 transition-colors">
                          <span className="neo bg-accent text-ink p-2 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all">
                            <ZoomIn size={20} />
                          </span>
                        </span>
                      </div>
                      {img.caption && (
                        <figcaption className="flex-none border-t-2 border-ink dark:border-chalk px-4 py-3">
                          {/* Exactly two lines: h-10 (2.5rem) = 2 × leading-5.
                              A fixed height rather than line-clamp alone, so every
                              card in a row ends at the same place and no third
                              line can peek out. Full text is in the lightbox. */}
                          <span className="line-clamp-2 h-10 font-mono text-xs leading-5 text-ink/75 dark:text-chalk/75">
                            {img.caption}
                          </span>
                        </figcaption>
                      )}
                      {/* One transparent hit area over the whole card, so the
                          caption is clickable too and there is a single tab stop. */}
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent"
                      >
                        <span className="sr-only">
                          View image {idx + 1} of {project.name}
                          {img.caption ? ` — ${img.caption}` : ''}
                        </span>
                      </button>
                    </figure>
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

            {/* ---------- Layer 2: depth, for technical reviewers ---------- */}
            {challenges.length > 0 && (
              <div>
                <SectionTitle icon={<Puzzle size={22} />}>Technical Deep Dive</SectionTitle>
                {/* Keyed by project so the carousel resets when navigating between projects */}
                <ChallengeCarousel key={project.id} challenges={challenges} />
              </div>
            )}

            {lessons.length > 0 && (
              <div>
                <SectionTitle icon={<Lightbulb size={22} />}>What I Learned</SectionTitle>
                <BulletList items={lessons} icon={<Lightbulb size={20} />} />
              </div>
            )}
          </div>

          {/* ---------- Sidebar ---------- */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <GlassCard className="!p-6" hoverEffect={false}>
                <div className="flex items-center gap-2 mb-4 font-bold uppercase tracking-wide">
                  <Briefcase size={20} className="text-coral" />
                  <h3>At a Glance</h3>
                </div>
                <dl className="space-y-3 font-mono text-sm">
                  <div className="flex items-start gap-2">
                    <Briefcase size={16} className="text-coral shrink-0 mt-0.5" />
                    <div>
                      <dt className="sr-only">Role</dt>
                      <dd>{project.role}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar size={16} className="text-coral shrink-0 mt-0.5" />
                    <div>
                      <dt className="sr-only">Period</dt>
                      <dd>{project.period}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-coral shrink-0 mt-0.5" />
                    <div>
                      <dt className="sr-only">Location</dt>
                      <dd>{project.location}</dd>
                    </div>
                  </div>
                  {project.teamSize && (
                    <div className="flex items-start gap-2">
                      <Users size={16} className="text-coral shrink-0 mt-0.5" />
                      <div>
                        <dt className="sr-only">Team size</dt>
                        <dd>
                          {project.teamSize === 1
                            ? 'Solo project'
                            : `Team of ${project.teamSize}`}
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>
              </GlassCard>

              {/* Project Links — or, for internal work, why there aren't any */}
              {project.demoUrl || project.repoUrl ? (
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
              ) : (
                project.isConfidential && (
                  <GlassCard className="!p-6" hoverEffect={false}>
                    <div className="flex items-center gap-2 mb-3 font-bold uppercase tracking-wide">
                      <Lock size={20} className="text-coral" />
                      <h3>Internal Project</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-ink/80 dark:text-chalk/80">
                      Built for internal company use, so the source code and a live
                      demo can't be shared publicly. The screenshots above show the
                      work &mdash; happy to walk through the implementation in an interview.
                    </p>
                  </GlassCard>
                )
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
