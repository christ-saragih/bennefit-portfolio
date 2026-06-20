// Typed database schema — hand-authored to match `supabase/schema.sql`.
//
// You can regenerate this from the live database later (keeps it in sync if you
// change the schema):
//   npx supabase login
//   npx supabase gen types typescript --project-id <project-ref> --schema public > types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type EmploymentType =
  | "internship"
  | "full_time"
  | "part_time"
  | "freelance"
  | "contract";

export type ProjectCategory =
  | "internship"
  | "personal"
  | "professional"
  | "academic"
  | "freelance"
  | "open_source";

export type TechCategory =
  | "frontend"
  | "backend"
  | "database"
  | "mobile"
  | "devops"
  | "design"
  | "tools"
  | "other";

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "email"
  | "twitter"
  | "instagram"
  | "youtube"
  | "website"
  | "dribbble"
  | "other";

export type ContactStatus = "new" | "read" | "replied" | "archived" | "spam";

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: {
          id: boolean;
          full_name: string;
          headline: string;
          bio: string | null;
          email: string | null;
          phone: string | null;
          location: string | null;
          avatar_path: string | null;
          cv_path: string | null;
          available_for_work: boolean;
          updated_at: string;
        };
        Insert: {
          id?: boolean;
          full_name: string;
          headline: string;
          bio?: string | null;
          email?: string | null;
          phone?: string | null;
          location?: string | null;
          avatar_path?: string | null;
          cv_path?: string | null;
          available_for_work?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: boolean;
          full_name?: string;
          headline?: string;
          bio?: string | null;
          email?: string | null;
          phone?: string | null;
          location?: string | null;
          avatar_path?: string | null;
          cv_path?: string | null;
          available_for_work?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      social_links: {
        Row: {
          id: string;
          platform: SocialPlatform;
          label: string | null;
          url: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          platform: SocialPlatform;
          label?: string | null;
          url: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          platform?: SocialPlatform;
          label?: string | null;
          url?: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string | null;
          logo_path: string | null;
          website: string | null;
          location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug?: string | null;
          logo_path?: string | null;
          website?: string | null;
          location?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string | null;
          logo_path?: string | null;
          website?: string | null;
          location?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      technologies: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category: TechCategory;
          icon_path: string | null;
          proficiency: number | null;
          is_featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          category?: TechCategory;
          icon_path?: string | null;
          proficiency?: number | null;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          category?: TechCategory;
          icon_path?: string | null;
          proficiency?: number | null;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      experiences: {
        Row: {
          id: string;
          organization_id: string | null;
          company_name: string;
          role_title: string;
          employment_type: EmploymentType;
          location: string | null;
          start_date: string;
          end_date: string | null;
          is_current: boolean;
          highlights: string[];
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id?: string | null;
          company_name: string;
          role_title: string;
          employment_type?: EmploymentType;
          location?: string | null;
          start_date: string;
          end_date?: string | null;
          is_current?: boolean;
          highlights?: string[];
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string | null;
          company_name?: string;
          role_title?: string;
          employment_type?: EmploymentType;
          location?: string | null;
          start_date?: string;
          end_date?: string | null;
          is_current?: boolean;
          highlights?: string[];
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "experiences_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      experience_technologies: {
        Row: {
          experience_id: string;
          technology_id: string;
        };
        Insert: {
          experience_id: string;
          technology_id: string;
        };
        Update: {
          experience_id?: string;
          technology_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "experience_technologies_experience_id_fkey";
            columns: ["experience_id"];
            isOneToOne: false;
            referencedRelation: "experiences";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "experience_technologies_technology_id_fkey";
            columns: ["technology_id"];
            isOneToOne: false;
            referencedRelation: "technologies";
            referencedColumns: ["id"];
          }
        ];
      };
      education: {
        Row: {
          id: string;
          institution: string;
          degree: string;
          field_of_study: string | null;
          location: string | null;
          start_date: string | null;
          end_date: string | null;
          is_current: boolean;
          gpa: number | null;
          gpa_scale: number | null;
          description: string | null;
          logo_path: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          institution: string;
          degree: string;
          field_of_study?: string | null;
          location?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          gpa?: number | null;
          gpa_scale?: number | null;
          description?: string | null;
          logo_path?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          institution?: string;
          degree?: string;
          field_of_study?: string | null;
          location?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          gpa?: number | null;
          gpa_scale?: number | null;
          description?: string | null;
          logo_path?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      certifications: {
        Row: {
          id: string;
          name: string;
          issuer: string;
          issue_date: string | null;
          expiry_date: string | null;
          credential_id: string | null;
          credential_url: string | null;
          file_path: string | null;
          image_path: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          issuer: string;
          issue_date?: string | null;
          expiry_date?: string | null;
          credential_id?: string | null;
          credential_url?: string | null;
          file_path?: string | null;
          image_path?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          issuer?: string;
          issue_date?: string | null;
          expiry_date?: string | null;
          credential_id?: string | null;
          credential_url?: string | null;
          file_path?: string | null;
          image_path?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string | null;
          overview: string[];
          category: ProjectCategory;
          role_title: string | null;
          organization_id: string | null;
          location: string | null;
          start_date: string | null;
          end_date: string | null;
          thumbnail_path: string | null;
          gallery_url: string | null;
          demo_url: string | null;
          repo_url: string | null;
          is_featured: boolean;
          is_published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          summary?: string | null;
          overview?: string[];
          category?: ProjectCategory;
          role_title?: string | null;
          organization_id?: string | null;
          location?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          thumbnail_path?: string | null;
          gallery_url?: string | null;
          demo_url?: string | null;
          repo_url?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          summary?: string | null;
          overview?: string[];
          category?: ProjectCategory;
          role_title?: string | null;
          organization_id?: string | null;
          location?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          thumbnail_path?: string | null;
          gallery_url?: string | null;
          demo_url?: string | null;
          repo_url?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          storage_path: string;
          alt_text: string | null;
          caption: string | null;
          width: number | null;
          height: number | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          storage_path: string;
          alt_text?: string | null;
          caption?: string | null;
          width?: number | null;
          height?: number | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          storage_path?: string;
          alt_text?: string | null;
          caption?: string | null;
          width?: number | null;
          height?: number | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      project_technologies: {
        Row: {
          project_id: string;
          technology_id: string;
          sort_order: number;
        };
        Insert: {
          project_id: string;
          technology_id: string;
          sort_order?: number;
        };
        Update: {
          project_id?: string;
          technology_id?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "project_technologies_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_technologies_technology_id_fkey";
            columns: ["technology_id"];
            isOneToOne: false;
            referencedRelation: "technologies";
            referencedColumns: ["id"];
          }
        ];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          status: ContactStatus;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
          read_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          status?: ContactStatus;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          read_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          status?: ContactStatus;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          read_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: {
      employment_type: EmploymentType;
      project_category: ProjectCategory;
      tech_category: TechCategory;
      social_platform: SocialPlatform;
      contact_status: ContactStatus;
    };
    CompositeTypes: { [_ in never]: never };
  };
};

// ----- Convenience helpers -----
type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Row"];
export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"];
export type Enums<T extends keyof PublicSchema["Enums"]> =
  PublicSchema["Enums"][T];
