/*
 * RTK Query — Base API Definition
 *
 * WHAT: The foundation for ALL API calls in the app.
 * WHY:  RTK Query's createApi sets up a single "API slice" that:
 *       - Auto-generates React hooks for each endpoint
 *       - Manages request caching (no duplicate requests)
 *       - Handles loading, error, and success states
 *       - Auto-invalidates stale data via tags
 * HOW:  This file defines the base URL and creates the API.
 *       Individual features "inject" their endpoints into this base
 *       (code splitting — each feature defines its own endpoints).
 *
 * PATTERN: Base API here → Features inject endpoints via `baseApi.injectEndpoints()`
 *          This is the recommended RTK Query "code splitting" pattern.
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import {
  getMockBlogBySlug, updateMockBlog, deleteMockBlog, getMockBlogResponse, createMockBlog,
  getMockLogs, createMockLog, updateMockLog, deleteMockLog,
} from "./mockData";

// Base URL — points to FastAPI backend.
// In development: Vite proxy handles CORS (configured in vite.config.ts)
// In production: Vercel rewrites handle it, or CORS middleware on FastAPI
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/api` 
  : "/api";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  // Attach Firebase ID token on every request — auto-refreshes every hour
  prepareHeaders: async (headers) => {
    const { auth } = await import("../../lib/firebase");
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Toggle to bypass mocks and hit real API even in development
// Defaults to true in Dev unless explicitly set to 'false'
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false' && import.meta.env.DEV;

const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  if (USE_MOCK) {
    const url = typeof args === 'string' ? args : args.url;
    const method = typeof args === 'string' ? 'GET' : (args.method?.toUpperCase() ?? 'GET');
    const body = typeof args === 'string' ? undefined : args.body as Record<string, unknown> | undefined;

    await new Promise(r => setTimeout(r, 300)); // Simulate network latency

    // ── Blog endpoints ──
    if (url.match(/\/v1\/blogs\/[^/?]+/) && !url.includes('?page=')) {
      const slug = url.split('/').filter(Boolean).pop() ?? '';
      if (method === 'GET') {
        const blog = getMockBlogBySlug(slug);
        return blog ? { data: blog } : { error: { status: 404, data: 'Not found' } };
      }
      if (method === 'PUT') {
        const updated = updateMockBlog(slug, body ?? {});
        return updated ? { data: updated } : { error: { status: 404, data: 'Not found' } };
      }
      if (method === 'DELETE') {
        deleteMockBlog(slug);
        return { data: null };
      }
    }
    if (url.includes('/v1/blogs')) {
      if (method === 'GET') {
        const params = new URLSearchParams(url.split('?')[1] ?? '');
        return { data: getMockBlogResponse(Number(params.get('page') ?? 1), Number(params.get('size') ?? 10)) };
      }
      if (method === 'POST') {
        const created = createMockBlog(body ?? {});
        return { data: created };
      }
    }

    // ── Learning log endpoints ──
    if (url.match(/\/v1\/learning\/\d+/)) {
      const id = Number(url.split('/').filter(Boolean).pop());
      if (method === 'PUT') {
        const updated = updateMockLog(id, body ?? {});
        return updated ? { data: updated } : { error: { status: 404, data: 'Not found' } };
      }
      if (method === 'DELETE') {
        deleteMockLog(id);
        return { data: null };
      }
    }
    if (url.includes('/v1/learning')) {
      if (method === 'GET') {
        const params = new URLSearchParams(url.split('?')[1] ?? '');
        return { data: getMockLogs(Number(params.get('skip') ?? 0), Number(params.get('limit') ?? 10)) };
      }
      if (method === 'POST') {
        const created = createMockLog(body ?? {});
        return { data: created };
      }
    }
  }

  // Fallback to real API network
  return rawBaseQuery(args, api, extraOptions);
};

export const baseApi = createApi({
  // Unique key in the Redux store where API cache lives
  reducerPath: "api",

  // Base query configuration
  baseQuery: customBaseQuery,

  // Tag types — used for cache invalidation
  tagTypes: ["Blog", "LearningLog", "Project", "Skill"],

  // Endpoints are injected by features
  endpoints: () => ({}),
});
