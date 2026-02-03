import apiClient from "../api-client";

export interface Subscription {
    id: string;
    status: string;
    planName: string;
    planType: "WHOLE_APP" | "CATEGORY" | "COURSE";
    targetId: string | null;
    subscriptionType: "monthly" | "yearly" | "once";
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    nextBillingAt: string | null;
    isTrial: boolean;
    provider: string;
}

export interface SubscriptionStatus {
    hasActiveSubscription: boolean;
    wholeApp: Subscription[];
    categories: Subscription[];
    courses: Subscription[];
}

export const getSubscriptionStatus = async () => {
    const response = await apiClient.get<{ success: boolean; data: SubscriptionStatus }>("/api/subscriptions/status");
    return response.data;
};

export const cancelSubscription = async (id: string) => {
    const response = await apiClient.post<{ success: boolean }>(`/api/subscriptions/${id}/cancel`);
    return response.data;
};

export const cancelSubscriptionImmediately = async (id: string) => {
    const response = await apiClient.post<{ success: boolean }>(`/api/subscriptions/${id}/cancel-immediately`);
    return response.data;
};

export const deletePendingSubscription = async (id: string) => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/api/subscriptions/${id}/pending`);
    return response.data;
};

export const deleteAllPendingSubscriptions = async () => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/api/subscriptions/pending`);
    return response.data;
};
