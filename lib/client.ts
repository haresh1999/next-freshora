import type { NextApiResponse } from "next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ApiRequestOptions extends Omit<RequestInit, "headers"> {
    token?: string;
    headers?: HeadersInit;
}

export async function apiRequest<T = any>(
    endpoint: string,
    options: ApiRequestOptions = {}
): Promise<T> {
    if (!API_BASE_URL) {
        throw new Error("API URL is not configured in .env.local");
    }

    const { token, headers, ...requestOptions } = options;

    const response = await fetch(
        `${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`,
        {
            ...requestOptions,
            headers: {
                Accept: "application/json",
                ...(requestOptions.body ? { "Content-Type": "application/json" } : {}),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...headers,
            },
            cache: options.cache ?? "no-store",
        }
    );

    if (response.status === 204) {
        return null as T;
    }

    const data = await response.json();

    if (!response.ok || data.success === false) {
        throw new Error(data.message || `API error: ${response.status}`);
    }

    return data;
}

export function unknownMethod(res: NextApiResponse) {
    return res.status(405).json({
        success: false,
        message: "Method not allowed",
    });
}

export function errorResponse(
    res: NextApiResponse,
    message: string,
    statusCode = 500
) {
    return res.status(statusCode).json({
        success: false,
        message: message,
    });
}