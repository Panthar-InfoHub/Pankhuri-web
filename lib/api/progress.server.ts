// Server-side API for course progress
import { serverApi } from "@/lib/api-server";
import { CourseProgressResponse, LessonProgressResponse } from "@/types/progress";

export async function getCourseProgressServer(courseId: string): Promise<CourseProgressResponse> {
    return serverApi(`/api/progress/courses/${courseId}/details`);
}

export async function getLessonProgressServer(lessonId: string): Promise<LessonProgressResponse> {
    return serverApi(`/api/progress/lessons/${lessonId}`);
}
