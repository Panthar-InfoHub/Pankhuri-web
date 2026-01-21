import axios, { AxiosRequestConfig } from "axios";
import { auth } from "./auth";

const getBaseURL = () => {
    return process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") || 'http://localhost:8080';
};

export async function serverApi(path: string, options: AxiosRequestConfig = {}) {
    const session = await auth();
    const token = (session as any)?.accessToken;

    const apiClient = axios.create({
        baseURL: getBaseURL(),
    });

    try {
        const response = await apiClient({
            url: path,
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error(`Server API Error [${path}]:`, error.response?.data || error.message);
        return error.response?.data || { success: false, message: error.message };
    }
}
