// api/lessons.ts

import { serverApi } from "@/lib/api-server";
import { ApiResponse } from "@/types/api";
import { LessonDetail } from "@/types/lesson";

export async function getLessonBySlug(courseSlug: string, lessonSlug: string): Promise<ApiResponse<LessonDetail>> {
    const path = `/api/lessons/course/${courseSlug}/lesson/${lessonSlug}`;
    return serverApi(path);
}
