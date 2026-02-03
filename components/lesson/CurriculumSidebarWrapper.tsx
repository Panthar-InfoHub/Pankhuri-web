import { getCourseBySlug } from "@/lib/api/course.server";
import { LessonCurriculumSidebar } from "./LessonCurriculumSidebar";
import { Suspense } from "react";

interface CurriculumSidebarWrapperProps {
    slug: string;
    lessonSlug: string;
}

async function CurriculumSidebar({ slug, lessonSlug }: CurriculumSidebarWrapperProps) {
    const courseResponse = await getCourseBySlug(slug);

    if (!courseResponse?.success || !courseResponse.data || !courseResponse.data.curriculum) {
        return (
            <div className="bg-gray-50 rounded-2xl border border-gray-300 p-4">
                <p className="text-gray-600 text-sm">Failed to load curriculum</p>
            </div>
        );
    }

    return (
        <LessonCurriculumSidebar
            curriculum={courseResponse.data.curriculum}
            courseSlug={slug}
            currentLessonSlug={lessonSlug}
            hasAccess={courseResponse.data.hasAccess}
        />
    );
}

function SidebarSkeleton() {
    return (
        <div className="bg-gray-50 rounded-2xl border border-gray-300 overflow-hidden animate-pulse">
            <div className="p-4 border-b border-gray-300 bg-gray-100">
                <div className="h-4 w-32 bg-gray-300 rounded" />
            </div>
            <div className="p-4 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded" />
                ))}
            </div>
        </div>
    );
}

export function CurriculumSidebarWrapper(props: CurriculumSidebarWrapperProps) {
    return (
        <Suspense fallback={<SidebarSkeleton />}>
            <CurriculumSidebar {...props} />
        </Suspense>
    );
}
