import type { LearningLogItem } from '../learning-log/api';
import type { BlogItem, BlogPaginatedResponse } from '../../types/blog';

// ── In-memory mock stores (mutable arrays — simulate a real DB in dev mode) ──
// These are module-level singletons so mutations persist for the lifetime of the session.

export const mockBlogsStore: BlogItem[] = [
  {
    id: 1,
    title: "Building a Design System with Tailwind",
    slug: "building-design-system-tailwind",
    content: `# Building a Design System

When creating modern web applications, consistency is key. Tailwind CSS brings an incredible utility-first paradigm that forces developers to think about tokens rather than arbitrary values.

## The Approach

We start by defining \`tailwind.config.js\` core themes representing our brand:
- **Colors**: carefully mapped palettes spanning 50-900.
- **Typography**: fluid text tokens ensuring scalable readability.
- **Spacings**: strict multi-rem based increments.

Testing this structure reveals how well a system scales across teams.
`,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    slug: "understanding-react-server-components",
    content: `# React Server Components (RSC)

Let's dive into how RSC is shifting the standard React architecture fundamentally. Traditionally, all React components run on the client, fetching data after JavaScript loads. With RSC, components run exclusively on the server bridging direct backend access.

Here are a few advantages:
- Smaller bundle sizes.
- Direct database query capabilities.
- Excellent SEO implications.
`,
    published: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  }
];

export const mockLogsStore: LearningLogItem[] = [
  {
    id: 1,
    category: "Frontend",
    content: "Learned about the subtle differences between `useMemo` and `useCallback` when optimizing deeply nested components. Found out that overusing these hooks actually hurts performance.",
    date: new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    category: "Backend",
    content: "Set up SQLAlchemy asynchronous engine with FastAPI and explored dependency injection for the database session. Async capabilities make the throughput much higher.",
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    category: "DevOps",
    content: "Configured a robust CI/CD pipeline using GitHub Actions that completely handles Docker builds and deployments. It caches layers saving about 40% on build times.",
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  }
];

// ── Derived read helpers (return fresh snapshots to avoid stale references) ──

export function getMockBlogResponse(page = 1, size = 10): BlogPaginatedResponse {
  const published = mockBlogsStore.filter(b => b.published);
  const start = (page - 1) * size;
  return {
    items: published.slice(start, start + size),
    total: published.length,
    page,
    size,
    pages: Math.ceil(published.length / size),
  };
}

export function getMockBlogBySlug(slug: string): BlogItem | undefined {
  return mockBlogsStore.find(b => b.slug === slug);
}

export function getMockLogs(skip = 0, limit = 10): LearningLogItem[] {
  return [...mockLogsStore].reverse().slice(skip, skip + limit);
}

// ── In-memory ID counters ──
let blogIdCounter = mockBlogsStore.length + 1;
let logIdCounter = mockLogsStore.length + 1;

// ── Blog CRUD ops ──

export function createMockBlog(data: Partial<BlogItem>): BlogItem {
  const blog: BlogItem = {
    id: blogIdCounter++,
    title: data.title ?? "Untitled",
    slug: data.slug ?? `post-${Date.now()}`,
    content: data.content ?? "",
    published: data.published ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockBlogsStore.unshift(blog);
  return blog;
}

export function updateMockBlog(slug: string, data: Partial<BlogItem>): BlogItem | undefined {
  const idx = mockBlogsStore.findIndex(b => b.slug === slug);
  if (idx === -1) return undefined;
  mockBlogsStore[idx] = { ...mockBlogsStore[idx], ...data, updated_at: new Date().toISOString() };
  return mockBlogsStore[idx];
}

export function deleteMockBlog(slug: string): boolean {
  const idx = mockBlogsStore.findIndex(b => b.slug === slug);
  if (idx === -1) return false;
  mockBlogsStore.splice(idx, 1);
  return true;
}

// ── Log CRUD ops ──

export function createMockLog(data: Partial<LearningLogItem>): LearningLogItem {
  const log: LearningLogItem = {
    id: logIdCounter++,
    category: data.category ?? "General",
    content: data.content ?? "",
    date: new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockLogsStore.push(log);
  return log;
}

export function updateMockLog(id: number, data: Partial<LearningLogItem>): LearningLogItem | undefined {
  const idx = mockLogsStore.findIndex(l => l.id === id);
  if (idx === -1) return undefined;
  mockLogsStore[idx] = { ...mockLogsStore[idx], ...data, updated_at: new Date().toISOString() };
  return mockLogsStore[idx];
}

export function deleteMockLog(id: number): boolean {
  const idx = mockLogsStore.findIndex(l => l.id === id);
  if (idx === -1) return false;
  mockLogsStore.splice(idx, 1);
  return true;
}

