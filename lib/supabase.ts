import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database";

// Accept the base Project URL (https://<ref>.supabase.co). Defensively strip a
// pasted REST/Storage/Auth endpoint path and any trailing slash — copying the
// ".../rest/v1" URL by mistake is common and would break every request.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
  .replace(/\/(rest|auth|storage|graphql)\/v1\/?$/, "")
  .replace(/\/+$/, "");
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Fail fast & loud if the project isn't configured — better than a cryptic
// runtime error deep inside a query.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "[supabase] Missing environment variables. Set VITE_SUPABASE_URL and " +
      "VITE_SUPABASE_ANON_KEY in your .env.local (see .env.example)."
  );
}

// The anon key is safe to expose in the browser — Row Level Security (RLS)
// is what actually protects the data.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Build a public URL for a file stored in a Supabase Storage bucket.
 * The DB stores only the path (e.g. "sisuka-ai/1.png"); the URL is derived here.
 */
export function storageUrl(
  bucket: "avatars" | "projects" | "logos" | "documents",
  path: string | null | undefined
): string | null {
  if (!path) return null;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
