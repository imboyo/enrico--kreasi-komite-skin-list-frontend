"use client";

import { NEXT_PUBLIC_BACKEND_HOST } from "config";
import { APP_URL } from "constant";
import { HttpError } from "libs/error/http-error";
import { useAuthStore } from "store/auth/auth.store";

// Prevents multiple concurrent 401s from each triggering their own refresh call
let refreshPromise: Promise<{
  access_token: string;
  refresh_token: string;
}> | null = null;

async function silentRefresh(
  refreshToken: string,
): Promise<{ access_token: string; refresh_token: string }> {
  // Reuse in-flight refresh if one is already running
  if (refreshPromise) return refreshPromise;

  // Inner async fn so the promise is assigned before awaiting,
  // allowing concurrent callers to share the same in-flight request
  const doRefresh = async () => {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_HOST}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new HttpError(res, body);
    }

    return res.json();
  };

  refreshPromise = doRefresh().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

/**
 * Authenticated fetch wrapper.
 *
 * - Attaches Bearer token from the auth store on every request.
 * - On 401: attempts silent refresh → retries once → clears auth + redirects to login on failure.
 * - On 403: returns the response as-is; caller decides how to handle forbidden access.
 * - For multipart/form-data: do NOT set Content-Type manually; let the browser set it.
 */
export async function fetcher(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const { accessToken, refreshToken, setTokens, clearAuth } =
    useAuthStore.getState();

  const headers = new Headers(init.headers);
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const res = await fetch(`${NEXT_PUBLIC_BACKEND_HOST}${path}`, {
    ...init,
    headers,
  });

  // Not 401 — pass through (403 is the caller's responsibility)
  if (res.status !== 401) return res;

  // 401 with no refresh token — session is gone
  if (!refreshToken) {
    const body = await res.json().catch(() => null);
    clearAuth();
    window.location.replace(APP_URL.LOGIN);
    throw new HttpError(res, body);
  }

  const forceLogout = (err: unknown): never => {
    clearAuth();
    window.location.replace(APP_URL.LOGIN);
    throw err;
  };

  const refreshed = await silentRefresh(refreshToken).catch(forceLogout);
  setTokens(refreshed.access_token, refreshed.refresh_token);

  // Retry the original request once with the new access token
  headers.set("Authorization", `Bearer ${refreshed.access_token}`);
  return fetch(`${NEXT_PUBLIC_BACKEND_HOST}${path}`, { ...init, headers });
}
