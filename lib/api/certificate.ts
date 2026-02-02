import { serverApi } from "@/lib/api-server";
import apiClient from "@/lib/api-client";
import { CertificateResponse } from "@/types/certificate";

export async function getMyCertificates(): Promise<CertificateResponse> {
    return serverApi("/api/certificate/me");
}

export async function createCertificate(courseId: string, phone: string): Promise<any> {
    const response = await apiClient.post("/api/certificate", {
        course_id: courseId,
        phone: phone
    });
    return response.data;
}
