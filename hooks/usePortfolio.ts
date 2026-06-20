import { useQuery } from "@tanstack/react-query";
import * as api from "../lib/queries";

export const useProfile = () =>
  useQuery({ queryKey: ["profile"], queryFn: api.getProfile });

export const useSocialLinks = () =>
  useQuery({ queryKey: ["social_links"], queryFn: api.getSocialLinks });

export const useExperiences = () =>
  useQuery({ queryKey: ["experiences"], queryFn: api.getExperiences });

export const useEducation = () =>
  useQuery({ queryKey: ["education"], queryFn: api.getEducation });

export const useCertifications = () =>
  useQuery({ queryKey: ["certifications"], queryFn: api.getCertifications });

export const useSkills = () =>
  useQuery({ queryKey: ["skills"], queryFn: api.getSkills });

export const useProjects = () =>
  useQuery({ queryKey: ["projects"], queryFn: api.getProjects });

export const useProject = (slug: string) =>
  useQuery({
    queryKey: ["project", slug],
    queryFn: () => api.getProjectBySlug(slug),
    enabled: !!slug,
  });
