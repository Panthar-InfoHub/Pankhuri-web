// types/progress.ts

export interface CourseProgressRecord {
    id: string;
    userId: string;
    courseId: string;
    progress: number;
    isCompleted: boolean;
    completedAt: string | null;
    lastLessonId: string | null;
    metadata: any | null;
    createdAt: string;
    updatedAt: string;
    course: {
        id: string;
        title: string;
        slug: string;
        thumbnailImage: string;
    };
}

export interface LessonProgressRecord {
    id: string;
    userId: string;
    lessonId: string;
    isCompleted: boolean;
    completedAt: string | null;
    currentTimestamp: number | null;
    createdAt: string;
    updatedAt: string;
    lesson: {
        id: string;
        title: string;
        slug: string;
        sequence: number;
        moduleId: string;
    };
}

export interface CourseProgressDetail {
    courseProgress: CourseProgressRecord | null;
    totalLessons: number;
    completedLessons: number;
    lessonProgress: LessonProgressRecord[];
}

export interface CourseProgressResponse {
    success: boolean;
    data: CourseProgressDetail;
}

export interface LessonProgressResponse {
    success: boolean;
    data: LessonProgressRecord | null;
    message?: string;
}
