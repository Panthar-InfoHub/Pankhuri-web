export interface CertificateMetadata {
    score?: string;
    grade?: string;
    completionDate?: string;
    [key: string]: any; // To handle any other dynamic metadata
}

export interface Certificate {
    id: string;
    userId: string;
    courseId: string;
    certificateNumber: string;
    certificateUrl: string;
    metaData: CertificateMetadata;
    createdAt: string;
    updatedAt: string;
    // We might want to include course title if the API returns it or if we fetch it separately
    course?: {
        id: string;
        title: string;
        thumbnailImage: string;
    };
}

export interface CertificateResponse {
    success: boolean;
    data: Certificate[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
