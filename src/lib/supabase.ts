// Supabase client instance and database domain types.
import { supabase as cloudClient } from "@/integrations/supabase/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: any = cloudClient;

export type Profile = {
  id: string;
  full_name: string;
  username: string | null;
  bio: string | null;
  role: "student" | "admin";
  xp: number;
  created_at: string;
  updated_at: string;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  projects: string;
  category: string;
  status: string;
  features: string[];
  curriculum: { module: string; topics: string[] }[];
  created_at: string;
};

export type Enrollment = {
  id: string;
  user_id: string;
  course_id: string;
  status: "active" | "completed";
  progress: number;
  enrolled_at: string;
  completed_at: string | null;
  course?: Course;
};

export type Certificate = {
  id: string;
  user_id: string;
  course_id: string;
  certificate_number: string;
  issued_at: string;
  course?: Course;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  program: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};
