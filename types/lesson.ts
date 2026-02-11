// types/lesson.ts

import { Course } from "./course";

export interface VideoProduct {
    url: string;
    name: string;
    image: string;
}

export interface VideoTimestamp {
    time_content: string;
    time_interval: string;
}

export interface VideoDescriptionDetail {
    products: VideoProduct[];
    disclaimer: string;
    timestamps: VideoTimestamp[];
    description: string;
}

export interface VideoDetail {
    id: string;
    title: string;
    videoDescription: VideoDescriptionDetail | null;
    thumbnailUrl: string;
    storageKey: string;
    playbackUrl: string;
    externalUrl: string;
    status: string;
    duration: number;
    metadata: {
        size: number;
        format: string;
        resolution: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface VideoLesson {
    id: string;
    lessonId: string;
    videoId: string;
    createdAt: string;
    updatedAt: string;
    video: VideoDetail;
}

export interface LessonDescription {
    id: string;
    lessonId: string;
    textContent: string;
    createdAt: string;
    updatedAt: string;
}

export interface LessonDetail {
    id: string;
    courseId: string;
    moduleId: string | null;
    title: string;
    slug: string;
    type: 'video' | 'text' | 'quiz';
    description: string;
    sequence: number;
    duration: number;
    isFree: boolean;
    isMandatory: boolean;
    status: string;
    metadata: any;
    createdAt: string;
    updatedAt: string;
    course: {
        id: string;
        title: string;
    };
    videoLesson: VideoLesson | null;
    textLesson: {
        id: string;
        lessonId: string;
        content: string;
        estimatedReadTime: number;
        createdAt: string;
        updatedAt: string;
    } | null;
    lessonDescription: LessonDescription | null;
    lessonAttachments: any[];
    navigation: {
        next: { id: string; slug: string; title: string } | null;
        previous: { id: string; slug: string; title: string } | null;
    };
}
