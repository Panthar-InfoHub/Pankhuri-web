"use client";

import { useQuery } from "@tanstack/react-query";
import { getCourseProgress } from "@/lib/api/progress";
import { CourseProgressResponse } from "@/types/progress";

export function useCourseProgress(courseId: string, enabled: boolean = true) {
    return useQuery<CourseProgressResponse>({
        queryKey: ["course-progress", courseId],
        queryFn: () => getCourseProgress(courseId),
        enabled: !!courseId && enabled,
    });
}
