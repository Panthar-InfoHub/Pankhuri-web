// types/api.ts

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    pagination?: Pagination;
    message?: string;
}

export interface QueryParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'active' | 'inactive';
    sort?: string;
    [key: string]: any;
}
