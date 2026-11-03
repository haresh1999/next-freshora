const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(endpoint, options = {}) {
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

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || `API error: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}