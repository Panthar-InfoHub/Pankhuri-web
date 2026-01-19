// lib/server-api.ts


import { auth } from "./auth";

export async function serverApi(path: string, options: RequestInit = {}) {
    const session = await auth();
    const token = (session as any)?.accessToken;

    // Ensure path starts with a slash
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");
    const fullUrl = `${baseUrl}${cleanPath}`;

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    return res.json();
}