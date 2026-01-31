import apiClient from "../api-client";
import { Course } from "@/types/course";

export type { Course };

export interface PurchaseResponse {
  orderId: string;
  amount: number;
  amountInRupees: number;
  currency: string;
  keyId: string;
  planName: string;
  subscriptionType: string;
  userSubscriptionId: string;
  message: string;
}

export interface VerifyPaymentRequest {
  orderId: string;
  paymentId: string;
  signature: string;
}

export const getAllCourses = async () => {
  const response = await apiClient.get<{ success: boolean; data: Course[] }>("/api/courses");
  return response.data;
};

export const getCourseBySlug = async (slug: string) => {
  const response = await apiClient.get<{ success: boolean; data: Course }>(`/api/courses/${slug}`);
  return response.data;
};

export const getCoursesByCategory = async (categoryId: string) => {
  const response = await apiClient.get<{ success: boolean; data: Course[] }>(
    `/api/courses?categoryId=${categoryId}`,
  );
  return response.data;
};

export const purchaseCourse = async (courseId: string) => {
  const response = await apiClient.post<{ success: boolean; data: PurchaseResponse }>(
    "/api/purchases/course",
    { courseId },
  );
  return response.data;
};

export const verifyCoursePurchase = async (data: VerifyPaymentRequest) => {
  const response = await apiClient.post<{ success: boolean; message: string }>(
    "/api/purchases/course/verify",
    data,
  );
  return response.data;
};
