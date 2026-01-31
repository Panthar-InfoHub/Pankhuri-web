// Server-side API for courses

import { serverApi } from "@/lib/api-server";
import { Course } from "@/types/course";
import { ApiResponse, QueryParams } from "@/types/api";

export async function getTrendingCourses(limit: number = 10): Promise<ApiResponse<Course[]>> {
  const path = `/api/courses/trending?limit=${limit}`;
  return serverApi(path);
}

export async function getAllCourses(params: QueryParams = {}): Promise<ApiResponse<Course[]>> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", params.page.toString());
  if (params.limit) searchParams.append("limit", params.limit.toString());
  if (params.search) searchParams.append("search", params.search);
  if (params.tags) searchParams.append("tags", params.tags);
  if (params.sort) searchParams.append("sort", params.sort);
  if (params.duration) searchParams.append("duration", params.duration);

  const queryString = searchParams.toString();
  const path = `/api/courses${queryString ? `?${queryString}` : ""}`;

  return serverApi(path);
}

export async function getCourseBySlug(slug: string): Promise<ApiResponse<Course>> {
  return serverApi(`/api/courses/slug/${slug}`);
}

export async function getCourseById(id: string): Promise<ApiResponse<Course>> {
  return serverApi(`/api/courses/${id}`);
}

export async function getRelatedCourses(
  courseId: string,
  limit: number = 6,
): Promise<ApiResponse<Course[]>> {
  return serverApi(`/api/courses/${courseId}/related?limit=${limit}`);
}
