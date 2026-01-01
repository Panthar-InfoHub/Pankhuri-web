// types/course.ts

import { CategoryPricing } from "./category";

export interface Trainer {
    id: string;
    user: {
        id?: string;
        displayName: string;
        profileImage: string;
    };
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
    createdAt: string;
    updatedAt: string;
    category: {
        id?: string;
        name: string;
        slug: string;
    };
    trainer: Trainer;
    isPaid: boolean;
    hasAccess: boolean;
    pricing: CategoryPricing | null;
}
