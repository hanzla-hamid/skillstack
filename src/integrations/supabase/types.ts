export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      admissions_applications: {
        Row: {
          city: string | null;
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          kind: string;
          message: string | null;
          mode: string | null;
          phone: string;
          program: string;
          scholarship_type: string | null;
          status: string;
          topic: string | null;
          updated_at: string;
        };
        Insert: {
          city?: string | null;
          created_at?: string;
          email: string;
          full_name: string;
          id?: string;
          kind?: string;
          message?: string | null;
          mode?: string | null;
          phone: string;
          program: string;
          scholarship_type?: string | null;
          status?: string;
          topic?: string | null;
          updated_at?: string;
        };
        Update: {
          city?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          kind?: string;
          message?: string | null;
          mode?: string | null;
          phone?: string;
          program?: string;
          scholarship_type?: string | null;
          status?: string;
          topic?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      articles: {
        Row: {
          author: string;
          category: string;
          content: string;
          cover_image: string | null;
          created_at: string;
          excerpt: string;
          featured: boolean;
          id: string;
          published: boolean;
          published_at: string;
          read_minutes: number;
          slug: string;
          tags: string[];
          title: string;
        };
        Insert: {
          author?: string;
          category?: string;
          content?: string;
          cover_image?: string | null;
          created_at?: string;
          excerpt?: string;
          featured?: boolean;
          id?: string;
          published?: boolean;
          published_at?: string;
          read_minutes?: number;
          slug: string;
          tags?: string[];
          title: string;
        };
        Update: {
          author?: string;
          category?: string;
          content?: string;
          cover_image?: string | null;
          created_at?: string;
          excerpt?: string;
          featured?: boolean;
          id?: string;
          published?: boolean;
          published_at?: string;
          read_minutes?: number;
          slug?: string;
          tags?: string[];
          title?: string;
        };
        Relationships: [];
      };
      blog_comments: {
        Row: {
          author_name: string;
          body: string;
          created_at: string;
          id: string;
          parent_id: string | null;
          post_id: string;
          user_id: string;
        };
        Insert: {
          author_name?: string;
          body: string;
          created_at?: string;
          id?: string;
          parent_id?: string | null;
          post_id: string;
          user_id: string;
        };
        Update: {
          author_name?: string;
          body?: string;
          created_at?: string;
          id?: string;
          parent_id?: string | null;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_comments_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "blog_comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "blog_comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "blog_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      blog_posts: {
        Row: {
          author: string;
          body: string;
          created_at: string;
          excerpt: string;
          external_id: string | null;
          id: string;
          permalink: string | null;
          published_at: string;
          slug: string;
          source: string;
          status: string;
          tags: string[];
          thumbnail_url: string | null;
          title: string;
          type: string;
          updated_at: string;
          video_url: string | null;
        };
        Insert: {
          author?: string;
          body?: string;
          created_at?: string;
          excerpt?: string;
          external_id?: string | null;
          id?: string;
          permalink?: string | null;
          published_at?: string;
          slug: string;
          source?: string;
          status?: string;
          tags?: string[];
          thumbnail_url?: string | null;
          title: string;
          type?: string;
          updated_at?: string;
          video_url?: string | null;
        };
        Update: {
          author?: string;
          body?: string;
          created_at?: string;
          excerpt?: string;
          external_id?: string | null;
          id?: string;
          permalink?: string | null;
          published_at?: string;
          slug?: string;
          source?: string;
          status?: string;
          tags?: string[];
          thumbnail_url?: string | null;
          title?: string;
          type?: string;
          updated_at?: string;
          video_url?: string | null;
        };
        Relationships: [];
      };
      blog_reactions: {
        Row: {
          created_at: string;
          id: string;
          kind: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          kind: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          kind?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_reactions_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "blog_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      certificates: {
        Row: {
          certificate_number: string;
          course_id: string;
          id: string;
          issued_at: string;
          user_id: string;
        };
        Insert: {
          certificate_number: string;
          course_id: string;
          id?: string;
          issued_at?: string;
          user_id: string;
        };
        Update: {
          certificate_number?: string;
          course_id?: string;
          id?: string;
          issued_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      contact_messages: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          is_read: boolean;
          message: string;
          name: string;
          phone: string | null;
          program: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          is_read?: boolean;
          message: string;
          name: string;
          phone?: string | null;
          program?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          is_read?: boolean;
          message?: string;
          name?: string;
          phone?: string | null;
          program?: string | null;
        };
        Relationships: [];
      };
      course_videos: {
        Row: {
          category: string;
          course_slug: string | null;
          created_at: string;
          created_by: string | null;
          description: string | null;
          duration: string | null;
          id: string;
          is_published: boolean;
          thumbnail_url: string | null;
          title: string;
          updated_at: string;
          video_path: string;
        };
        Insert: {
          category?: string;
          course_slug?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          duration?: string | null;
          id?: string;
          is_published?: boolean;
          thumbnail_url?: string | null;
          title: string;
          updated_at?: string;
          video_path: string;
        };
        Update: {
          category?: string;
          course_slug?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          duration?: string | null;
          id?: string;
          is_published?: boolean;
          thumbnail_url?: string | null;
          title?: string;
          updated_at?: string;
          video_path?: string;
        };
        Relationships: [];
      };
      courses: {
        Row: {
          category: string;
          created_at: string;
          curriculum: Json;
          description: string;
          difficulty: string;
          duration: string;
          features: string[];
          id: string;
          projects: string;
          slug: string;
          status: string;
          title: string;
        };
        Insert: {
          category?: string;
          created_at?: string;
          curriculum?: Json;
          description?: string;
          difficulty?: string;
          duration?: string;
          features?: string[];
          id?: string;
          projects?: string;
          slug: string;
          status?: string;
          title: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          curriculum?: Json;
          description?: string;
          difficulty?: string;
          duration?: string;
          features?: string[];
          id?: string;
          projects?: string;
          slug?: string;
          status?: string;
          title?: string;
        };
        Relationships: [];
      };
      downloads: {
        Row: {
          category: string;
          created_at: string;
          description: string;
          downloads_count: number;
          file_type: string;
          file_url: string;
          id: string;
          size_label: string | null;
          title: string;
        };
        Insert: {
          category?: string;
          created_at?: string;
          description?: string;
          downloads_count?: number;
          file_type?: string;
          file_url: string;
          id?: string;
          size_label?: string | null;
          title: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          description?: string;
          downloads_count?: number;
          file_type?: string;
          file_url?: string;
          id?: string;
          size_label?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      enrollments: {
        Row: {
          completed_at: string | null;
          course_id: string;
          enrolled_at: string;
          id: string;
          progress: number;
          status: string;
          user_id: string;
        };
        Insert: {
          completed_at?: string | null;
          course_id: string;
          enrolled_at?: string;
          id?: string;
          progress?: number;
          status?: string;
          user_id: string;
        };
        Update: {
          completed_at?: string | null;
          course_id?: string;
          enrolled_at?: string;
          id?: string;
          progress?: number;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      events: {
        Row: {
          created_at: string;
          description: string;
          ends_at: string | null;
          id: string;
          image_url: string | null;
          location: string;
          register_url: string | null;
          slug: string;
          starts_at: string;
          title: string;
        };
        Insert: {
          created_at?: string;
          description?: string;
          ends_at?: string | null;
          id?: string;
          image_url?: string | null;
          location?: string;
          register_url?: string | null;
          slug: string;
          starts_at: string;
          title: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          ends_at?: string | null;
          id?: string;
          image_url?: string | null;
          location?: string;
          register_url?: string | null;
          slug?: string;
          starts_at?: string;
          title?: string;
        };
        Relationships: [];
      };
      gallery_items: {
        Row: {
          caption: string | null;
          category: string;
          created_at: string;
          id: string;
          image_url: string;
          sort_order: number;
          title: string;
        };
        Insert: {
          caption?: string | null;
          category?: string;
          created_at?: string;
          id?: string;
          image_url: string;
          sort_order?: number;
          title: string;
        };
        Update: {
          caption?: string | null;
          category?: string;
          created_at?: string;
          id?: string;
          image_url?: string;
          sort_order?: number;
          title?: string;
        };
        Relationships: [];
      };
      news_items: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          image_url: string | null;
          published_at: string;
          slug: string;
          source_url: string | null;
          summary: string;
          title: string;
        };
        Insert: {
          body?: string;
          created_at?: string;
          id?: string;
          image_url?: string | null;
          published_at?: string;
          slug: string;
          source_url?: string | null;
          summary?: string;
          title: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          image_url?: string | null;
          published_at?: string;
          slug?: string;
          source_url?: string | null;
          summary?: string;
          title?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          created_at: string;
          id: string;
          link: string | null;
          message: string;
          read: boolean;
          title: string;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          link?: string | null;
          message?: string;
          read?: boolean;
          title: string;
          type?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          link?: string | null;
          message?: string;
          read?: boolean;
          title?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          full_name: string;
          id: string;
          role: string;
          updated_at: string;
          username: string | null;
          xp: number;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          full_name?: string;
          id: string;
          role?: string;
          updated_at?: string;
          username?: string | null;
          xp?: number;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          full_name?: string;
          id?: string;
          role?: string;
          updated_at?: string;
          username?: string | null;
          xp?: number;
        };
        Relationships: [];
      };
      reactions: {
        Row: {
          created_at: string;
          entity_id: string;
          entity_type: string;
          id: string;
          kind: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          entity_id: string;
          entity_type: string;
          id?: string;
          kind: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          entity_id?: string;
          entity_type?: string;
          id?: string;
          kind?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      showcase_projects: {
        Row: {
          course: string | null;
          created_at: string;
          description: string;
          featured: boolean;
          id: string;
          image_url: string | null;
          project_url: string | null;
          student_name: string;
          title: string;
        };
        Insert: {
          course?: string | null;
          created_at?: string;
          description?: string;
          featured?: boolean;
          id?: string;
          image_url?: string | null;
          project_url?: string | null;
          student_name: string;
          title: string;
        };
        Update: {
          course?: string | null;
          created_at?: string;
          description?: string;
          featured?: boolean;
          id?: string;
          image_url?: string | null;
          project_url?: string | null;
          student_name?: string;
          title?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          featured: boolean;
          id: string;
          name: string;
          quote: string;
          rating: number;
          role: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          featured?: boolean;
          id?: string;
          name: string;
          quote: string;
          rating?: number;
          role?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          featured?: boolean;
          id?: string;
          name?: string;
          quote?: string;
          rating?: number;
          role?: string | null;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      videos: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          published_at: string;
          thumbnail_url: string | null;
          title: string;
          youtube_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string;
          id?: string;
          published_at?: string;
          thumbnail_url?: string | null;
          title: string;
          youtube_id: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          published_at?: string;
          thumbnail_url?: string | null;
          title?: string;
          youtube_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      is_admin: { Args: never; Returns: boolean };
      notify_user: {
        Args: {
          _link?: string;
          _message: string;
          _title: string;
          _type?: string;
          _user_id: string;
        };
        Returns: undefined;
      };
      set_admin: {
        Args: { _make_admin: boolean; _user_id: string };
        Returns: undefined;
      };
    };
    Enums: {
      app_role: "admin" | "moderator" | "user";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const;
