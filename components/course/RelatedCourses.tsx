// components/course/RelatedCourses.tsx

import { getRelatedCourses } from "@/api/courses";
import { CourseGrid } from "@/components/home/CourseGrid";
import { ErrorState } from "@/components/shared/error-state";
import { GridSkeleton } from "@/components/shared/skeletons";
import { Suspense } from "react";

interface RelatedCoursesProps {
    courseId: string;
}

async function RelatedCoursesContent({ courseId }: { courseId: string }) {
    try {
        const response = await getRelatedCourses(courseId, 6);

        if (!response.success || !response.data || response.data.length === 0) {
            return null;
        }

        return (
            <section className="max-w-7xl mx-auto px-4 py-20 border-t border-white/5">
                <h2 className="text-2xl font-bold text-white mb-10 text-center">Related Courses</h2>
                <CourseGrid title="" courses={response.data} />
            </section>
        );
    } catch (error) {
        console.error("RelatedCoursesContent Error:", error);
        return null; // Silently fail for related courses
    }
}

export function RelatedCourses({ courseId }: RelatedCoursesProps) {
    return (
        <Suspense fallback={
            <section className="max-w-7xl mx-auto px-4 py-20 border-t border-white/5">
                <h2 className="text-2xl font-bold text-white mb-10 text-center">Related Courses</h2>
                <GridSkeleton count={3} />
            </section>
        }>
            <RelatedCoursesContent courseId={courseId} />
        </Suspense>
    );
}
