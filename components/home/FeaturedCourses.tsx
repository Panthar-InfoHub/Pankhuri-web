// components/home/FeaturedCourses.tsx

import { getAllCourses } from "@/lib/api/course.server";
import { CourseGrid } from "./CourseGrid";
import { ErrorState } from "@/components/shared/error-state";
import { GridSkeleton } from "@/components/shared/skeletons";
import { Suspense } from "react";

async function FeaturedCoursesContent() {
  try {
    const response = await getAllCourses({ limit: 6, sort: "newest" });

    if (!response.success || !response.data) {
      return <ErrorState message={response.message || "Failed to load featured courses."} />;
    }

    console.log(response.data);

    return <CourseGrid title="Featured Courses" courses={response.data as any} />;
  } catch (error) {
    console.error("FeaturedCoursesContent Error:", error);
    return <ErrorState message="An unexpected error occurred." />;
  }
}

export function FeaturedCourses() {
  return (
    <Suspense
      fallback={
        <div>
          <h2 className="text-2xl font-bold text-black mb-6">Featured Courses</h2>
          <GridSkeleton count={3} />
        </div>
      }
    >
      <FeaturedCoursesContent />
    </Suspense>
  );
}
