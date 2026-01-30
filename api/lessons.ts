// api/lessons.ts

import { serverApi } from "@/lib/api-server";
import { ApiResponse } from "@/types/api";
import { LessonDetail } from "@/types/lesson";

export async function getLessonBySlug(courseId: string, slug: string): Promise<ApiResponse<LessonDetail>> {
    const path = `/api/lessons/course/${courseId}/slug/${slug}`;
    return serverApi(path);
}
