import apiClient from "../api-client";

export interface Review {
    id: string;
    rating: number;
    review: string;
    user: {
        id: string;
        displayName: string | null;
        profileImage: string | null;
    };
    createdAt: string;
    updatedAt: string;
    isMyReview: boolean;
}

export interface ReviewStats {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
}

export interface ReviewsResponse {
    myReview: Review | null;
    reviews: Review[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    stats: ReviewStats;
}

export interface CreateReviewData {
    rating: number;
    review: string;
}

export interface UpdateReviewData {
    rating: number;
    review: string;
}

export const getCourseReviews = async (
    courseId: string,
    page: number = 1,
    limit: number = 10,
    sort: 'newest' | 'oldest' | 'highest' | 'lowest' = 'newest'
) => {
    const response = await apiClient.get<{ success: boolean; data: ReviewsResponse }>(
        `/api/courses/${courseId}/reviews`,
        {
            params: { page, limit, sort }
        }
    );
    return response.data;
};

export const createCourseReview = async (courseId: string, data: CreateReviewData) => {
    const response = await apiClient.post<{ success: boolean; data: Review }>(
        `/api/courses/${courseId}/reviews`,
        data
    );
    return response.data;
};

export const updateCourseReview = async (courseId: string, data: UpdateReviewData) => {
    const response = await apiClient.put<{ success: boolean; data: Review }>(
        `/api/courses/${courseId}/reviews`,
        data
    );
    return response.data;
};

export const deleteCourseReview = async (courseId: string) => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
        `/api/courses/${courseId}/reviews`
    );
    return response.data;
};
