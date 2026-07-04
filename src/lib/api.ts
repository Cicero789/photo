/**
 * API client — wraps fetch with auth token management.
 */

const API_BASE = "/api";

let authToken: string | null = localStorage.getItem("photo_token");

export function setToken(token: string | null) {
  authToken = token;
  if (token) {
    localStorage.setItem("photo_token", token);
  } else {
    localStorage.removeItem("photo_token");
  }
}

export function getToken(): string | null {
  return authToken;
}

interface ApiError {
  error: string;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("text/html")) {
    throw new Error(`API route not found (${res.status}). Check the endpoint path.`);
  }
  if (!ct.includes("application/json")) {
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    return {} as T; // non-JSON success (e.g., 204 No Content)
  }
  const data = await res.json();
  if (!res.ok) throw new Error((data as ApiError).error ?? `Request failed (${res.status})`);
  return data as T;
}

export const api = {
  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
    });
    return handleResponse<T>(res);
  },

  async post<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(res);
  },

  async put<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(res);
  },

  async delete<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "DELETE",
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(res);
  },
};
