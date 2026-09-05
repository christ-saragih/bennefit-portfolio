export interface Experience {
  company: string;
  logo: string;
  location: string;
  role: string;
  period: string;
  description: string[];
  techStack?: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  period: string;
  gpa: string;
}

/** One gallery image. `caption` is the one-line explanation shown under it. */
export interface ProjectImage {
  url: string;
  alt?: string;
  caption?: string;
}

/** A single headline number in the results strip, e.g. { label: "Roles", value: "4" }. */
export interface ProjectMetric {
  label: string;
  value: string;
}

/** STAR at the technical level — what the deep-dive section renders. */
export interface ProjectChallenge {
  title: string;
  problem: string;
  approach: string;
  outcome?: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  period: string;
  role: string;
  summary?: string; // lead paragraph under the title
  description: string[]; // `overview` — key features
  techStack?: string[];
  category?: string;
  thumbnail?: string;
  images?: ProjectImage[];
  galleryUrl?: string; // Google Drive folder with the full photo gallery
  demoUrl?: string;
  repoUrl?: string;
  isFeatured?: boolean; // shown in the homepage "Projects" section

  // --- STAR narrative (rendered as Problem / Goal / What I Built / Impact) ---
  situation?: string;
  task?: string;
  contributions?: string[];
  results?: string[];
  metrics?: ProjectMetric[];

  // --- Depth layer, for technical reviewers ---
  challenges?: ProjectChallenge[];
  lessons?: string[];
  teamSize?: number;
  isConfidential?: boolean; // internal/NDA: no public repo or demo
}

export interface Certification {
  name: string;
  issuer: string;
  period: string;
  credentialId?: string;
  /** Issuer's own verification page — the strongest proof, since a third party vouches for it. */
  credentialUrl?: string;
  /** Certificate image in Storage; opens in the lightbox without leaving the page. */
  imageUrl?: string;
  /** Certificate PDF in Storage; opens in a new tab. */
  fileUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Profile {
  name: string;
  role: string;
  about: string;
  email: string;
  location: string;
  photoUrl: string | null;
  cvUrl: string | null;
  availableForWork: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}