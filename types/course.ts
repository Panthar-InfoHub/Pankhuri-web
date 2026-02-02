// types/course.ts

import { CategoryPricing } from "./category";

export interface Trainer {
    id: string;
    user: {
        id?: string;
        displayName: string;
        profileImage: string;
        email?: string;
    };
}

export interface Lesson {
    id: string;
    courseId: string;
    moduleId: string;
    title: string;
    slug: string;
    type: 'video' | 'text' | 'quiz' | 'lesson';
    description: string;
    sequence: number;
    duration: number;
    isFree: boolean;
    isMandatory: boolean;
    status: string;
    metadata: any;
    createdAt: string;
    updatedAt: string;
    videoLesson: any;
    textLesson: any;
    thumbnail: string | null;
    isLocked: boolean;
    itemType?: 'lesson';
}

export interface Module {
    id: string;
    courseId: string;
    title: string;
    slug: string;
    description: string;
    sequence: number;
    duration: number;
    status: string;
    metadata: any;
    createdAt: string;
    updatedAt: string;
    lessons: Lesson[];
    type: 'module';
    itemType?: 'module';
}

export interface Course {
    id: string;
    categoryId: string;
    trainerId: string;
    title: string;
    slug: string;
    description: string;
    thumbnailImage: string;
    coverImage: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: number;
    language: string;
    status: 'active' | 'inactive' | 'draft';
    hasCertificate: boolean;
    rating: number;
    averageRating: number;
    totalReviews: number;
    tags: string[];
    metadata: {
        prerequisites?: string[];
        targetAudience?: string;
        whatYouWillLearn?: string[];
        difficulty?: string;
        instructor?: string;
    };
    demoVideoId: string | null;
    demoVideo?: {
        id: string;
        playbackUrl: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    category: {
        id?: string;
        name: string;
        slug: string;
    };
    trainer: Trainer;
    _count: {
        modules: number;
        lessons: number;
    };
    isPaid: boolean;
    hasAccess: boolean;
    pricing: CategoryPricing | null;
    curriculum?: (Module | Lesson)[];
    certificateInfo?: {
        hasCertificate: boolean;
        isClaimable: boolean;
        isCompleted: boolean;
        certificateUrl: string | null;
    };
    stats?: {
        totalModules: number;
        totalLessons: number;
        totalDuration: number;
    };
}
