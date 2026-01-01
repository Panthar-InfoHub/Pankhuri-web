// lib/api/categories.ts

import { serverApi } from "@/lib/api-server";
import { Category } from "@/types/category";
import { ApiResponse, QueryParams } from "@/types/api";

export async function getCategories(params: QueryParams = {}): Promise<ApiResponse<Category[]>> {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.status) searchParams.append('status', params.status);
    if (params.search) searchParams.append('search', params.search);

    const queryString = searchParams.toString();
    const path = `/api/categories/flat${queryString ? `?${queryString}` : ''}`;

    return serverApi(path, {
        next: {
            revalidate: 3600, // Revalidate every hour
            tags: ['categories']
        }
    });
}
