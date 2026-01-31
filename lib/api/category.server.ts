// Server-side API for categories

import { serverApi } from "@/lib/api-server";
import { Category } from "@/types/category";
import { ApiResponse, QueryParams } from "@/types/api";

export async function getAllCategories(params: QueryParams = {}): Promise<ApiResponse<Category[]>> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", params.page.toString());
  if (params.limit) searchParams.append("limit", params.limit.toString());
  if (params.status) searchParams.append("status", params.status);
  if (params.search) searchParams.append("search", params.search);

  const queryString = searchParams.toString();
  const path = `/api/categories${queryString ? `?${queryString}` : ""}`;

  
  const result = await serverApi(path);

  return result;
}

export async function getCategories(params: QueryParams = {}): Promise<ApiResponse<Category[]>> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", params.page.toString());
  if (params.limit) searchParams.append("limit", params.limit.toString());
  if (params.status) searchParams.append("status", params.status);
  if (params.search) searchParams.append("search", params.search);

  const queryString = searchParams.toString();
  const path = `/api/categories/flat${queryString ? `?${queryString}` : ""}`;

 
  const result = await serverApi(path);
  
  return result;
}

export async function getCategoryBySlug(
  slug: string,
  showNestedCourses: boolean = false,
): Promise<ApiResponse<Category>> {
  const queryString = showNestedCourses ? "?showNestedCourses=true" : "";
  const path = `/api/categories/slug/${slug}${queryString}`;

  const result = await serverApi(path);
  return result;
}
