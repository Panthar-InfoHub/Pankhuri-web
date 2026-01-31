import apiClient from "../api-client";
import { Category as CategoryType } from "@/types/category";

export type Category = CategoryType;

export const getAllCategories = async () => {
  const response = await apiClient.get<{ success: boolean; data: Category[] }>("/api/categories");
  return response.data;
};

export const getCategoryBySlug = async (slug: string) => {
  const response = await apiClient.get<{ success: boolean; data: Category }>(
    `/api/categories/${slug}`,
  );
  return response.data;
};
