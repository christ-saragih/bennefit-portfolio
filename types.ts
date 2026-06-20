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

export interface Project {
  id: string;
  name: string;
  location: string;
  period: string;
  role: string;
  description: string[];
  techStack?: string[];
  category?: string;
  thumbnail?: string;
  images?: string[];
  galleryUrl?: string; // Google Drive folder with the full photo gallery
  demoUrl?: string;
  repoUrl?: string;
  isFeatured?: boolean; // shown in the homepage "Projects" section
}

export interface Certification {
  name: string;
  issuer: string;
  period: string;
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