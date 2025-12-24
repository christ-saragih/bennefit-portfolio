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
  demoUrl?: string;
  repoUrl?: string;
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