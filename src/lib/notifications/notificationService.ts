import { supabase } from "@/lib/supabase";

export type NotificationType = "info" | "success" | "warning" | "course";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string; // ISO timestamp
  link?: string | null;
}

type Listener = (notifications: AppNotification[]) => void;

type Row = {
  id: string;
  title: string;
  message: string | null;
  type: NotificationType;
  read: boolean;
  link: string | null;
  created_at: string;
};

function toNotification(row: Row): AppNotification {
  return {
    id: row.id,
    title: row.title,
    message: row.message ?? "",
    type: row.type,
    read: row.read,
    link: row.link,
    createdAt: row.created_at,
  };
}

async function fetchAll(): Promise<AppNotification[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from("notifications")
    .select("id, title, message, type, read, link, created_at")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) {
    console.error("Error loading notifications:", error.message);
    return [];
  }
  return ((data ?? []) as Row[]).map(toNotification);
}

/**
 * Notification service backed by the `notifications` table, with live updates
 * through Realtime. Rows are private per user via RLS.
 */
export const notificationService = {
  list(): Promise<AppNotification[]> {
    return fetchAll();
  },

  subscribe(listener: Listener): () => void {
    let active = true;

    const push = async () => {
      const next = await fetchAll();
      if (active) listener(next);
    };

    void push();

    const channel = supabase
      .channel("notifications-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, () => {
        void push();
      })
      .subscribe();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      void push();
    });

    return () => {
      active = false;
      authListener?.subscription?.unsubscribe?.();
      void supabase.removeChannel(channel);
    };
  },

  async markAsRead(id: string): Promise<void> {
    const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id);
    if (error) console.error("Error marking notification read:", error.message);
  },

  async markAllAsRead(): Promise<void> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false);
    if (error) console.error("Error marking notifications read:", error.message);
  },

  async clearAll(): Promise<void> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("notifications").delete().eq("user_id", user.id);
    if (error) console.error("Error clearing notifications:", error.message);
  },
};
