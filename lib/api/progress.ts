import apiClient from "@/lib/api-client";

export async function markLessonComplete(lessonId: string, currentTimestamp?: number) {
    const response = await apiClient.post(`/api/progress/lessons/${lessonId}/complete`, {
        currentTimestamp
    });
    return response.data;
}

export async function getCourseProgress(courseId: string) {
    const response = await apiClient.get(`/api/progress/courses/${courseId}/details`);
    return response.data;
}

export async function getLessonProgress(lessonId: string) {
    const response = await apiClient.get(`/api/progress/lessons/${lessonId}`);
    return response.data;
}
