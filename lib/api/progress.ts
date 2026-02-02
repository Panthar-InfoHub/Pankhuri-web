import apiClient from "@/lib/api-client";

export async function markLessonComplete(lessonId: string, currentTimestamp?: number) {
    const response = await apiClient.post(`/api/progress/lessons/${lessonId}/complete`, {
        currentTimestamp
    });
    return response.data;
}
