import { useCallback, useEffect, useState } from "react";
import { notificationService, type AppNotification } from "@/lib/notifications/notificationService";

export interface UseNotificationsResult {
  notifications: AppNotification[];
  unreadCount: number;
  loading: boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export function useNotifications(): UseNotificationsResult {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((next) => {
      setNotifications(next);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const markAsRead = useCallback((id: string) => {
    void notificationService.markAsRead(id);
  }, []);

  const markAllAsRead = useCallback(() => {
    void notificationService.markAllAsRead();
  }, []);

  const clearAll = useCallback(() => {
    void notificationService.clearAll();
  }, []);

  const unreadCount = notifications.reduce((count, n) => count + (n.read ? 0 : 1), 0);

  return { notifications, unreadCount, loading, markAsRead, markAllAsRead, clearAll };
}
