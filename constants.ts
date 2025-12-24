import {
  Experience,
  Education,
  Project,
  Certification,
  SkillCategory,
} from "./types";
import { Linkedin, Github, Mail, MapPin, Download } from "lucide-react";

export const PERSONAL_INFO = {
  name: "Bennefit Christy Saragih",
  role: "Fullstack Developer",
  email: "bennefit.19@gmail.com",
  linkedin: "linkedin.com/in/bennefit-christy-saragih",
  github: "github.com/christ-saragih",
  location: "Bogor, Indonesia",
  about:
    "Bachelor of Applied Science in Software Engineering Technology from IPB University with a GPA of 3.79. Experienced in developing scalable web applications using modern stacks like Next.js, React, Angular, and Express with Prisma. Passionate about creating seamless user experiences and robust backend systems.",
};

export const SOCIAL_LINKS = [
  { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: "Email" },
  {
    icon: Linkedin,
    href: `https://${PERSONAL_INFO.linkedin}`,
    label: "LinkedIn",
  },
  { icon: Github, href: `https://${PERSONAL_INFO.github}`, label: "GitHub" },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    company: "PT Amerta Indah Otsuka",
    logo: "./assets/images/companies/otsuka.svg",
    location: "Sukabumi",
    role: "Fullstack Developer - Internship",
    period: "Jan 2025 – Present",
    description: [
      "Developed and maintained AI Management app for managing AI knowledge and user access roles.",
      "Developed Sisuka AI, an interactive public chatbot powered by OpenAI + Dify with speech-to-text and auto follow-up features.",
      "Developed Canteen App for employee meal planning with RFID-based validation.",
      "Developed DPIA App for UU 27/2022 compliance, streamlining assessments and risk mitigation.",
    ],
    techStack: [
      "Angular",
      "Next.js",
      "Express",
      "Prisma",
      "Bootstrap",
      "Tailwind",
      "OpenAI",
    ],
  },
  {
    company: "PT Sukaharja Quail Indonesia",
    logo: "./assets/images/companies/sukaquail.svg",
    location: "Bogor",
    role: "Fullstack Developer - Internship",
    period: "Jul 2024 – Dec 2024",
    description: [
      "Developed user interfaces using React.js and Tailwind CSS with reusable components.",
      "Implemented interactive features like modals, tabs, and dropdowns.",
      "Created RESTful APIs using Express JS and Sequelize ORM.",
      "Optimized components for responsive design across devices.",
    ],
    techStack: ["React.js", "Tailwind CSS", "Express.js", "Sequelize", "Git"],
  },
  {
    company: "Badan Standardisasi Nasional",
    logo: "./assets/images/companies/bsn.svg",
    location: "Jakarta",
    role: "Fullstack Developer - Internship",
    period: "Feb 2024 – Jun 2024",
    description: [
      "Implemented responsive web interfaces using HTML, CSS, JavaScript, and Bootstrap.",
      "Integrated APIs into Laravel frontend templates.",
      "Built CRUD modules with Laravel + MySQL.",
      "Collaborated with UI/UX designers for accessible layouts.",
    ],
    techStack: ["Laravel", "MySQL", "Bootstrap", "HTML/CSS"],
  },
];

export const EDUCATION_DATA: Education[] = [
  {
    institution: "IPB University",
    location: "Bogor",
    degree: "Bachelor of Applied Science, Software Engineering Technology",
    period: "Aug 2021 – Aug 2025",
    gpa: "3.79 / 4.00",
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "sisuka-ai",
    name: "Sisuka AI",
    location: "Sukabumi",
    period: "2025",
    role: "Fullstack Developer",
    category: "Internship",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "Express.js",
      "Prisma",
      "OpenAI",
      "Dify",
    ],
    thumbnail: "./assets/images/sisuka-ai/1.png",
    images: [
      "./assets/images/sisuka-ai/2.png",
      "https://placehold.co/1200x800/0f172a/60a5fa?text=Admin+Dashboard",
      "https://placehold.co/1200x800/1e293b/60a5fa?text=Analytics+Overview",
    ],
    description: [
      "Interactive public chatbot powered by OpenAI and Dify to answer company-related FAQs.",
      "Integrated speech-to-text functionality for better accessibility.",
      "Implemented suggested replies and auto follow-up features to enhance conversation flow.",
      "Built user satisfaction feedback mechanisms to monitor and improve bot performance.",
    ],
  },
  {
    id: "ai-management",
    name: "AI Management",
    location: "Sukabumi",
    period: "2025",
    role: "Fullstack Developer",
    category: "Internship",
    techStack: ["Angular", "Bootstrap", "Express.js", "Prisma"],
    thumbnail: "./assets/images/ai-management/1.png",
    images: [
      "./assets/images/ai-management/2.png",
      "./assets/images/ai-management/3.png",
      "./assets/images/ai-management/4.png",
    ],
    description: [
      "Internal application for managing AI knowledge bases and documents.",
      "Implemented comprehensive user access role management.",
      "Streamlined the workflow for updating and maintaining corporate AI resources.",
    ],
  },
  {
    id: "canteen-app",
    name: "Canteen App",
    location: "Sukabumi",
    period: "2025",
    role: "Fullstack Developer",
    category: "Internship",
    techStack: ["Angular", "Bootstrap", "Express.js", "Prisma", "RFID"],
    thumbnail: "./assets/images/canteen-app/1.png",
    images: [
      "./assets/images/canteen-app/2.png",
      "./assets/images/canteen-app/3.png",
      "./assets/images/canteen-app/4.png",
    ],
    description: [
      "Integrated application for managing employee meal planning.",
      "Implemented actual meal data tracking with RFID-based validation.",
      "Created checklist interfaces for canteen staff to verify meal distribution.",
      "Improved accuracy of meal provisioning and reduced food waste.",
    ],
  },
  {
    id: "dpia-app",
    name: "DPIA App",
    location: "Sukabumi",
    period: "2025",
    role: "Fullstack Developer",
    category: "Internship",
    techStack: ["Angular", "Bootstrap", "Express.js", "Prisma"],
    thumbnail: "./assets/images/dpia-app/1.png",
    images: [
      "./assets/images/dpia-app/2.png",
      "./assets/images/dpia-app/3.png",
      "./assets/images/dpia-app/4.png",
      "./assets/images/dpia-app/5.png",
      "./assets/images/dpia-app/6.png",
    ],
    description: [
      "Centralized system for UU 27/2022 (Personal Data Protection) compliance.",
      "Streamlines data protection impact assessments replacing manual workflows.",
      "Mitigates personal-data risks through structured audit trails.",
      "Generates regulatory reports automatically.",
    ],
  },
  {
    id: "streamy",
    name: "Streamy",
    location: "Bogor",
    period: "Sep 2024",
    role: "Fullstack Developer",
    category: "Personal",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Laravel Breeze",
      "Inertia.js",
      "Midtrans",
    ],
    thumbnail:
      "https://placehold.co/800x500/1e293b/fbbf24?text=Streamy+Movie+App",
    images: [
      "https://placehold.co/1200x800/1e293b/fbbf24?text=Movie+Catalog",
      "https://placehold.co/1200x800/0f172a/fbbf24?text=Payment+Gateway+Integration",
      "https://placehold.co/1200x800/1e293b/fbbf24?text=User+Profile",
    ],
    description: [
      "Integrated project with Midtrans Snap payment gateway for secure transactions.",
      "Implemented a robust authentication system using Laravel Breeze for user registration and login.",
      "Developed CRUD and restore features using Laravel Inertia React.js for movie data management.",
    ],
    demoUrl: "https://streamy-demo.vercel.app",
    repoUrl: "https://github.com/christ-saragih/streamy",
  },
  {
    id: "talasgo",
    name: "TalasGo",
    location: "Bogor",
    period: "Nov 2023",
    role: "Fullstack Developer",
    category: "Personal",
    techStack: [
      "PHP Native",
      "MySQL",
      "HTML",
      "CSS",
      "Bootstrap",
      "JavaScript",
    ],
    thumbnail:
      "https://placehold.co/800x500/1e293b/22d3ee?text=TalasGo+E-Commerce",
    images: [
      "https://placehold.co/1200x800/1e293b/22d3ee?text=Product+Listing",
      "https://placehold.co/1200x800/0f172a/22d3ee?text=Cart+Management",
      "https://placehold.co/1200x800/1e293b/22d3ee?text=Admin+Panel",
    ],
    description: [
      "Designed software systems including Use Case, ERD, and Class Diagrams.",
      "Developed CRUD features using Native PHP and MySQL to manage product and article data.",
      "Implemented search, pagination, and detailed view features for product and article data.",
      "Collaborated on responsive UI design using Bootstrap.",
    ],
    repoUrl: "https://github.com/christ-saragih/talasgo",
  },
  {
    id: "kosanku",
    name: "Kosanku",
    location: "Bogor",
    period: "Jun 2023",
    role: "Front-End Developer",
    category: "Personal",
    techStack: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    thumbnail:
      "https://placehold.co/800x500/1e293b/a78bfa?text=Kosanku+Booking",
    images: [
      "https://placehold.co/1200x800/1e293b/a78bfa?text=Room+Listings",
      "https://placehold.co/1200x800/0f172a/a78bfa?text=Booking+Form",
      "https://placehold.co/1200x800/1e293b/a78bfa?text=WhatsApp+Redirection",
    ],
    description: [
      "Collaborated in the development of responsive user interfaces.",
      "Developed a room booking form feature that automatically redirects users to WhatsApp with pre-filled messages.",
      "Optimized layout for mobile and desktop viewing.",
    ],
  },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    name: "Junior Web Developer",
    issuer: "Indonesian Professional Certification Authority (BNSP)",
    period: "Oct 2024 – Oct 2027",
  },
  {
    name: "Vocational School Graduate Academy",
    issuer: "Digital Talent Scholarship",
    period: "Jul 2024",
  },
  {
    name: "Learn to Build Web Apps with React",
    issuer: "Dicoding",
    period: "Jul 2024 – Jul 2027",
  },
  {
    name: "Learn to Build Front-End Web for Beginners",
    issuer: "Dicoding",
    period: "Mar 2024 – Mar 2027",
  },
  {
    name: "Learn to Back-End Beginner with JavaScript",
    issuer: "Dicoding",
    period: "May 2023 – May 2026",
  },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "Angular",
      "TypeScript",
      "Tailwind CSS",
      "Bootstrap",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "Laravel",
      "Sequelize ORM",
      "Prisma ORM",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "VS Code",
      "Figma",
      "Notion",
      "Postman",
      "Jasmine",
      "Karma",
      "AI Agents",
    ],
  },
];
