import apiClient from "../api-client";

export interface Plan {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  subscriptionType: "monthly" | "yearly" | "lifetime";
  duration: number | null;
  price: number;
  discountedPrice: number | null;
  currency: string;
  provider: string;
  planId: string;
  trialDays: number;
  trialFee: number;
  features: any;
  isActive: boolean;
  order: number | null;
  planType: string;
  targetId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionResponse {
  subscriptionId: string;
  shortUrl: string;
  amount: number;
  currency: string;
  keyId: string;
  trialDays: number;
  planName: string;
  hasTrial: boolean;
  hasTrialFee: boolean;
  message: string;
}

export const getPlans = async (type: "whole_app" | "course" = "whole_app") => {
  const response = await apiClient.get<{ success: boolean; data: Plan[] }>(
    `/api/plans?type=${type}`,
  );
  return response.data;
};

export const initiateSubscription = async (planId: string) => {
  const response = await apiClient.post<{
    success: boolean;
    message: string;
    data: SubscriptionResponse;
  }>("/api/subscriptions", { planId });
  return response.data;
};
