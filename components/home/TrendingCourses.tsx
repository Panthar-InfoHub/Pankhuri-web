// components/home/TrendingCourses.tsx

import { getTrendingCourses } from "@/lib/api/courses";
import { CourseGrid } from "./CourseGrid";
import { ErrorState } from "@/components/shared/error-state";
import { GridSkeleton } from "@/components/shared/skeletons";
import { Suspense } from "react";

async function TrendingCoursesContent() {
    try {
        const response = await getTrendingCourses(6);

        if (!response.success || !response.data) {
            return <ErrorState message={response.message || "Failed to load trending courses."} />;
        }

        // Bridge new API course type to the existing CourseGrid expectation 
        // (assuming we want to keep using CourseGrid for now, or we'll refactor it later)
        // For now, I'll pass the real data.
        return <CourseGrid title="Trending Now" courses={response.data} />;
    } catch (error) {
        console.error("TrendingCoursesContent Error:", error);
        return <ErrorState message="An unexpected error occurred." />;
    }
}

export function TrendingCourses() {
    return (
        <Suspense fallback={<div><h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2><GridSkeleton count={3} /></div>}>
            <TrendingCoursesContent />
        </Suspense>
    );
}
