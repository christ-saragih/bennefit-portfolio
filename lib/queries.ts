import { supabase, storageUrl } from "./supabase";
import { formatRange, formatGpa } from "./format";
import type { ProjectCategory, TechCategory, TablesInsert, Json } from "../types/database";
import type {
  Profile,
  SocialLink,
  Experience,
  Education,
  Certification,
  SkillCategory,
  Project,
  ProjectMetric,
  ProjectChallenge,
} from "../types";

// ---------- label maps ----------
const PROJECT_CATEGORY_LABEL: Record<ProjectCategory, string> = {
  internship: "Internship",
  personal: "Personal",
  professional: "Professional",
  academic: "Academic",
  freelance: "Freelance",
  open_source: "Open Source",
};

const EMPLOYMENT_LABEL: Record<string, string> = {
  internship: "Internship",
  full_time: "Full-time",
  part_time: "Part-time",
  freelance: "Freelance",
  contract: "Contract",
};

const TECH_CATEGORY_LABEL: Record<TechCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  mobile: "Mobile",
  devops: "DevOps",
  design: "Design",
  tools: "Tools & Others",
  other: "Other",
};

const TECH_CATEGORY_ORDER: TechCategory[] = [
  "frontend",
  "backend",
  "database",
  "mobile",
  "devops",
  "design",
  "tools",
  "other",
];

// ---------- PROFILE ----------
export async function getProfile(): Promise<Profile> {
  const { data, error } = await supabase.from("profile").select("*").limit(1);
  if (error) throw error;
  const p = data?.[0];
  if (!p) throw new Error("Profile not found — did you run supabase/seed.sql?");
  return {
    name: p.full_name,
    role: p.headline,
    about: p.bio ?? "",
    email: p.email ?? "",
    location: p.location ?? "",
    photoUrl: storageUrl("avatars", p.avatar_path),
    cvUrl: storageUrl("documents", p.cv_path),
    availableForWork: p.available_for_work,
  };
}

// ---------- SOCIAL LINKS ----------
export async function getSocialLinks(): Promise<SocialLink[]> {
  const { data, error } = await supabase
    .from("social_links")
    .select("platform, url, label")
    .eq("is_published", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((s) => ({
    platform: s.platform,
    url: s.url,
    label: s.label ?? s.platform,
  }));
}

// ---------- EXPERIENCES ----------
type RawExperience = {
  company_name: string;
  role_title: string;
  employment_type: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  highlights: string[];
  organization: { name: string; logo_path: string | null } | null;
  techs: { technology: { name: string; sort_order: number } | null }[];
};

export async function getExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from("experiences")
    .select(
      `company_name, role_title, employment_type, location, start_date, end_date, is_current, highlights, sort_order,
       organization:organizations ( name, logo_path ),
       techs:experience_technologies ( technology:technologies ( name, sort_order ) )`
    )
    .eq("is_published", true)
    .order("sort_order")
    .returns<RawExperience[]>();
  if (error) throw error;

  return (data ?? []).map((e) => {
    const empLabel = EMPLOYMENT_LABEL[e.employment_type];
    return {
      company: e.organization?.name ?? e.company_name,
      logo: storageUrl("logos", e.organization?.logo_path) ?? "",
      location: e.location ?? "",
      role: empLabel ? `${e.role_title} - ${empLabel}` : e.role_title,
      period: formatRange(e.start_date, e.end_date, e.is_current),
      description: e.highlights ?? [],
      techStack: (e.techs ?? [])
        .map((t) => t.technology)
        .filter((t): t is { name: string; sort_order: number } => !!t)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((t) => t.name),
    };
  });
}

// ---------- EDUCATION ----------
export async function getEducation(): Promise<Education[]> {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((e) => ({
    institution: e.institution,
    location: e.location ?? "",
    degree: e.field_of_study ? `${e.degree}, ${e.field_of_study}` : e.degree,
    period: formatRange(e.start_date, e.end_date, e.is_current),
    gpa: formatGpa(e.gpa, e.gpa_scale),
  }));
}

// ---------- CERTIFICATIONS ----------
export async function getCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase
    .from("certifications")
    .select(
      "name, issuer, issue_date, expiry_date, credential_id, credential_url, file_path, image_path, sort_order"
    )
    .eq("is_published", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((c) => ({
    name: c.name,
    issuer: c.issuer,
    period: formatRange(c.issue_date, c.expiry_date, false),
    credentialId: c.credential_id ?? undefined,
    credentialUrl: c.credential_url ?? undefined,
    imageUrl: storageUrl("documents", c.image_path) ?? undefined,
    fileUrl: storageUrl("documents", c.file_path) ?? undefined,
  }));
}

// ---------- SKILLS (technologies grouped by category) ----------
export async function getSkills(): Promise<SkillCategory[]> {
  const { data, error } = await supabase
    .from("technologies")
    .select("name, category, sort_order")
    .eq("is_featured", true)
    .order("sort_order");
  if (error) throw error;

  const groups = new Map<TechCategory, string[]>();
  for (const t of data ?? []) {
    const list = groups.get(t.category) ?? [];
    list.push(t.name);
    groups.set(t.category, list);
  }
  return TECH_CATEGORY_ORDER.filter((c) => groups.has(c)).map((c) => ({
    title: TECH_CATEGORY_LABEL[c],
    skills: groups.get(c)!,
  }));
}

// ---------- PROJECTS ----------
const PROJECT_SELECT = `slug, title, summary, overview, category, role_title, location, start_date, end_date,
  situation, task, contributions, results, metrics, challenges, lessons, team_size, is_confidential,
  thumbnail_path, gallery_url, demo_url, repo_url, is_featured, sort_order,
  images:project_images ( storage_path, alt_text, caption, sort_order ),
  techs:project_technologies ( sort_order, technology:technologies ( name ) )`;

type RawProject = {
  slug: string;
  title: string;
  summary: string | null;
  overview: string[];
  category: ProjectCategory;
  role_title: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  situation: string | null;
  task: string | null;
  contributions: string[] | null;
  results: string[] | null;
  metrics: Json;
  challenges: Json;
  lessons: string[] | null;
  team_size: number | null;
  is_confidential: boolean;
  thumbnail_path: string | null;
  gallery_url: string | null;
  demo_url: string | null;
  repo_url: string | null;
  is_featured: boolean;
  images: {
    storage_path: string;
    alt_text: string | null;
    caption: string | null;
    sort_order: number;
  }[];
  techs: { sort_order: number; technology: { name: string } | null }[];
};

/** jsonb arrives untyped — read the fields we know and drop malformed entries. */
function readString(v: unknown): string | undefined {
  if (typeof v === "string" && v.trim()) return v;
  if (typeof v === "number") return String(v);
  return undefined;
}

function toMetrics(raw: Json): ProjectMetric[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((entry) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return [];
    const label = readString((entry as Record<string, unknown>).label);
    const value = readString((entry as Record<string, unknown>).value);
    return label && value ? [{ label, value }] : [];
  });
}

function toChallenges(raw: Json): ProjectChallenge[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((entry) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return [];
    const e = entry as Record<string, unknown>;
    const title = readString(e.title);
    const problem = readString(e.problem);
    const approach = readString(e.approach);
    if (!title || !problem || !approach) return [];
    return [{ title, problem, approach, outcome: readString(e.outcome) }];
  });
}

function mapProject(p: RawProject): Project {
  return {
    id: p.slug,
    name: p.title,
    location: p.location ?? "",
    period: formatRange(p.start_date, p.end_date, false),
    role: p.role_title ?? "",
    summary: p.summary ?? undefined,
    description: p.overview ?? [],
    techStack: (p.techs ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((t) => t.technology?.name)
      .filter((n): n is string => !!n),
    category: PROJECT_CATEGORY_LABEL[p.category] ?? p.category,
    thumbnail: storageUrl("projects", p.thumbnail_path) ?? undefined,
    images: (p.images ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .flatMap((i) => {
        const url = storageUrl("projects", i.storage_path);
        return url
          ? [{ url, alt: i.alt_text ?? undefined, caption: i.caption ?? undefined }]
          : [];
      }),
    galleryUrl: p.gallery_url ?? undefined,
    demoUrl: p.demo_url ?? undefined,
    repoUrl: p.repo_url ?? undefined,
    isFeatured: p.is_featured,
    situation: p.situation ?? undefined,
    task: p.task ?? undefined,
    contributions: p.contributions ?? [],
    results: p.results ?? [],
    metrics: toMetrics(p.metrics),
    challenges: toChallenges(p.challenges),
    lessons: p.lessons ?? [],
    teamSize: p.team_size ?? undefined,
    isConfidential: p.is_confidential,
  };
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("is_published", true)
    .order("sort_order")
    .returns<RawProject[]>();
  if (error) throw error;
  return (data ?? []).map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("slug", slug)
    .eq("is_published", true)
    .limit(1)
    .returns<RawProject[]>();
  if (error) throw error;
  return data?.[0] ? mapProject(data[0]) : null;
}

// ---------- CONTACT (write) ----------
export async function submitContactMessage(input: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const payload: TablesInsert<"contact_messages"> = {
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    user_agent:
      typeof navigator !== "undefined" ? navigator.userAgent : null,
  };
  const { error } = await supabase.from("contact_messages").insert(payload);
  if (error) throw error;
}
