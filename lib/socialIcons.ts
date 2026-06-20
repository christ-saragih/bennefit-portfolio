import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  Dribbble,
  type LucideIcon,
} from "lucide-react";

// Map a social_links.platform value → lucide icon.
export const SOCIAL_ICONS: Record<string, LucideIcon> = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  website: Globe,
  dribbble: Dribbble,
  other: Globe,
};
