import apiClient from "../api-client";

export interface User {
  id: string;
  email: string;
  phone: string;
  displayName: string;
  profileImage: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  countryCode: string | null;
  languagePreference: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  status: string;
  role: string;
  profession: string | null;
  createdAt: string;
  updatedAt: string;
}

export const getCurrentUser = async () => {
  const response = await apiClient.get<{ success: boolean; data: User }>("/api/users/me");
  return response.data;
};

export const updateCurrentUser = async (data: Partial<User>) => {
  const response = await apiClient.put<{ success: boolean; data: User }>("/api/users/me", data);
  return response.data;
};

export const getPresignedUrl = async (fileName: string, contentType: string) => {
  const response = await apiClient.post<{
    success: boolean;
    data: {
      uploadUrl: string;
      publicUrl: string;
      key: string;
    };
  }>("/api/upload/presigned-url", { fileName, contentType });
  return response.data;
};

export const uploadToS3 = async (url: string, file: File, contentType: string) => {
  const response = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": contentType,
      'x-amz-acl': 'public-read'  // This is crucial!
    },
  });

  if (!response.ok) {
    console.error("❌ [S3 Upload] Failed:", {
      status: response.status,
      statusText: response.statusText,
      url: url.substring(0, 100) + "...",
    });
    throw new Error(`Failed to upload to S3: ${response.statusText}`);
  }

  return response;
};
