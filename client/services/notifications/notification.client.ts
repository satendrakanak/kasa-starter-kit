import { apiClient, withAuthRetry } from "@/lib/api/client";
import type { ApiResponse } from "@/types/api";
import type { AppNotification } from "@/types/notification";

export const notificationClientService = {
  getMine: (limit = 20) =>
    withAuthRetry(() =>
      apiClient.get<ApiResponse<AppNotification[]>>(
        `/api/notifications/my?limit=${limit}`,
      ),
    ),

  getUnreadCount: () =>
    withAuthRetry(() =>
      apiClient.get<ApiResponse<{ count: number }>>(
        "/api/notifications/my/unread-count",
      ),
    ),

  markRead: (id: number) =>
    withAuthRetry(() =>
      apiClient.patch<ApiResponse<AppNotification>>(
        `/api/notifications/${id}/read`,
      ),
    ),

  markClicked: (id: number) =>
    withAuthRetry(() =>
      apiClient.patch<ApiResponse<AppNotification>>(
        `/api/notifications/${id}/click`,
      ),
    ),

  markAllRead: () =>
    withAuthRetry(() =>
      apiClient.patch<ApiResponse<{ message: string }>>(
        "/api/notifications/my/read-all",
      ),
    ),

  delete: (id: number) =>
    withAuthRetry(() =>
      apiClient.delete<ApiResponse<{ message: string }>>(
        `/api/notifications/${id}`,
      ),
    ),

};
