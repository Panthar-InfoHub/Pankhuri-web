import apiClient from "../api-client";

export interface Session {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
    fcmToken: string | null;
}

export const getAllSessions = async () => {
    const response = await apiClient.get<{
        success: boolean;
        data: {
            sessions: Session[];
            count: number;
        };
    }>("/api/sessions");
    return response.data;
};

export const logoutCurrentSession = async () => {
    const response = await apiClient.delete<{ success: boolean }>("/api/sessions/current");
    return response.data;
};

export const logoutAllSessions = async () => {
    const response = await apiClient.delete<{ success: boolean }>("/api/sessions/all/logout");
    return response.data;
};

export const logoutSession = async (sessionId: string) => {
    const response = await apiClient.delete<{ success: boolean }>(`/api/sessions/${sessionId}`);
    return response.data;
};
