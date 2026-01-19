import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const getBaseURL = () => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    // const backupUrl = process.env.BACKEND_URL;

    if (!url && process.env.NODE_ENV === 'development') {
        console.warn('API Client: NEXT_PUBLIC_BACKEND_URL is missing. Falling back to http://localhost:8080');
        return 'http://localhost:8080';
    }
    return url;
};

const apiClient = axios.create({
    baseURL: getBaseURL(),
});

console.log('API Client: Final BaseURL:', apiClient.defaults.baseURL);

// AUTO-ATTACH TOKEN INTERCEPTOR
apiClient.interceptors.request.use(async (config) => {
    const session: any = await getSession();

    console.log('API Client: Session Check:', {
        hasSession: !!session,
        hasToken: !!session?.accessToken,
        user: session?.user?.email || session?.user?.name
    });

    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    console.log(`API Client: Outgoing Request: [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`, {
        headers: config.headers
    });

    return config;
}, (error) => {
    console.error('API Client: Request Interceptor Error:', error);
    return Promise.reject(error);
});

// RESPONSE INTERCEPTOR FOR AUTH ERRORS
apiClient.interceptors.response.use(
    (response) => {
        console.log(`API Client: Success Response from ${response.config.url}:`, response.data);
        return response;
    },
    (error) => {
        console.error('API Client: Response Error Details:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });

        if (error.response?.status === 401) {
            console.warn('API Client: Unauthorized (401). Clearing session and redirecting...');
            if (typeof window !== "undefined") {
                const currentPath = window.location.pathname + window.location.search;
                // signOut from next-auth/react clears the session cookie
                signOut({
                    callbackUrl: `/login?callbackUrl=${encodeURIComponent(currentPath)}&session_expired=true`,
                    redirect: true
                });
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;