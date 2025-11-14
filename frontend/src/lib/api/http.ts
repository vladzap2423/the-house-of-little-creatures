export const API_URL = process.env.NEXT_PUBLIC_API_URL

interface RequestOptions {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const fetchOptions: RequestInit = {
        method: options.method ?? 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers ?? {}),
        },
    };

    if (options.body) {
        fetchOptions.body = JSON.stringify(options.body);
    }

    const res = await fetch(`${API_URL}${endpoint}`, fetchOptions);

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed: ${res.status} ${text}`);
    }

    return res.json() as Promise<T>;
}

export const http = {
    get: <T>(url: string) => request<T>(url),
    post: <T>(url: string, body?: any) =>
        request<T>(url, { method: 'POST', body }),
    put: <T>(url: string, body?: any) =>
        request<T>(url, { method: 'PUT', body }),
    delete: <T>(url: string) =>
        request<T>(url, { method: 'DELETE' }),
};
