export interface TrainerSocialLinks {
    twitter?: string;
    website?: string;
    linkedin?: string;
    instagram?: string;
}

export interface TrainerCourse {
    id: string;
    title: string;
    slug: string;
    thumbnailImage: string;
    level: string;
    status: string;
}

export interface TrainerDetail {
    id: string;
    userId: string;
    bio: string;
    specialization: string[];
    experience: number;
    rating: number;
    totalStudents: number;
    socialLinks: TrainerSocialLinks;
    status: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        displayName: string;
        email: string;
        profileImage: string;
        status: string;
    };
    courses: TrainerCourse[];
}
